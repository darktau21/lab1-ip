import { useForm } from "react-hook-form";
import { Node, addLink, useAppDispatch } from "../store";
import { Button, MenuItem, Paper, Select, TextField } from "@mui/material";

type FormValues = {
  channelsCount: number;
  speed: number;
  failureRate: number;
  avgMsgSize: number;
  timeout: number;
  recoveryTime: number;
  source: string;
  target: string;
};

const LinkForm = ({ id, nodes }: { id?: string; nodes?: Node[] }) => {
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  if (!id) return null;

  const onSubmit = ({
    channelsCount,
    speed,
    failureRate,
    avgMsgSize,
    timeout,
    recoveryTime,
    source,
    target,
  }: FormValues) => {
    dispatch(
      addLink({
        model: id,
        link: {
          channelsCount: +channelsCount,
          speed: +speed,
          failureRate: +failureRate,
          avgMsgSize: +avgMsgSize,
          timeout: +timeout,
          recoveryTime: +recoveryTime,
          source,
          target,
        },
      })
    );
    reset();
    setFocus("speed");
  };

  return (
    <Paper sx={{ p: 2, width: "100%" }} elevation={3}>
      <h2>Создать связь</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select id="source" label="Узел 1" {...register("source")}>
          {nodes?.map((node) => (
            <MenuItem key={node.id} value={node.id}>
              {node.label}
            </MenuItem>
          ))}
        </Select>
        <Select id="target" label="Узел 2" {...register("target")}>
          {nodes?.map((node) => (
            <MenuItem key={node.id} value={node.id}>
              {node.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          variant="outlined"
          id="speed"
          label="Скорость модуляции в канале"
          {...register("speed")}
        />
        <TextField
          variant="outlined"
          id="channelsCount"
          label="Количество каналов в пучке"
          {...register("channelsCount")}
        />
        <TextField
          variant="outlined"
          id="recoveryTime"
          label="Время восстановления канала"
          {...register("recoveryTime")}
        />
        <TextField
          variant="outlined"
          id="failureRate"
          label="Вероятность отказа канала"
          {...register("failureRate")}
        />
        <TextField
          variant="outlined"
          id="avgMsgSize"
          label="Средняя длина пакета"
          {...register("avgMsgSize")}
        />
        <TextField
          variant="outlined"
          id="timeout"
          label="Предельно допустимое время передачи"
          {...register("timeout")}
        />
        <Button variant="contained" type="submit">
          Добавить
        </Button>
      </form>
    </Paper>
  );
};

export default LinkForm;
