"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { getStores } from "@/components/SampleFetch";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

ChartJS.register(Title, ArcElement, Tooltip, Legend);

export default function PieChart() {
  // Fetching from database
  const [storesData, setStoresData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStores();
        if (data.error) {
          throw new Error(data.error);
        }
        setStoresData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Chart Data
  const types: string[] = Array.from(new Set(storesData.map((d) => d.type))); // Get unique types
  const typesCount: number[] = types.map(
    // Count the number of each type
    (type) => storesData.filter((d) => d.type === type).length
  );

  // Pie Chart State:
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <>
      <button className="btn font-bold" onClick={() => setChartOpen(true)}>
        Statistics
      </button>
      <Dialog
        className="border-2 border-primary"
        open={chartOpen}
        onClose={() => setChartOpen(false)}
      >
        <DialogTitle>Store Types Distribution</DialogTitle>
        <Pie
          data={{
            labels: types,
            datasets: [
              {
                label: "Count",
                data: typesCount,
                backgroundColor: ["#8C161E", "#327916", "#fcba03"],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </Dialog>
    </>
  );
}
