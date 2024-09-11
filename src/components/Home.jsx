import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome !
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please sign up or log in to continue
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">New User?</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/signup")}
            sx={{ marginTop: 1 }}
          >
            Sign Up
          </Button>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">Already a User?</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/login")}
            sx={{ marginTop: 1 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
