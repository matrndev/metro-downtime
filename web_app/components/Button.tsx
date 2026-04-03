export default function Button({ title }: { title: string }) {
  return (
    <button className="bg-lime-500 hover:bg-lime-700 text-black py-4 px-4 rounded">
      {title}
    </button>
  );
}