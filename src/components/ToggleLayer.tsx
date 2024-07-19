import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CheckboxProps {
  layersState: {
    Restaurant: boolean;
    Cafe: boolean;
    Store: boolean;
  };
  handleLayersChange: (newState: any) => void;
}

interface CheckBoxes {
  name: "Restaurant" | "Cafe" | "Store";
  label: string;
}

export default function SelectLayers({
  layersState,
  handleLayersChange,
}: CheckboxProps) {
  // Checkboxes name and label for map
  const checkBoxes: CheckBoxes[] = [
    { name: "Restaurant", label: "Restaurants" },
    { name: "Cafe", label: "Cafes" },
    { name: "Store", label: "Stores" },
  ];
  // Content
  const Selection = (
    <Card className="border-2 border-primary">
      <CardContent className="font-bold" style={{ paddingBottom: "6px" }}>
        Layers:
        <CardActions>
          <FormGroup>
            {checkBoxes.map(({ name, label }) => (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox
                    color="success"
                    name={name}
                    checked={layersState[name]}
                    onChange={handleLayersChange}
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
        </CardActions>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="hidden sm:block">{Selection}</div>
      <div className="sm:hidden mt-4">
        <Popover>
          <PopoverTrigger className="btn font-bold">Layers</PopoverTrigger>

          <PopoverContent className="w-auto p-0 sm:hidden">
            {Selection}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
