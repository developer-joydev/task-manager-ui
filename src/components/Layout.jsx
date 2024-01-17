import React from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Container from "@mui/material/Container";
import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <Container fixed>
      <Navigation />
      <Grid container>
        <Grid
          item
          xs={3}
          sx={{
            flex: 1,
            height: "90vh",
            borderRight: "1px solid #ddd",
          }}
        >
          <MenuList>
            <MenuItem sx={{ bgcolor: "#f3f3f3", p: 2, mb: 1 }}>Tasks</MenuItem>
            <MenuItem sx={{ bgcolor: "#fff", p: 2, mb: 1 }}>Completed</MenuItem>
            <MenuItem sx={{ bgcolor: "#fff", p: 2, mb: 1 }}>Pending</MenuItem>
          </MenuList>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            bgcolor: "#fff",
            flex: 1,
            height: "90vh",
            pl: 3,
            position: "relative",
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
