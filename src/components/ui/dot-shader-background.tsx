'use client'

import { useMemo, useEffect } from 'react'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial, useTrailTexture } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// ============================================================================
// Types and Interfaces
// ============================================================================

interface ThemeColors {
    dotColor: string
    bgColor: string
    dotOpacity: number
}

// ============================================================================
// Constants
// ============================================================================

const SHADER_CONSTANTS = {
    GRID_SIZE: 120, // Increased for better resolution
    ROTATION: 0,
    TRAIL_SIZE: 512,
    TRAIL_RADIUS: 0.2, // Increased radius for better interaction
    TRAIL_MAX_AGE: 600, // Longer trail
    TRAIL_INTERPOLATE: 3, // Smoother trail
} as const

const THEME_COLORS: Record<string, ThemeColors> = {
    dark: {
        dotColor: '#FFFFFF',
        bgColor: '#121212',
        dotOpacity: 0.025,
    },
    light: {
        dotColor: '#000000', // Pure black dots
        bgColor: '#ffffff', // White background
        dotOpacity: 0.4, // Increased opacity for darker appearance
    },
    default: {
        dotColor: '#FFFFFF',
        bgColor: '#121212',
        dotOpacity: 0.05,
    },
} as const

// ============================================================================
// Shader Code
// ============================================================================

const VERTEX_SHADER = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float time;
  uniform int render;
  uniform vec2 resolution;
  uniform vec3 dotColor;
  uniform vec3 bgColor;
  uniform sampler2D mouseTrail;
  uniform float rotation;
  uniform float gridSize;
  uniform float dotOpacity;

  vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotationMatrix = mat2(c, -s, s, c);
    return rotationMatrix * (uv - 0.5) + 0.5;
  }

  vec2 coverUv(vec2 uv) {
    vec2 s = resolution.xy / max(resolution.x, resolution.y);
    vec2 newUv = (uv - 0.5) * s + 0.5;
    return clamp(newUv, 0.0, 1.0);
  }

  float sdfCircle(vec2 p, float r) {
    return length(p - 0.5) - r;
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy / resolution;
    vec2 uv = coverUv(screenUv);
    vec2 rotatedUv = rotate(uv, rotation);

    // Create a grid
    vec2 gridUv = fract(rotatedUv * gridSize);
    vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

    // Calculate distance from the center of each cell
    float baseDot = sdfCircle(gridUv, 0.25);

    // Screen mask
    float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y); // 0 at the top, 1 at the bottom
    vec2 centerDisplace = vec2(0.7, 1.1);
    float circleMaskCenter = length(uv - centerDisplace);
    float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);

    float combinedMask = screenMask * circleMaskFromCenter;
    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

    // Mouse trail effect
    float mouseInfluence = texture2D(mouseTrail, gridUvCenterInScreenCoords).r;
    
    // Increased scale influence from mouse
    float scaleInfluence = max(mouseInfluence * 3.5, circleAnimatedMask * 0.3);

    // Create dots with animated scale, influenced by mouse
    float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);
    
    // Apply stronger influence
    float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence));

    float smoothDot = smoothstep(0.05, 0.0, sdfDot);

    float opacityInfluence = max(mouseInfluence * 10.0, circleAnimatedMask * 0.5);

    // Mix background color with dot color, using animated opacity to increase visibility
    vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

    gl_FragColor = vec4(composition, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

// ============================================================================
// Shader Material
// ============================================================================

const DotMaterial = shaderMaterial(
    {
        time: 0,
        resolution: new THREE.Vector2(),
        dotColor: new THREE.Color('#FFFFFF'),
        bgColor: new THREE.Color('#121212'),
        mouseTrail: null,
        render: 0,
        rotation: 0,
        gridSize: 50,
        dotOpacity: 0.05,
    },
    VERTEX_SHADER,
    FRAGMENT_SHADER,
)

/**
 * Easing function for smooth trail interpolation
 */
function easeInOutCirc(x: number): number {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
}

/**
 * Gets theme-appropriate colors for the shader
 */
function getThemeColors(theme: string | undefined): ThemeColors {
    return THEME_COLORS[theme || 'default'] || THEME_COLORS.default
}

/**
 * Internal scene component that renders the shader mesh
 */
function Scene() {
    const size = useThree((state) => state.size)
    const viewport = useThree((state) => state.viewport)
    const { theme } = useTheme()

    const themeColors = getThemeColors(theme)

    // Mouse trail configuration
    const [trail, onMove] = useTrailTexture({
        size: SHADER_CONSTANTS.TRAIL_SIZE,
        radius: SHADER_CONSTANTS.TRAIL_RADIUS,
        maxAge: SHADER_CONSTANTS.TRAIL_MAX_AGE,
        interpolate: SHADER_CONSTANTS.TRAIL_INTERPOLATE,
        ease: easeInOutCirc,
    })

    // Create shader material instance
    const dotMaterial = useMemo(() => new DotMaterial(), [])

    // Update material uniforms when theme changes
    useEffect(() => {
        const { dotColor, bgColor, dotOpacity } = themeColors

        dotMaterial.uniforms.dotColor.value.setHex(dotColor.replace('#', '0x'))
        dotMaterial.uniforms.bgColor.value.setHex(bgColor.replace('#', '0x'))
        dotMaterial.uniforms.dotOpacity.value = dotOpacity
    }, [theme, dotMaterial, themeColors])

    // Update time uniform on each frame
    useFrame((state) => {
        dotMaterial.uniforms.time.value = state.clock.elapsedTime
    })

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        onMove(e)
    }

    const scale = Math.max(viewport.width, viewport.height) / 2

    return (
        <mesh scale={[scale, scale, 1]} onPointerMove={handlePointerMove}>
            <planeGeometry args={[2, 2]} />
            <primitive
                object={dotMaterial}
                resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
                rotation={SHADER_CONSTANTS.ROTATION}
                gridSize={SHADER_CONSTANTS.GRID_SIZE}
                mouseTrail={trail}
                render={0}
            />
        </mesh>
    )
}

/**
 * Canvas configuration for optimal shader rendering
 */
const CANVAS_CONFIG = {
    gl: {
        antialias: true,
        powerPreference: 'high-performance' as const,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.NoToneMapping,
    },
} as const

/**
 * DotScreenShader - A Three.js shader component that renders an animated dot grid background
 *
 * Features:
 * - Interactive mouse trail effects
 * - Theme-aware color adaptation (dark/light mode)
 * - Responsive scaling
 * - High-performance WebGL rendering
 *
 * @component
 * @example
 * ```tsx
 * <DotScreenShader />
 * ```
 */
export const DotScreenShader = () => {
    return (
        <Canvas {...CANVAS_CONFIG}>
            <Scene />
        </Canvas>
    )
}