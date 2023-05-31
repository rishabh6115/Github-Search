/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import UserDetails from "./UserDetails";
import UserRepo from "./UserRepo";
import { useTheme } from "@mui/material/styles";

const User = () => {
  const [input, setInput] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const getUserDetails = async () => {
    try {
      setLoading(true);
      setLoadingRepo(true);
      const [profileResponse, profileRepoData] = await Promise.all([
        axios.get(`https://api.github.com/users/${input}`),
        axios.get(`https://api.github.com/users/${input}/repos`, {
          params: { page, per_page: 10 },
        }),
      ]);

      setUserDetails(profileResponse.data);
      setUserRepo(profileRepoData.data);
      setLoading(false);
      setLoadingRepo(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setLoading(false);
      setLoadingRepo(false);
    }
  };

  const pageNavigationFunction = async () => {
    try {
      setLoadingRepo(true);
      const profileRepoData = await axios.get(
        `https://api.github.com/users/${input}/repos`,
        {
          params: { page, per_page: 10 },
        }
      );
      setUserRepo(profileRepoData.data);
      setLoadingRepo(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setLoadingRepo(false);
    }
  };
  console.log({ loading });
  console.log({ loadingRepo });
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

  const userDetailsNotEmpty = Object.keys(userDetails).length !== 0;
  const userRepoNotEmpty = userRepo.length !== 0;

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
          value={input}
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
      {userDetailsNotEmpty && !loading && (
        <UserDetails userDetails={userDetails} />
      )}
      {userRepoNotEmpty && !loadingRepo && (
        <UserRepo
          userRepo={userRepo}
          repoNum={userDetails.public_repos}
          changePage={changePage}
          page={page}
        />
      )}
      {(loading || loadingRepo) && (
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
