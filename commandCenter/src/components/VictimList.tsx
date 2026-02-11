import { Monitor } from "lucide-react";

interface Victim {
  id: number;
  computer_name: string;
  ip: string;
  mac_address: string;
  created_at: string;
  files: any[];
}

interface VictimListProps {
  victims: Victim[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const VictimList = ({ victims, selectedId, onSelect }: VictimListProps) => {
  return (
    <div className="rounded-lg border border-glow bg-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <Monitor className="h-5 w-5 text-primary" />
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
          Targets
        </h3>
        <span className="ml-auto rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary font-display">
          {victims.length}
        </span>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        {victims.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all border-b border-border last:border-0 hover:bg-muted/40 ${
              selectedId === v.id ? "bg-primary/10 border-l-2 !border-l-primary" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <Monitor className={`h-4 w-4 ${selectedId === v.id ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`font-display text-sm font-bold truncate ${selectedId === v.id ? "text-primary" : "text-foreground"}`}>
                {v.computer_name}
              </p>
              <p className="font-mono-space text-xs text-muted-foreground">{v.ip}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono-space text-muted-foreground">
                {v.files.length} files
              </span>
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VictimList;
