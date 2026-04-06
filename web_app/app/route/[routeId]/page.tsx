import DowntimeDisplay from "@/components/DowntimeDisplay"
import Link from "next/link"

export default async function Page({
  params,
}: {
  params: Promise<{ routeId: string }>
}) {
  const { routeId } = await params
  return (
    <div className="container max-w-4xl mx-auto justify-center mt-10">
      <Link href={"/"} className="text-center text-blue-500 underline">Home</Link>
      <DowntimeDisplay route={routeId} chunkCount={24} chunkSizeHours={1} />
    </div>
  )
}