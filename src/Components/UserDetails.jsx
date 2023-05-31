/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Avatar, Box, Typography } from "@mui/material";

const UserDetails = ({ userDetails }) => {
  const theme = useTheme();
  const userInformation = [
    { label: "Username", value: userDetails.login },
    { label: "Name", value: userDetails.name },
    { label: "Bio", value: userDetails.bio },
    { label: "Location", value: userDetails.location },
    { label: "Followers", value: userDetails.followers },
    { label: "Following", value: userDetails.following },
    { label: "Public Repo", value: userDetails.public_repos },
  ];

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
        {userInformation.map((info) => (
          <Typography key={info.label} variant="body1">
            {info.label}: {info.value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default UserDetails;
