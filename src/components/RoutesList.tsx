import {
  Alert,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Route } from "../store";
import AltRouteIcon from "@mui/icons-material/AltRoute";

const RoutesList = ({ routes }: { routes?: Route[] }) => {
  if (!routes?.length) {
    return <Alert severity="warning">Нет созданных маршрутов</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell>
            <AltRouteIcon />
          </TableCell>
          <TableCell>Маршрут</TableCell>
        </TableHead>
        {routes.map((route, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{route.nodes.join(" => ")}</TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default RoutesList;
