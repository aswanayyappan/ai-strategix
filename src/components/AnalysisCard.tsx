import { ReactNode } from 'react';

interface AnalysisCardProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

export function AnalysisCard({ title, children, delay = 0 }: AnalysisCardProps) {
  return (
    <div
      className="bg-card border border-border rounded-3xl p-4 md:p-10 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2
        className="text-2xl text-foreground mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--font-body)' }}>
        {children}
      </div>
    </div>
  );
}
