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

const AvgTimeTable = ({
  avgTimeTable,
}: {
  avgTimeTable: {
    route: number;
    nodes: {
      nodeId: string;
      avgTime: number;
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
          {avgTimeTable.map((item, i) => (
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
                      <TableCell>Время задержки</TableCell>
                      {item.nodes.map((node, j) =>
                        j === 0 ? null : (
                          <TableCell key={j}>
                            {node.avgTime.toFixed(3)}
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
      {avgTimeTable.map((item) => (
        <>
          <h2>Маршрут {item.route + 1}</h2>
          <List>
            {item.nodes.map((node, j) =>
              j === 0 ? null : (
                <ListItem key={j}>
                  <ListItemText primary={`w${j + 1} = ${node.formula}`} />
                </ListItem>
              )
            )}
          </List>
        </>
      ))}
    </Paper>
  );
};

export default AvgTimeTable;
