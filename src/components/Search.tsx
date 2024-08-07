import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { getStores } from "@/components/SampleFetch";
import SearchIcon from "@mui/icons-material/Search";
interface SearchProps {
  setInfoDisplay: (value: any) => void;
  setOpen: (value: boolean) => void; // callback function to open the drawer
}

export default function Search({ setInfoDisplay, setOpen }: SearchProps) {
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

  const [value, setValue] = useState(null);
  //const [openSearch, setOpenSearch] = useState(false);
  const handleChange = (event: any, chosenStore: any) => {
    if (chosenStore) {
      // If a store is selected (not null)
      setInfoDisplay(chosenStore);
      setOpen(true);
    }
    setValue(chosenStore);
  };

  return (
    <Autocomplete
      size="small"
      className="bg-white rounded"
      value={value}
      onChange={handleChange}
      //id="store-states-demo"
      options={storesData} // Use the whole store object
      getOptionLabel={(option) => option.name} // Display only the store name
      sx={{
        width: {
          xs: 180, // width for extra-small screens
          sm: 250, // width for small screens
          md: 300, // width for medium screens and up
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Stores 🔍" />
      )}
    />
  );
}
