import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import User from "./Components/User";
import { Toaster } from "react-hot-toast";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import "./App.css";

function App() {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <User />
      <IconButton
        onClick={toggleMode}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
      >
        {mode === "dark" ? (
          <LightModeOutlinedIcon sx={{ fill: "white" }} />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
    </ThemeProvider>
  );
}

export default App;
