import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { subjects, levels } from "../constants/constants";

const SignUpModal = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState({});
  const [feedback, setFeedback] = useState(null);

  const handleSubjectChange = (event) => {
    const selected = event.target.value;
    setSelectedSubjects(selected);

    const updatedDetails = { ...subjectDetails };
    selected.forEach((subject) => {
      if (!updatedDetails[subject]) {
        updatedDetails[subject] = { levels: [], price: "" };
      }
    });

    Object.keys(updatedDetails).forEach((subject) => {
      if (!selected.includes(subject)) {
        delete updatedDetails[subject];
      }
    });

    setSubjectDetails(updatedDetails);
  };

  const handleLevelChange = (subject) => (event) => {
    const levels = event.target.value;
    setSubjectDetails((prev) => ({
      ...prev,
      [subject]: { ...prev[subject], levels },
    }));
  };

  const handlePriceChange = (subject) => (event) => {
    const price = event.target.value;
    setSubjectDetails((prev) => ({
      ...prev,
      [subject]: { ...prev[subject], price },
    }));
  };

  const handleRegister = async () => {
    const formData = {
      name,
      studentId,
      email,
      phoneNumber,
      dob,
      subjects: selectedSubjects.map((subject) => ({
        subject,
        levels: subjectDetails[subject]?.levels || [],
        price: subjectDetails[subject]?.price || "",
      })),
    };

    try {
      const response = await fetch("http://127.0.0.1:8100/register-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setFeedback({ success: true, message: result.message });
        resetForm();
      } else {
        const error = await response.json();
        setFeedback({ success: false, message: error.detail });
      }
    } catch (err) {
      console.error("Error:", err);
      setFeedback({ success: false, message: "An unexpected error occurred." });
    }
  };

  const resetForm = () => {
    setName("");
    setStudentId("");
    setEmail("");
    setPhoneNumber("");
    setDob("");
    setSelectedSubjects([]);
    setSubjectDetails({});
  };

  const closeFeedback = () => setFeedback(null);

  return (
    <>
      <Modal open={!!feedback} onClose={closeFeedback}>
        <Box sx={{ ...modalStyle, textAlign: "center" }}>
          <Typography variant="h6" component="h2">
            {feedback?.success ? "Success" : "Error"}
          </Typography>
          <Typography sx={{ mt: 2 }}>{feedback?.message}</Typography>
          <Button
            variant="contained"
            color={feedback?.success ? "success" : "error"}
            sx={{ mt: 3 }}
            onClick={closeFeedback}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Tutor Registration
          </Typography>
          <Box sx={scrollableContentStyle}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl
              fullWidth
              margin="normal"
              sx={{ position: "relative" }}
            >
              <InputLabel
                shrink
                sx={{ backgroundColor: "white", padding: "0 4px" }}
              >
                Subjects
              </InputLabel>
              <Select
                multiple
                value={selectedSubjects}
                onChange={handleSubjectChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    <Checkbox
                      checked={selectedSubjects.indexOf(subject) > -1}
                    />
                    <ListItemText primary={subject} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedSubjects.map((subject) => (
              <Box key={subject} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">{subject}</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={{ position: "relative" }}>
                      <InputLabel
                        shrink
                        sx={{ backgroundColor: "white", padding: "0 4px" }}
                      >
                        Levels
                      </InputLabel>
                      <Select
                        multiple
                        value={subjectDetails[subject]?.levels || []}
                        onChange={handleLevelChange(subject)}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {levels.map((level) => (
                          <MenuItem key={level} value={level}>
                            <Checkbox
                              checked={
                                subjectDetails[subject]?.levels?.indexOf(
                                  level,
                                ) > -1
                              }
                            />
                            <ListItemText primary={`Level ${level}`} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={`Price for ${subject}`}
                      value={subjectDetails[subject]?.price || ""}
                      onChange={handlePriceChange(subject)}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#3f51b5",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflow: "hidden",
};

const scrollableContentStyle = {
  maxHeight: "70vh",
  overflowY: "auto",
};

export default SignUpModal;
