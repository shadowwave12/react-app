import React, { useState } from "react";
import { Button, TextField, Typography, Box, Avatar } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebaseConfig.jsx"; // Make sure to adjust the path if necessary
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (photo) {
        const storageRef = ref(
          storage,
          `profile_pics/${user.uid}/${photo.name}`
        );
        await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(user, { displayName: name, photoURL: downloadURL });
      } else {
        await updateProfile(user, { displayName: name });
      }

      setSuccess("Sign up successful!");
      navigate("/profile"); // Redirect to profile after signup

      // Redirect to login or profile page, if needed
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: "300px", padding: 4 }}>
        <Typography variant="h4" align="center" color="primary">
          Sign Up
        </Typography>
        <Avatar
          src={photo ? URL.createObjectURL(photo) : ""}
          alt="Profile Picture"
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" gutterBottom>
            {success}
          </Typography>
        )}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          style={{ margin: "10px 0" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default Signup;
