import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Search from "@/components/Search";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
interface SearchProps {
  setInfoDisplay: (value: any) => void;
  setOpen: (value: boolean) => void; // callback function to open the drawer
}

export default function NavBar({ setInfoDisplay, setOpen }: SearchProps) {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <AppBar
      position="static"
      sx={{
        height: "64px",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        className="bg-primary flex justify-between items-center"
        variant="dense"
      >
        <img
          src="/logo.svg"
          className="max-w-full max-h-full p-2 ml-2"
          alt="Logo"
        />

        {!openSearch && (
          <div className="flex-grow flex justify-center items-center">
            <div>
              <p className="font-bold text-md sm:text-2xl">
                Where To Go In UP Diliman?
              </p>
              <p className="flex justify-center text-xs">
                Developed by Herminio Gregorio for Navagis
              </p>
            </div>
          </div>
        )}

        {openSearch && (
          <div className="flex-grow flex justify-center items-center">
            {/* <SearchIcon fontSize="large" /> */}
            <Search setInfoDisplay={setInfoDisplay} setOpen={setOpen} />
          </div>
        )}

        <div className="ml-auto">
          <button onClick={() => setOpenSearch(!openSearch)}>
            {openSearch ? (
              <div onClick={() => setOpen(false)}>
                <CloseIcon fontSize="large" />
              </div>
            ) : (
              <SearchIcon fontSize="large" />
            )}
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
