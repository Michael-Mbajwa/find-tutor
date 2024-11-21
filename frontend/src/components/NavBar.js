import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import SignUpModal from "./SignUpModal";

const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            Find My Tutor
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<PersonAddIcon />}
            onClick={handleOpen}
            sx={{
              borderColor: "white",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Register as Tutor
          </Button>
        </Toolbar>
      </AppBar>

      <SignUpModal open={modalOpen} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
