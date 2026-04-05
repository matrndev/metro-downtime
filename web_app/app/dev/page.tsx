import DowntimeDisplay from "@/components/DowntimeDisplay"

export default function Page() {
    return (
        <>
            <div className="container max-w-4xl mx-auto justify-center mt-10">
                <DowntimeDisplay route="L993" chunkSizeHours={24} chunkCount={30} />
                <DowntimeDisplay route="L401" chunkSizeHours={1} chunkCount={48} />
                <DowntimeDisplay route="L147" chunkSizeHours={1} chunkCount={24} />
                <DowntimeDisplay route="L562" chunkSizeHours={1} chunkCount={24} />
            </div>
        </>
    )
}