import { useSelector } from "react-redux";
import { RootState, removeModel, useAppDispatch } from "../store";
import {
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import LanIcon from "@mui/icons-material/Lan";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink, useNavigate } from "react-router-dom";

const ModelsList = () => {
  const models = useSelector((state: RootState) => state.models.list);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (models.length === 0)
    return (
      <Alert severity="warning">
        Нет созданных моделей - <NavLink to={"/"}>Создать модель</NavLink>
      </Alert>
    );

  return (
    <Paper elevation={3}>
      <List>
        {models.map(({ name }) => (
          <ListItem>
            <ListItemButton onClick={() => navigate(`/model/${name}`)}>
              <ListItemIcon>
                <LanIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
            <ListItemIcon onClick={() => dispatch(removeModel(name))}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ModelsList;
