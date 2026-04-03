import Downtime from "./components/Downtime"

export default async function Page({
  params,
}: {
  params: Promise<{ lineNumber: string }>
}) {
  const { lineNumber } = await params
  return (
    <>
      <Downtime lineNumber={lineNumber} lastDays={7} />
    </>
  )
}