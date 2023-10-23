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

const IntensityTable = ({
  intensityTable,
}: {
  intensityTable: {
    route: number;
    nodes: {
      nodeId: string;
      intensity: number;
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
          {intensityTable.map((item, i) => (
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
                      <TableCell>Интенсивность</TableCell>
                      {item.nodes.map((node, j) =>
                        j === 0 ? null : (
                          <TableCell key={j}>
                            {node.intensity.toFixed(3)}
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
      {intensityTable.map((item) => (
        <>
          <h2>Маршрут {item.route + 1}</h2>
          <List>
            {item.nodes.map((node, j) =>
              j === 0 ? null : (
                <ListItem key={j}>
                  <ListItemText
                    primary={`a${j + 1} = ${
                      node.formula
                    } = ${node.intensity.toFixed(3)}`}
                  />
                </ListItem>
              )
            )}
          </List>
        </>
      ))}
    </Paper>
  );
};

export default IntensityTable;
