import { AppBar, Container } from "@mui/material";
import { NavLink } from "react-router-dom";

const AppMenu = () => {
  return (
    <AppBar sx={{ fontSize: "25px", p: 1 }}>
      <Container sx={{ display: "flex", gap: "20px" }}>
        <NavLink style={{ textDecoration: "none", color: "white" }} to={"/"}>
          Создать модель
        </NavLink>
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          to={"/list"}
        >
          Список моделей
        </NavLink>
      </Container>
    </AppBar>
  );
};

export default AppMenu;
