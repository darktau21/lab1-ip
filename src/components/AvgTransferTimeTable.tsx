import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const AvgTransferTimeTable = ({
  avgTransferTimeTable,
}: {
  avgTransferTimeTable: {
    route: number;
    channels: {
      linkId: string;
      avgTransTime: number;
      formula: string;
    }[];
  }[];
}) => {
  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableCell>№ маршрута</TableCell>
          <TableCell>Результаты расчета</TableCell>
        </TableHead>
        <TableBody>
          {avgTransferTimeTable.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.route + 1}</TableCell>
              <TableCell>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Номер канала</TableCell>
                      {item.channels.map((channel, j) => (
                        <TableCell key={j}>{channel.linkId}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>Среднее время передачи</TableCell>
                      {item.channels.map((channel, j) => (
                        <TableCell key={j}>
                          {channel.avgTransTime.toFixed(3)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {avgTransferTimeTable.map((item) => (
        <>
          <h2>Маршрут {item.route + 1}</h2>
          <List>
            {item.channels.map((channel, j) => (
              <ListItem key={j}>
                <ListItemText
                  primary={`t${channel.linkId} = ${
                    channel.formula
                  } = ${channel.avgTransTime.toFixed(3)}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      ))}
    </Paper>
  );
};

export default AvgTransferTimeTable;
