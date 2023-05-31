import { useTheme } from "@emotion/react";
import { Box, Pagination, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const UserRepo = ({ userRepo, repoNum, changePage, page }) => {
  console.log(Math.ceil(repoNum / 10));
  const theme = useTheme();
  return (
    <Box
      sx={{
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", marginTop: "2rem" }}
      >
        All repositories
      </Typography>
      <Box
        sx={{
          display: "grid",
          flexWrap: "wrap",
          gridTemplateColumns: [
            "repeat(1,minmax(300px ,1fr))",
            "repeat(2,minmax(300px ,1fr))",
            "repeat(3,minmax(300px ,1fr))",
          ],
          gap: "1rem",
          marginTop: "2rem",
          width: ["90%", "90%", "85%"],
          margin: "1rem auto 0",
        }}
      >
        {userRepo.map((item, index) => (
          <Box
            key={index}
            sx={{
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 0px 2px 1px #00000017"
                  : "0px 0px 4px 1px #ffffff45",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              Repo Name : {item.full_name}
            </Typography>
            <Typography variant="body1">
              Description : {item.description}
            </Typography>
            <Typography variant="body1">
              Language Used : {item.language}
            </Typography>
            <Typography variant="body1">Forks : {item.forks_count}</Typography>
            <Typography variant="body1">
              Watchers : {item.watchers_count}
            </Typography>
          </Box>
        ))}
      </Box>
      <Pagination
        count={Math.ceil(repoNum / 10)}
        color="primary"
        sx={{ marginBlock: "2rem" }}
        onChange={(_, v) => {
          changePage(v);
        }}
        page={page}
      />
    </Box>
  );
};

export default UserRepo;
