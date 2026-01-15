import { AnalysisCard } from './AnalysisCard';
import { MetricCard } from './MetricCard';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calendar, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';

interface AIOutputProps {
  prompt: string;
  theme: "dark" | "light";
}

export function AIOutput({ prompt, theme }: AIOutputProps) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isDark = theme === "dark";

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Mock data for charts
  const marketData = [
    { month: 'Jan', revenue: 45000, growth: 12 },
    { month: 'Feb', revenue: 52000, growth: 15 },
    { month: 'Mar', revenue: 61000, growth: 17 },
    { month: 'Apr', revenue: 68000, growth: 11 },
    { month: 'May', revenue: 78000, growth: 14 },
    { month: 'Jun', revenue: 89000, growth: 14 },
  ];

  const stockTrends = [
    { week: 'W1', value: 142 },
    { week: 'W2', value: 148 },
    { week: 'W3', value: 145 },
    { week: 'W4', value: 156 },
    { week: 'W5', value: 162 },
    { week: 'W6', value: 159 },
    { week: 'W7', value: 168 },
    { week: 'W8', value: 175 },
  ];

  const riskDistribution = [
    { name: 'Market', value: 35, color: '#ffffff' },
    { name: 'Operations', value: 25, color: '#d4d4d4' },
    { name: 'Financial', value: 20, color: '#a3a3a3' },
    { name: 'Competitive', value: 20, color: '#737373' },
  ];

  const financialForecast = [
    { quarter: 'Q1', actual: 2.1, projected: 0 },
    { quarter: 'Q2', actual: 2.4, projected: 0 },
    { quarter: 'Q3', actual: 2.8, projected: 0 },
    { quarter: 'Q4', actual: 0, projected: 3.2 },
    { quarter: 'Q1 \'26', actual: 0, projected: 3.6 },
    { quarter: 'Q2 \'26', actual: 0, projected: 4.1 },
  ];

  const actionItems = [
    {
      phase: '30 Days',
      items: [
        'Conduct comprehensive market research and competitive analysis',
        'Optimize pricing strategy based on customer segmentation',
        'Implement customer feedback loop and NPS tracking',
      ]
    },
    {
      phase: '60 Days',
      items: [
        'Launch targeted marketing campaign for enterprise segment',
        'Establish strategic partnerships with key industry players',
        'Enhance product features based on customer priority matrix',
      ]
    },
    {
      phase: '90 Days',
      items: [
        'Scale operations team to support 50% growth trajectory',
        'Expand into adjacent market segments with proven PMF',
        'Secure Series A funding based on validated metrics',
      ]
    }
  ];

  return (
    <div className="max-w-7xl space-y-8 animate-fade-in">
      {/* User Prompt Display */}
      <div className="mb-12">
        <p
          className="text-sm text-white uppercase tracking-wider mb-3"
          style={{ fontFamily: 'var(--font-data)' }}
        >
          Your Prompt
        </p>
        <p
          className="text-2xl text-foreground"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {prompt}
        </p>
      </div>

      {/* Executive Summary */}
      <AnalysisCard title="Executive Summary" delay={100}>
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Based on comprehensive analysis of current market conditions, competitive landscape, and internal capabilities,
            your strategic position shows <span className="text-white font-medium">strong potential for accelerated growth</span> with
            calculated risk exposure.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Key findings indicate a 67% market opportunity expansion in Q2-Q3 2026, supported by favorable regulatory
            changes and increased enterprise adoption. Immediate action on operational scaling and strategic partnerships
            will be critical to capitalize on this window.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-data)' }}>
                  Growth Potential
                </p>
                <p className="text-xl text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  High
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-data)' }}>
                  Risk Level
                </p>
                <p className="text-xl text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  Moderate
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 bg-white/10 rounded-xl">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-data)' }}>
                  Strategic Fit
                </p>
                <p className="text-xl text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  Excellent
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnalysisCard>

      {/* Market & Business Analysis */}
      <AnalysisCard title="Market & Business Analysis" delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <MetricCard
            label="Market Size"
            value="$4.2B"
            trend="+23% YoY"
          />
          <MetricCard
            label="TAM Growth"
            value="18%"
            trend="Above avg"
          />
          <MetricCard
            label="Market Share"
            value="3.2%"
            trend="+0.8% QoQ"
          />
          <MetricCard
            label="Competitors"
            value="47"
            trend="Moderate density"
          />
        </div>

        <div className="bg-secondary/30 border border-border rounded-2xl p-4 md:p-6">
          <h3
            className="text-lg text-foreground mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Revenue Growth Trajectory
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis
                dataKey="month"
                stroke="#a1a1a1"
                style={{ fontFamily: 'var(--font-data)', fontSize: '12px' }}
              />
              <YAxis
                stroke="#a1a1a1"
                style={{ fontFamily: 'var(--font-data)', fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-data)',
                  color: '#ffffff'
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ffffff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-foreground leading-relaxed">
            <span className="text-white font-medium">Market Insight:</span> The sector is experiencing
            accelerated digital transformation, with enterprise adoption increasing 34% quarter-over-quarter.
            Early movers in automation and AI integration are capturing disproportionate market share.
          </p>
        </div>
      </AnalysisCard>

      {/* Stock & Trend Insights */}
      <AnalysisCard title="Stock & Market Trend Analysis" delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <MetricCard
            label="Sector Index"
            value="175.4"
            trend="+12.3% YTD"
          />
          <MetricCard
            label="Volatility"
            value="Low"
            trend="σ = 0.18"
          />
          <MetricCard
            label="Momentum"
            value="Bullish"
            trend="Strong signal"
          />
        </div>

        <div className="bg-secondary/30 border border-border rounded-2xl p-4 md:p-6">
          <h3
            className="text-lg text-foreground mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            8-Week Trend Analysis
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={stockTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis
                dataKey="week"
                stroke="#a1a1a1"
                style={{ fontFamily: 'var(--font-data)', fontSize: '12px' }}
              />
              <YAxis
                stroke="#a1a1a1"
                style={{ fontFamily: 'var(--font-data)', fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-data)',
                  color: '#ffffff'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ fill: '#ffffff', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </AnalysisCard>

      {/* Financial Forecast */}
      <AnalysisCard title="Financial Forecast" delay={400}>
        <div className="bg-secondary/30 border border-border rounded-2xl p-4 md:p-6">
          <h3
            className="text-lg text-foreground mb-4 md:mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Revenue Projection (Millions USD)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis
                dataKey="quarter"
                stroke="#a1a1a1"
                style={{ fontFamily: 'var(--font-data)', fontSize: '12px' }}
              />
              <YAxis
                stroke="#a1a1a1"
                style={{ fontFamily: 'var(--font-data)', fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-data)',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="actual" fill="#ffffff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="projected" fill="#737373" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-data)' }}>
                Actual
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#737373]"></div>
              <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-data)' }}>
                Projected
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
          <MetricCard label="ARR" value="$12.4M" trend="+89% YoY" />
          <MetricCard label="Burn Rate" value="$187K" trend="Healthy" />
          <MetricCard label="Runway" value="24 mo" trend="Strong position" />
          <MetricCard label="CAC Ratio" value="3.2x" trend="Improving" />
        </div>
      </AnalysisCard>

      {/* Risk Analysis */}
      <AnalysisCard title="Risk Score & Breakdown" delay={500}>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1 w-full">
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-3">
                <p
                  className="text-6xl text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  6.4
                </p>
                <p
                  className="text-xl text-muted-foreground"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  / 10
                </p>
              </div>
              <p
                className="text-lg text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Moderate Risk Level
              </p>
            </div>

            <div className="space-y-4">
              {riskDistribution.map((risk) => (
                <div key={risk.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-sm text-foreground"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {risk.name} Risk
                    </span>
                    <span
                      className="text-sm text-white"
                      style={{ fontFamily: 'var(--font-data)' }}
                    >
                      {risk.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${risk.value}%`,
                        backgroundColor: risk.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-80 h-64 md:h-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-data)',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-foreground leading-relaxed">
            <span className="text-white font-medium">Primary Risk Factor:</span> Market concentration
            with top 3 competitors controlling 45% market share. Recommend diversification of customer base
            and acceleration of product differentiation strategy.
          </p>
        </div>
      </AnalysisCard>

      {/* Product & Scaling */}
      <AnalysisCard title="Product & Scaling Recommendations" delay={600}>
        <div className="space-y-6">
          <div className="p-6 bg-secondary/30 border border-border rounded-2xl">
            <h4
              className="text-lg text-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Product Strategy
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={18} />
                <span className="text-foreground">
                  Prioritize enterprise features: SSO, advanced permissions, audit logs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={18} />
                <span className="text-foreground">
                  Implement AI-powered analytics dashboard as key differentiator
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={18} />
                <span className="text-foreground">
                  Build API ecosystem to enable partner integrations
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-secondary/30 border border-border rounded-2xl">
            <h4
              className="text-lg text-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Scaling Priorities
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={18} />
                <span className="text-foreground">
                  Expand engineering team by 40% to support product roadmap velocity
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={18} />
                <span className="text-foreground">
                  Establish dedicated customer success function for enterprise accounts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-white mt-1 flex-shrink-0" size={18} />
                <span className="text-foreground">
                  Invest in infrastructure to support 10x user growth over 18 months
                </span>
              </li>
            </ul>
          </div>
        </div>
      </AnalysisCard>

      {/* Action Plan */}
      <AnalysisCard title="30–60–90 Day Action Plan" delay={700}>
        <div className="space-y-6">
          {actionItems.map((phase, index) => (
            <div
              key={phase.phase}
              className="p-8 bg-secondary/30 border border-border rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3
                  className="text-2xl text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {phase.phase}
                </h3>
              </div>

              <div className="space-y-4">
                {phase.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-4 p-4 bg-background/50 rounded-xl hover:bg-background/80 transition-all"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-white/20 text-white rounded-full flex-shrink-0 mt-1">
                      <span style={{ fontFamily: 'var(--font-data)' }}>
                        {itemIndex + 1}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-foreground leading-relaxed">
            <span className="text-white font-medium">Implementation Note:</span> This action plan is
            sequenced to maximize impact while managing resource constraints. Weekly review checkpoints
            recommended to ensure alignment with evolving market conditions.
          </p>
        </div>
      </AnalysisCard>

      {/* Bottom Spacing */}
      <div className="h-24"></div>
    </div>
  );
}