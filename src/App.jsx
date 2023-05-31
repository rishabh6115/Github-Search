import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import User from "./assets/Components/User";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <User />
      <Box
        onClick={() => {
          mode === "light" ? setMode("dark") : setMode("light");
        }}
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
