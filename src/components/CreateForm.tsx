import { Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { addModel, useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  avgMsgLength: number;
  msgIntensity: number;
  minTime: number;
};

const CreateForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = ({
    name,
    avgMsgLength,
    msgIntensity,
    minTime,
  }: FormValues) => {
    dispatch(
      addModel({
        name,
        avgMsgLength: +avgMsgLength,
        msgIntensity: +msgIntensity,
        minTime: +minTime,
      })
    );
    reset();
    navigate(`/model/${name}`);
  };

  return (
    <Paper sx={{ p: 2, width: "100%" }} elevation={3}>
      <h2>Создать модель</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          id="name"
          label="Название"
          {...register("name")}
        />
        <TextField
          variant="outlined"
          id="avg-chanel-recovery-time"
          label="Средняя длина сообщения"
          {...register("avgMsgLength")}
        />
        <TextField
          variant="outlined"
          id="avg-node-recovery-time"
          label="Средняя интенсивность сообщений"
          {...register("msgIntensity")}
        />
        <TextField
          variant="outlined"
          id="duration"
          label="Минимальное время доставки"
          {...register("minTime")}
        />
        <Button variant="contained" type="submit">
          Заполнить
        </Button>
      </form>
    </Paper>
  );
};

export default CreateForm;
