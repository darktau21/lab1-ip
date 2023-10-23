import { Alert, Box, Paper, Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { RootState } from "../store";
import NodeForm from "./NodeForm";
import { SyntheticEvent, useState } from "react";
import LinkForm from "./LinkForm";
import LinksList from "./LinksList";
import Info from "./Info";
import RouteForm from "./RouteForm";
import NodesList from "./NodesList";
import RoutesList from "./RoutesList";
import Calcs from "./Calcs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ModelPanel = () => {
  const { id } = useParams();
  const model = useSelector((state: RootState) =>
    state.models.list.find((model) => model.name === id)
  );

  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!model)
    return (
      <Alert severity="warning">
        Такой модели нет - <NavLink to={"/"}>Создать модель</NavLink>
      </Alert>
    );
  return (
    <Paper elevation={3} sx={{ padding: "2rem" }}>
      <h1>{model.name}</h1>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Общие" />
          <Tab label="Узлы" />
          <Tab label="Связи" />
          <Tab label="Маршруты" />
          <Tab label="Расчеты" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Info model={model} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <NodeForm id={id} />
          <NodesList id={id} nodes={model.nodes} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <LinkForm id={id} nodes={model.nodes} />
          <LinksList id={id} links={model.links} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <RouteForm id={id} />
          <RoutesList routes={model.routes} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Calcs model={model} />
        </CustomTabPanel>
      </Box>
    </Paper>
  );
};

export default ModelPanel;
