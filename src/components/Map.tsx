import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface plotDetails {
  store_id: number;
  name: string;
  rating: number;
  lat: number;
  lng: number;
}

interface MapProps {
  plotDetailsArr: plotDetails[]; // array of store details, changes according to the selected layers in page.tsx
  setInfoDisplay: (value: any) => void; // callback function to set the store ID to display info
  setOpen: (value: boolean) => void; // callback function to open the drawer
}

export default function Map({
  plotDetailsArr,
  setInfoDisplay,
  setOpen,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // to store the markers
  const [Markers, setMarkers] = useState<
    google.maps.marker.AdvancedMarkerElement[]
  >([]);
  //const markerCluster = new MarkerClusterer({ Markers, map });

  // Initialize the map (only once)
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      // to center the map at UP Diliman
      const firstCoords = { lat: 14.655582658243429, lng: 121.06909051147275 };

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: firstCoords,
        zoom: 15.8,
        mapId: "sample_map_id",
      };

      // setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      mapInstanceRef.current = map;
    };
    initMap();
  }, []);

  // Place markers on the map
  useEffect(() => {
    const placeMarkers = async () => {
      // Import the Marker library
      const { AdvancedMarkerElement, PinElement } =
        (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

      // Get the store IDs from the plotDetailsArr
      const storeIDs = plotDetailsArr.map((store) => store.store_id);

      // Clear markers not in storeIDs
      Markers.forEach((mrkr) => {
        if (!storeIDs.includes(Number(mrkr.title))) {
          mrkr.map = null; // remove marker if not in storeIDs
        }
      });

      // Add markers for each store in plotDetailsArr
      plotDetailsArr.forEach((store) => {
        // Design the pin
        const pinBackground = new PinElement({
          background: SetColor(store.rating)[0],
          borderColor: SetColor(store.rating)[1],
          glyph: store.rating.toString(),
        });

        const marker = new AdvancedMarkerElement({
          position: { lat: store.lat, lng: store.lng },
          map: mapInstanceRef.current,
          title: store.name,
          content: pinBackground.element,
        });

        // Add an info window to the marker
        // const infoWindow = new google.maps.InfoWindow({
        //   content: `<div style="color: black;">${store.name}</div>`,
        // });

        marker.addListener("click", () => {
          setInfoDisplay(store.store_id); // set the store ID to display info
          setOpen(true); // open the drawer
          // infoWindow.open(mapInstanceRef.current, marker);
        });
        // push the new marker to the Markers state
        Markers.push(marker);
      });
    };
    placeMarkers();
  }, [plotDetailsArr]);

  // Marker Clusterer
  // const clusterer = useRef<MarkerClusterer | null>(null);
  // useEffect(() => {
  //   if (!mapInstanceRef.current) return;
  //   if (!clusterer.current) {
  //     clusterer.current = new MarkerClusterer({ map: mapInstanceRef.current });
  //   }
  // }, [mapInstanceRef.current]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

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
