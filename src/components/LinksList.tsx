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
import { Link, removeLink, useAppDispatch } from "../store";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";

const LinksList = ({ links, id }: { links?: Link[]; id?: string }) => {
  const dispatch = useAppDispatch();
  if (!id) return null;
  if (!links?.length)
    return <Alert severity="warning">Нет созданных связей</Alert>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableCell>
            <LinkIcon />
          </TableCell>
          <TableCell>Скорость модуляции</TableCell>
          <TableCell>Число каналов в пучке</TableCell>
          <TableCell>Время восстановления</TableCell>
          <TableCell>Вероятность отказа</TableCell>
          <TableCell>Средняя длина пакета</TableCell>
          <TableCell>Узлы</TableCell>
          <TableCell />
        </TableHead>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell>{link.label}</TableCell>
            <TableCell>{link.speed}</TableCell>
            <TableCell>{link.channelsCount}</TableCell>
            <TableCell>{link.recoveryTime}</TableCell>
            <TableCell>{link.failureRate}</TableCell>
            <TableCell>{link.avgMsgSize}</TableCell>
            <TableCell>{`${link.source} <=> ${link.target}`}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => dispatch(removeLink({ model: id, link }))}
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

export default LinksList;
