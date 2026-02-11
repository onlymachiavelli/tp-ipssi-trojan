import axios from "axios"

const getRawData = async () => {
  return axios.get("/api/victims")
}

export { getRawData }