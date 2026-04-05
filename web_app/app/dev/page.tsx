import DowntimeDisplay from "@/components/DowntimeDisplay"

export default function Page() {
    return (
        <>
            <div className="container max-w-4xl mx-auto justify-center mt-10">
                <DowntimeDisplay route="L993" chunkSizeHours={1} chunkCount={60} />
                <DowntimeDisplay route="L401" chunkSizeHours={1} chunkCount={60} />
            </div>
        </>
    )
}