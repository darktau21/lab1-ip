import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Model } from "../store";
import RoutesList from "./RoutesList";
import AvgTransferTimeTable from "./AvgTransferTimeTable";
import { CalcModel } from "../utils/CalcModel";
import MsgAvgCountTable from "./MsgAvgCountTable";
import IntensityTable from "./IntensityTable";
import AvgTimeTable from "./AvgTimeTable";
import RouteTimeTable from "./RouteTimeTable";
import RouteMsgDeliveryTable from "./RouteMsgDeliveryTable";

const Calcs = ({ model }: { model: Model }) => {
  if (model.routes?.length === 0 || model.nodes?.length === 0) return null;
  // console.log(model.routes, model.nodes, model.links);
  // const routesFailure = model.routes?.map((route) => {
  //   return calculateRouteFailure(model.nodes!, model.links!, route);
  // });

  // const normRouteFailures = calcNormRoutesFailures(routesFailure!);

  // const linksAvgTime = model.links?.map((link) => {
  //   return linkAvgTime(link);
  // });

  // const routesIntensities = normRouteFailures.map((failure) => {
  //   return routeIntensity(failure.prob, model.msgIntensity);
  // });

  // const nodeDelayTimes = routesIntensities.map((route, i) => {
  //   return nodeDelayTime(linksAvgTime![i].time, route.intensity);
  // });
  const calcModel = new CalcModel(model);
  const routesFailure = calcModel.calcRouteFailures();
  const normRouteFailures = calcModel.calcNormRoutesFailures(routesFailure);
  const linksAvgTime = calcModel.calcAvgLinkTransferTime();
  const avgTransTimeTable = calcModel.calcAvgTransferTime();
  const {
    nodeMsgAvgCountTable,
    nodeAvgTimeTable,
    nodeIntensityTable,
    routeIntensities,
  } = calcModel.calcAll();

  return (
    <>
      <Box>
        <h2>Маршруты</h2>
        <RoutesList routes={model.routes} />
      </Box>
      <Box>
        <h2>Вероятность отказа маршрутов</h2>
        <List>
          {routesFailure?.map(({ prob, formula }, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`P${i + 1} = ${formula} = ${prob.toFixed(3)}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <h2>Нормированная вероятность отказа маршрутов</h2>
        <List>
          {normRouteFailures?.map(({ prob, formula }, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`P${i + 1} = ${formula} = ${prob.toFixed(3)}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <h2>Среднее время передачи в канале</h2>
        <List>
          {linksAvgTime?.map(({ formula, time }, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`t${i + 1} = ${formula} = ${time.toFixed(3)}`}
              />
            </ListItem>
          ))}
        </List>

        <AvgTransferTimeTable avgTransferTimeTable={avgTransTimeTable} />
      </Box>
      <Box>
        <h2>Распределение интенсивностей</h2>
        <List>
          {routeIntensities.map((item, i) => (
            <ListItem key={i}>
              <ListItemText primary={`a${i + 1} = ${item.formula}`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <h2>Число сообщений в очереди</h2>
        <MsgAvgCountTable msgAvgCountTable={nodeMsgAvgCountTable} />
      </Box>
      <Box>
        <h2>Интенсивность потоков адресации</h2>
        <IntensityTable intensityTable={nodeIntensityTable} />
      </Box>
      <Box>
        <h2>Средние величины времени задержки</h2>
        <AvgTimeTable avgTimeTable={nodeAvgTimeTable} />
      </Box>
      <Box>
        <h2>Среднее время задержки по маршрутам</h2>
        <RouteTimeTable routeTimeTable={calcModel.calcRouteTime()} />
      </Box>
      <Box>
        <h2>Время доставки сообщений по маршрутам</h2>
        <RouteMsgDeliveryTable
          routeMsgDeliveryTable={calcModel.calcRouteMsgDeliveryTime()}
        />
      </Box>
    </>
  );
};

export default Calcs;
