import Downtime from "./components/Downtime"
import DowntimeDisplay from "@/components/DowntimeDisplay"

export default async function Page({
  params,
}: {
  params: Promise<{ lineNumber: string }>
}) {
  const { lineNumber } = await params
  return (
    <>
      <Downtime lineNumber={lineNumber} lastDays={7} />
      <br />
      <br />
      <DowntimeDisplay route={lineNumber} chunkCount={24} chunkSizeHours={1} />
    </>
  )
}