import {
  Alert,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Node, removeNode, useAppDispatch } from "../store";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";

const NodesList = ({ nodes, id }: { nodes?: Node[]; id?: string }) => {
  const dispatch = useAppDispatch();
  if (!id) return null;
  if (!nodes?.length)
    return <Alert severity="warning">Нет созданных узлов</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell>
            <CircleIcon />
          </TableCell>
          <TableCell>Вероятность отказа</TableCell>
          <TableCell>Время восстановления</TableCell>
          <TableCell />
        </TableHead>
        {nodes.map((node) => (
          <TableRow key={node.id}>
            <TableCell>{node.label}</TableCell>
            <TableCell>{node.failureRate}</TableCell>
            <TableCell>{node.recoveryTime}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => dispatch(removeNode({ model: id, node }))}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default NodesList;
