import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "success" | "warning";
}

const variantStyles = {
  primary: "border-glow",
  secondary: "border-secondary/30 glow-secondary",
  success: "border-success/30 glow-success",
  warning: "border-[hsl(var(--warning)/0.3)]",
};

const iconVariant = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
};

const StatCard = ({ label, value, icon: Icon, variant = "primary" }: StatCardProps) => {
  return (
    <div className={`rounded-lg border bg-card p-5 ${variantStyles[variant]} transition-all hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-display">{label}</p>
          <p className="mt-2 text-3xl font-bold font-display text-foreground">{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${iconVariant[variant]} opacity-80`} />
      </div>
    </div>
  );
};

export default StatCard;
