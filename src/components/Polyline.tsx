/* eslint-disable complexity */
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { GoogleMapsContext, useMapsLibrary } from "@vis.gl/react-google-maps";

import type { Ref } from "react";

type PolylineEventProps = {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onDrag?: (e: google.maps.MapMouseEvent) => void;
  onDragStart?: (e: google.maps.MapMouseEvent) => void;
  onDragEnd?: (e: google.maps.MapMouseEvent) => void;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
};

type PolylineCustomProps = {
  /**
   * this is an encoded string for the path, will be decoded and used as a path
   */
  encodedPath?: string;
};

export type PolylineProps = google.maps.PolylineOptions &
  PolylineEventProps &
  PolylineCustomProps;

export type PolylineRef = Ref<google.maps.Polyline | null>;

function usePolyline(props: PolylineProps) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    encodedPath,
    ...polylineOptions
  } = props;
  // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
  const callbacks = useRef<Record<string, (e: unknown) => void>>({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
  });

  const geometryLibrary = useMapsLibrary("geometry");

  const polyline = useRef(new google.maps.Polyline()).current;
  // update PolylineOptions (note the dependencies aren't properly checked
  // here, we just assume that setOptions is smart enough to not waste a
  // lot of time updating values that didn't change)
  useMemo(() => {
    polyline.setOptions(polylineOptions);
  }, [polyline, polylineOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // update the path with the encodedPath
  useMemo(() => {
    if (!encodedPath || !geometryLibrary) return;
    const path = geometryLibrary.encoding.decodePath(encodedPath);
    polyline.setPath(path);
  }, [polyline, encodedPath, geometryLibrary]);

  // create polyline instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined)
        console.error("<Polyline> has to be inside a Map component.");

      return;
    }

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map]);

  // attach and re-attach event-handlers when any of the properties change
  useEffect(() => {
    if (!polyline) return;

    // Add event listeners
    const gme = google.maps.event;
    [
      ["click", "onClick"],
      ["drag", "onDrag"],
      ["dragstart", "onDragStart"],
      ["dragend", "onDragEnd"],
      ["mouseover", "onMouseOver"],
      ["mouseout", "onMouseOut"],
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polyline, eventName, (e: google.maps.MapMouseEvent) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polyline);
    };
  }, [polyline]);

  return polyline;
}

/**
 * Component to render a polyline on a map
 */
export const Polyline = forwardRef((props: PolylineProps, ref: PolylineRef) => {
  const polyline = usePolyline(props);

  useImperativeHandle(ref, () => polyline, []);

  return null;
});

export const DisplayPolyline = () => (
  <Polyline
    path={path}
    strokeColor="#8C161E"
    strokeOpacity={0}
    //strokeWeight={0.5}
    icons={[
      {
        icon: {
          path: "M 0,-1 0,1", // Define the dash pattern
          strokeOpacity: 1,
          scale: 3.2,
        },
        offset: "0",
        repeat: "20px", // Length of each dash
      },
    ]}
  />
);

const path = [
  { lat: 14.662905175798597, lng: 121.07427563970097 },
  { lat: 14.663413936223192, lng: 121.07378542752616 },
  { lat: 14.66247978883454, lng: 121.06655419250268 },
  { lat: 14.655163778993526, lng: 121.05577527244223 },
  { lat: 14.653273340398847, lng: 121.05277757919298 },
  { lat: 14.652796006042918, lng: 121.0532114074417 },
  { lat: 14.652557465820896, lng: 121.053321410709 },
  { lat: 14.652033368064744, lng: 121.05351319310951 },
  { lat: 14.65254645626592, lng: 121.05525595092706 },
  { lat: 14.6521701671542, lng: 121.0570487142753 },
  { lat: 14.65125993618955, lng: 121.05897487678465 },
  { lat: 14.64885777371452, lng: 121.05946899765411 },
  { lat: 14.64727772725403, lng: 121.0600176263693 },
  { lat: 14.647071450881526, lng: 121.06072001956106 },
  { lat: 14.647079308501343, lng: 121.06131462700003 },
  { lat: 14.647636621439998, lng: 121.06391390747196 },
  { lat: 14.647658641042838, lng: 121.06500635376972 },
  { lat: 14.647908196385107, lng: 121.06586362061145 },
  { lat: 14.647226625418513, lng: 121.06775471420445 },
  { lat: 14.647115527942852, lng: 121.06959198263317 },
  { lat: 14.64730069036765, lng: 121.07095079571832 },
  { lat: 14.647988876001296, lng: 121.07215012367091 },
  { lat: 14.648216648191879, lng: 121.07397400058267 },
  { lat: 14.652529880581985, lng: 121.07413406057273 },
  { lat: 14.657524849288006, lng: 121.07410543333046 },
  { lat: 14.65788137199028, lng: 121.0742063383195 },
  { lat: 14.65887075818878, lng: 121.07536593420035 },
  { lat: 14.659444685223225, lng: 121.07600052959381 },
  { lat: 14.660194141267002, lng: 121.07581038515573 },
  { lat: 14.66161707137363, lng: 121.0751558458549 },
  { lat: 14.662108528688663, lng: 121.07490862893522 },
  { lat: 14.662905175798597, lng: 121.07427563970097 },
];
