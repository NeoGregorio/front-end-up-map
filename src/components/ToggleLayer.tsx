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
    restaurant: boolean;
    cafe: boolean;
    store: boolean;
  };
  handleLayersChange: (newState: any) => void;
}

interface CheckBoxes {
  name: "restaurant" | "cafe" | "store";
  label: string;
}

export default function SelectLayers({
  layersState,
  handleLayersChange,
}: CheckboxProps) {
  // Checkboxes name and label for map
  const checkBoxes: CheckBoxes[] = [
    { name: "restaurant", label: "Restaurants" },
    { name: "cafe", label: "Cafes" },
    { name: "store", label: "Stores" },
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
