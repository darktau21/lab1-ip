import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Model } from "../store";

const Info = ({ model }: { model: Model }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell>Среднее длина сообщения</TableCell>
          <TableCell>Средняя интенсивность сообщений</TableCell>
          <TableCell>Минимальное время доставки</TableCell>
        </TableHead>
        <TableRow>
          <TableCell>{model.avgMsgLength}</TableCell>
          <TableCell>{model.msgIntensity}</TableCell>
          <TableCell>{model.minTime}</TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};

export default Info;
