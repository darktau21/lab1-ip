import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const RouteMsgDeliveryTable = ({
  routeMsgDeliveryTable,
}: {
  routeMsgDeliveryTable: {
    route: number;
    time: number;
    formula: string;
  }[];
}) => {
  return (
    <Paper elevation={3}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Номера маршрутов</TableCell>
            {routeMsgDeliveryTable.map((item, i) => (
              <TableCell key={i}>{item.route + 1}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Среднее время задержки</TableCell>
            {routeMsgDeliveryTable.map((item, i) => (
              <TableCell key={i}>{item.time.toFixed(3)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <List>
        {routeMsgDeliveryTable.map((item, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`t${item.route + 1} = ${
                item.formula
              } = ${item.time.toFixed(3)}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RouteMsgDeliveryTable;
