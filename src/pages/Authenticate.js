import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Signup from "./Signup";
import Login from "./Login";

const Authenticate = () => {
  const [loginMode, setLoginMode] = useState(true);
  const switchLoginMode = () => {
    setLoginMode((prev) => !prev);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loginMode ? <Login /> : <Signup />}

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchLoginMode}>
              {loginMode
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign in"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Authenticate;
