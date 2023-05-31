/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UserDetails from "./UserDetails";
import UserRepo from "./UserRepo";
import { useTheme } from "@mui/material/styles";

const User = () => {
  const [input, setInput] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const profile_response = await axios.get(
        `https://api.github.com/users/${input}`
      );
      const profile_repo_data = await axios.get(
        `https://api.github.com/users/${input}/repos?page=${page}&per_page=10`
      );

      setUserDetails(profile_response.data);
      setUserRepo(profile_repo_data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const pageNavigationFunction = async () => {
    try {
      setLoading(true);
      const profile_repo_data = await axios.get(
        `https://api.github.com/users/${input}/repos?page=${page}&per_page=10`
      );
      setUserRepo(profile_repo_data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const changePage = (value) => {
    setPage(value);
  };

  useEffect(() => {
    if (input !== "") {
      pageNavigationFunction();
    }
  }, [page]);

  const clickHandler = () => {
    if (input === "") {
      toast.error("Please Enter A Search Value");
      return;
    }
    getUserDetails();
  };

  return (
    <Box
      sx={{ background: theme.palette.background.default, minHeight: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "700",
            marginTop: "0.5rem",
            color: theme.palette.text.primary,
          }}
        >
          Search Github Users
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <TextField
          label="Search User"
          variant="outlined"
          onChange={(e) => setInput(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
        />
        <Button
          variant="contained"
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onClick={clickHandler}
        >
          Submit
        </Button>
      </Box>
      {Object.keys(userDetails).length !== 0 && loading === false && (
        <UserDetails userDetails={userDetails} />
      )}
      {userRepo.length !== 0 && loading === false && (
        <UserRepo
          userRepo={userRepo}
          repoNum={userDetails.public_repos}
          changePage={changePage}
          page={page}
        />
      )}
      {loading && (
        <Box
          sx={{
            display: "flex",
            minHeight: "40vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
};

export default User;
