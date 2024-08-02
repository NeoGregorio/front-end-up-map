"use client";
import DisplayMap from "@/components/Map";
import React, { useState } from "react";
import SelectLayers from "@/components/ToggleLayer";
import NavBar from "@/components/NavBar";
import LegendWindow from "@/components/Legend";
import InfoBar from "@/components/InfoBar";

export default function Main() {
  // Callback function to handle the state change of the checkboxes child component
  const [layersState, setLayersState] = useState({
    restaurant: true, // default values, display all
    cafe: true,
    store: true,
  });

  // Callback function to handle the state change of the checkboxes child component
  const handleLayersChange = (event: any) => {
    const newState = {
      ...layersState, // to keep the state of the other checkboxes
      [event.target.name]: event.target.checked, // to update the state of the checkbox that was clicked
    };
    console.log(newState);
    setLayersState(newState);
  };

  ////////////////////////////////

  // Infobar State:
  const [infoDisplay, setInfoDisplay] = useState(null); // To set what information to display (specified by store_id)
  const [open, setOpen] = useState(false); // Drawer state
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div>
        <div className="overlay m-2.5 mt-24 max-w-40">
          <SelectLayers
            layersState={layersState}
            handleLayersChange={handleLayersChange}
          />
          <div className="mt-4">
            <LegendWindow />
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <InfoBar
            storeID={infoDisplay}
            open={open}
            toggleDrawer={toggleDrawer(false)}
          />
        </div>
      </div>

      <DisplayMap
        layersState={layersState}
        setInfoDisplay={setInfoDisplay}
        setOpen={setOpen}
      />
    </div>
  );
}
