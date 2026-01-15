interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
}

export function MetricCard({ label, value, trend }: MetricCardProps) {
  return (
    <div className="bg-secondary/50 border border-border rounded-2xl p-4 md:p-6">
      <p
        className="text-sm text-muted-foreground mb-2 uppercase tracking-wider"
        style={{ fontFamily: 'var(--font-data)' }}
      >
        {label}
      </p>
      <p
        className="text-3xl text-foreground mb-1"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {value}
      </p>
      {trend && (
        <p
          className="text-sm text-muted-foreground"
          style={{ fontFamily: 'var(--font-data)' }}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
