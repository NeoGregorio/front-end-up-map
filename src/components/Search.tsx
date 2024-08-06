import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { getStores } from "@/components/SampleFetch";

export default function Search() {
  //     {
  //   setInfoDisplay,

  // }: {
  //   setInfoDisplay: (event: any) => void;
  // }
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
  const storeNames = storesData.map((store) => store.name);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={storeNames}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Stores" />}
      //onChange={setInfoDisplay}
    />
  );
}
