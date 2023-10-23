import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppMenu from "../components/AppMenu";

const Layout = () => (
  <Container sx={{ p: 0, height: "100%" }} maxWidth={"xl"}>
    <AppMenu />
    <Box sx={{ paddingTop: "8rem", margin: "0 auto" }}>
      <Outlet />
    </Box>
  </Container>
);

export default Layout;
