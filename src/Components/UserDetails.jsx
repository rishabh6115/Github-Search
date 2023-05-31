/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Avatar, Box, Typography } from "@mui/material";

const UserDetails = ({ userDetails }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        boxShadow:
          theme.palette.mode === "light"
            ? "0px 0px 2px 1px #00000017"
            : "0px 0px 4px 1px #ffffff45",
        padding: "1rem",
        width: ["90%", "70%", "40%"],
        margin: "auto",
        marginTop: "2rem",
        display: ["column", "flex"],
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.text.primary,
        borderRadius: "8px",
      }}
    >
      <Avatar
        alt={userDetails.name}
        src={userDetails.avatar_url}
        sx={{
          width: 100,
          height: 100,
          margin: ["auto", "initial", "initial"],
          marginBottom: ["1rem", 0, 0],
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: ["0", "2rem", "2rem"],
        }}
      >
        <Typography variant="body1">Username : {userDetails.login} </Typography>
        <Typography variant="body1"> Name : {userDetails.name} </Typography>
        <Typography variant="body1"> Bio : {userDetails.bio} </Typography>
        <Typography variant="body1">
          Location : {userDetails.location}
        </Typography>
        <Typography variant="body1">
          Followers : {userDetails.followers}
        </Typography>
        <Typography variant="body1">
          Following : {userDetails.following}
        </Typography>
        <Typography variant="body1">
          Public Repo : {userDetails.public_repos}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserDetails;
