import Button from "@/components/Button";
import TextBox from "@/components/TextBox";

interface Alert {
  id: string;
  descriptionText: {
    translation: {
      text: string;
    }[];
  };
}

export default async function Home() {
  const data = await fetch("http://localhost:8000/alerts/all-active");
  const alerts = await data.json();
  console.log(alerts);

  return (
    <>
      <p>welcome!!</p>
      <ul className="list-disc list-inside pl-6 text-lime-600 mb-6">
        {
          alerts.map((alert: Alert) => (
            <li key={alert.id}>{alert.descriptionText.translation[0].text}</li>
          ))
        }
      </ul>
      
      <TextBox placeholder="Enter line number..." />
      <Button title="Check Downtime" />
    </>
  );
}
