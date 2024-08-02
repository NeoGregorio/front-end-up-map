import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Legends = [
  {
    color: "#327916",
    text: "5-Stars",
  },
  {
    color: "#1976d2",
    text: "4-Stars",
  },
  {
    color: "#EDD012",
    text: "3-Stars",
  },
  {
    color: "orange",
    text: "2-Stars",
  },
  {
    color: "red",
    text: "1-Star",
  },
];

export default function LegendWindow() {
  const Legend = (
    <Card className="border-2 border-primary">
      <CardContent>
        <h1 className="font-bold mb-2">Legend:</h1>
        {Legends.map((leg) => (
          <div key={leg.text} className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill={leg.color}
            >
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
            </svg>
            <p> - {leg.text} </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
  return (
    <>
      <div className="hidden sm:block">{Legend}</div>
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger className="btn font-bold">Legend</PopoverTrigger>
          <PopoverContent className="w-auto p-0 sm:hidden">
            {Legend}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
