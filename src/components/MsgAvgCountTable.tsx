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

const MsgAvgCountTable = ({
  msgAvgCountTable,
}: {
  msgAvgCountTable: {
    route: number;
    nodes: {
      nodeId: string;
      avgCount: number;
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
          {msgAvgCountTable.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.route + 1}</TableCell>
              <TableCell>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Узел сети</TableCell>
                      {item.nodes.map((node, j) =>
                        j === 0 ? null : (
                          <TableCell key={j}>{node.nodeId}</TableCell>
                        )
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell>Средняя величина очереди</TableCell>
                      {item.nodes.map((channel, j) =>
                        j === 0 ? null : (
                          <TableCell key={j}>
                            {channel.avgCount.toFixed(3)}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {msgAvgCountTable.map((item) => (
        <>
          <h2>Маршрут {item.route + 1}</h2>
          <List>
            {item.nodes.map((node, j) =>
              j === 0 ? null : (
                <ListItem key={j}>
                  <ListItemText primary={`n${j + 1} = ${node.formula}`} />
                </ListItem>
              )
            )}
          </List>
        </>
      ))}
    </Paper>
  );
};

export default MsgAvgCountTable;
