import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar() {
  return (
    <AppBar
      className="bg-primary"
      position="static"
      sx={{
        height: "64px",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      // clips the infobar drawer under the navbar
    >
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div>
          <p className="font-bold text-xl sm:text-2xl">
            Where To Go In UP Diliman?
          </p>
          <p className="flex justify-center text-xs">
            Developed by Herminio Gregorio for Navagis
          </p>
        </div>

        <img
          src="/logo.svg"
          className="max-w-full max-h-full p-2 ml-2"
          alt="Logo"
        />
      </Toolbar>
    </AppBar>
  );
}
