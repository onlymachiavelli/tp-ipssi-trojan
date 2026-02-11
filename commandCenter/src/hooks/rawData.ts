import { useState } from "react"
import { getRawData as getRawDataApi } from "../lib/api/allData"

interface FileEntry {
  id: number
  name: string
  path: string
  content: string
  victim_id: number
  created_at: string
  updated_at: string
}

interface VictimEntry {
  id: number
  computer_name: string
  ip: string
  mac_address: string
  created_at: string
  updated_at: string
  files: FileEntry[]
}

interface RawData {
  count: number
  victims: VictimEntry[]
}

const initialRawData: RawData = {
  count: 0,
  victims: [],
}

const useRawData = () => {
  const [rawData, setRawData] = useState<RawData>(initialRawData)

  const getRawData = async () => {
    try {
      const response = await getRawDataApi()
      setRawData(response.data ?? initialRawData)
    } catch (e) {
      console.error(e)
      setRawData(initialRawData)
    }
  }

  return {
    rawData,
    getRawData,
  }
}

export default useRawData