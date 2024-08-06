"use client";
import { Pie, Bar } from "react-chartjs-2";
import { getStores } from "@/components/SampleFetch";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

  const avgRatings: number[] = types.map((type) => {
    const ratings = storesData
      .filter((d) => d.type === type)
      .map((d) => d.rating);

    const sum = ratings.reduce((a, b) => a + b, 0);
    return ratings.length ? sum / ratings.length : 0;
  });

  // Pie Chart State:
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <>
      <button className="btn font-bold" onClick={() => setChartOpen(true)}>
        Statistics
      </button>

      <Dialog open={chartOpen} onClose={() => setChartOpen(false)}>
        <div className="border-2 border-primary">
          <DialogTitle>Store Statistics</DialogTitle>
          <div className="grid sm:grid-cols-2 gap-4 px-4">
            <div>
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
                    title: {
                      display: true,
                      text: "Store Types Distribution",
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <Bar
                data={{
                  labels: types,
                  datasets: [
                    {
                      label: "Average Rating",
                      data: avgRatings,
                      backgroundColor: ["#8C161E", "#327916", "#fcba03"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Average Ratings by Store Type",
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
