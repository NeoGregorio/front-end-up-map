import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Icon imports
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import StoreIcon from "@mui/icons-material/Store";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface InfoBarProps {
  store: any;
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

export default function InfoBar({ store, open, toggleDrawer }: InfoBarProps) {
  //console.log(store);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const display = [
    {
      text: "Rating",
      icon: <StarIcon className="text-secondary" />,
      data: (
        <>
          <div>{store?.rating}</div>
          <Rating
            className="ml-2"
            name="read-only"
            precision={0.5}
            value={store?.rating}
            readOnly
          />
        </>
      ),
    },
    {
      text: "Address",
      icon: <LocationOnIcon className="text-secondary" />,
      data: store?.address,
    },
    {
      text: "Store Type",
      icon: getIcon(String(store?.type)),
      data: store?.type?.charAt(0).toUpperCase() + store?.type?.slice(1),
    },
    {
      text: "URL",
      icon: <PublicIcon className="text-secondary" />,
      data: store?.url ? (
        <a href={store.url} target="_blank" rel="noopener noreferrer">
          {store.url}
        </a>
      ) : (
        "N/A"
      ),
    },
    {
      text: "Wheelchair Accessible Entrance",
      icon: <AccessibleIcon className="text-secondary" />,
      data: wheelechairAccess(store?.wheelechair_accessible_entrance),
    },
  ];

  return (
    <Drawer
      open={open} // state variable
      anchor={isSmallScreen ? "bottom" : "right"} // specifies from which direction
      onClose={toggleDrawer} // calls this on closing the drawer, sets state of 'open' to false
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: { xs: "100%", sm: "35%" },
          top: { xs: "65%", sm: "64px" },
        },
      }}
    >
      <div className="m-5 px-5">
        <List>
          <ListItem className="text-2xl font-bold">
            {store?.name ?? "Select a store to view more information"}
          </ListItem>

          {display.map((info) => (
            <Tooltip key={info.text} title={info.text} placement="bottom-start">
              <ListItem className="hoverable">
                <ListItemIcon>{info.icon}</ListItemIcon>
                {info.data ?? "N/A"}
              </ListItem>
            </Tooltip>
          ))}
          <ListItem className="flex justify-center items-center mt-2">
            <img src={store?.store_id + ".jpg"} alt={store?.store_id} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

const wheelechairAccess = (wae: boolean | null) => {
  switch (wae) {
    case null:
      return null;
    case false:
      return "No Wheelchair Accessible Entrance";
    default:
      return "Wheelchair Accessible Entrance";
  }
};

const getIcon = (storeType: string) => {
  switch (storeType) {
    case "restaurant":
      return <RestaurantIcon className="text-secondary" />;
    case "cafe":
      return <LocalCafeIcon className="text-secondary" />;
    case "store":
      return <StoreIcon className="text-secondary" />;
    default:
      return <></>;
  }
};
