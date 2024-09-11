import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login or home after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {user ? (
        <Box
          sx={{
            width: "300px",
            padding: 4,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Avatar
            src={user.photoURL}
            alt="Profile Picture"
            sx={{ width: 100, height: 100, marginBottom: 2, margin: "0 auto" }}
          />
          <Typography variant="h5" gutterBottom>
            {user.displayName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {user.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}

export default Profile;
