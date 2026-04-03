export default function TextBox({ placeholder }: { placeholder: string }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 w-full mb-2"
        />
    )
}