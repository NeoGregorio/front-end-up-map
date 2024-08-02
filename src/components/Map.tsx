import { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { getStores } from "@/data/SampleFetch";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import StoreIcon from "@mui/icons-material/Store";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// Global Variables
const UPposition = { lat: 14.655582658243429, lng: 121.06909051147275 };
const zoom = 15.8;
const mapID = "DEMO_MAP_ID";

// Typedefs
type Store = {
  store_id: number;
  name: string;
  type: string;
  rating: number;
  address: string;
  url: string;
  wheelechair_accessible_entrance: boolean;
  lat: number;
  lng: number;
};
interface MapProps {
  layersState: {
    restaurant: boolean;
    cafe: boolean;
    store: boolean;
  };
  setInfoDisplay: (value: any) => void;
  setOpen: (value: boolean) => void; // callback function to open the drawer
}

// Main Function
export default function DisplayMap({
  layersState,
  setInfoDisplay,
  setOpen,
}: MapProps) {
  // Fetching from database
  const [storesData, setStoresData] = useState<Store[]>([]);
  const [error, setError] = useState<boolean>();

  const points = storesData.filter(
    (store) => layersState[store.type as keyof typeof layersState]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStores();
        if (data.error) {
          throw new Error(data.error);
        }
        setStoresData(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map defaultZoom={zoom} defaultCenter={UPposition} mapId={mapID}>
          <Markers
            points={points}
            setInfoDisplay={setInfoDisplay}
            setOpen={setOpen}
          />
        </Map>
        <Snackbar
          open={error}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error" variant="filled">
            Database connection not found. Please try reloading the page.
          </Alert>
        </Snackbar>
      </div>
    </APIProvider>
  );
}

// Displaying of Markers and using the Clusterer
type Point = google.maps.LatLngLiteral & Store; //& { store_id: string } & {
//   name: string;
// } & { rating: number };
type Props = {
  points: Point[];
  setInfoDisplay: (value: any) => void;
  setOpen: (value: boolean) => void;
};

const Markers = ({ points, setInfoDisplay, setOpen }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({}); // store the markers
  const clusterer = useRef<MarkerClusterer | null>(null); // reference to the marker clusterer

  // setup the marker clusterer
  useEffect(() => {
    if (!map) return; // if no map, not ready to setup clusterer
    if (!clusterer.current) clusterer.current = new MarkerClusterer({ map }); // if no clusterer, create a new one
  }, [map]);

  // anytime the markers change, clear the clusterer and add the new markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  //set the marker reference to the markers state
  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return; // if marker and marker in the state, return
    if (!marker && !markers[key]) return; // if no marker and no marker in the state, return

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return points.map((store) => (
    <AdvancedMarker
      key={store.store_id}
      position={{ lat: store.lat, lng: store.lng }}
      ref={(marker) => setMarkerRef(marker, String(store.store_id.toString()))}
      onClick={() => {
        setInfoDisplay(store); // pass the store object
        setOpen(true); // open the drawer
      }}
    >
      <Pin
        background={SetColor(store.rating)[0]}
        borderColor={SetColor(store.rating)[1]}
        //glyph={setIcon2(store.type)}
      >
        {setIcon(store.type)}
      </Pin>
    </AdvancedMarker>
  ));
};

const setIcon = (type: string) => {
  switch (type) {
    case "restaurant":
      return <RestaurantIcon fontSize="small" />;
    case "cafe":
      return <LocalCafeIcon fontSize="small" />;
    default:
      return <StoreIcon fontSize="small" />;
  }
};

const SetColor = (rating: number) => {
  switch (true) {
    case rating === 5:
      return ["#327916", "#013208"];
    case rating >= 4:
      return ["#1976d2", "#000058"];
    case rating >= 3:
      return ["#EDD012", "#8B8000"];
    case rating >= 2:
      return ["orange", "#8b4c00"];
    default:
      return ["red", "#8b0000"];
  }
};
