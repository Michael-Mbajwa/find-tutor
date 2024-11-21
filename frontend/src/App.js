import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import NavBar from "./components/NavBar";
import { subjects, levels } from "./constants/constants";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState(subjects[0]);
  const [subject, setSubject] = useState(levels[0]);
  const [tutors, setTutors] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setTutors(null);

    const studentData = {
      first_name: firstName,
      last_name: lastName,
      level: parseInt(level),
      subject,
    };

    try {
      const response = await fetch("http://127.0.0.1:8100/tutors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("No matching tutor found");
      }

      const matchedTutors = await response.json();
      setTutors(matchedTutors);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Changed to row to align form and tutor list horizontally
          justifyContent: "space-around", // Space around for proper spacing
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          p: 2,
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%", // Adjust width as needed
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Find a Tutor
          </Typography>

          <Paper sx={{ p: 3, width: "100%", maxWidth: 400 }} elevation={3}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={level}
                    label="Level"
                    onChange={(e) => setLevel(e.target.value)}
                    required
                  >
                    {levels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    value={subject}
                    label="Subject"
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#3f51b5",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
                fullWidth
              >
                Find Tutor
              </Button>
            </form>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Box>

        {/* Tutors Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "40%", // Adjust width as needed
            maxHeight: "80vh", // Fixed height for scroll
            overflowY: "auto", // Scrollable
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            bgcolor: "white",
          }}
        >
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  width: "95%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Nice shadow
                  borderRadius: 2, // Rounded corners
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Matched Tutor {index + 1}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography>First Name: {tutor.first_name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography>Last Name: {tutor.last_name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <MonetizationOnIcon sx={{ mr: 1 }} />
                  <Typography>Price: {tutor.price} Naira</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <Typography>Phone Number: {tutor.phone_number}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography>Email: {tutor.email}</Typography>
                </Box>
              </Paper>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "95%",
                textAlign: "center",
                p: 2,
                bgcolor: "#f9f9f9",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ color: "#666", mb: 2 }}>
                No tutors found
              </Typography>
              <SchoolIcon sx={{ fontSize: 50, color: "#aaa" }} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
