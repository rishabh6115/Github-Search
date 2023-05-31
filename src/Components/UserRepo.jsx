import { useTheme } from "@emotion/react";
import { Box, Pagination, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const UserRepo = ({ userRepo, repoNum, changePage, page }) => {
  const theme = useTheme();
  const propertyLabels = [
    { label: "Repo Name", property: "full_name" },
    { label: "Description", property: "description" },
    { label: "Language Used", property: "language" },
    { label: "Forks", property: "forks_count" },
    { label: "Watchers", property: "watchers_count" },
  ];
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
            {propertyLabels.map((prop, index) => (
              <Typography key={index} variant="body1">
                {prop.label}: {item[prop.property]}
              </Typography>
            ))}
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
