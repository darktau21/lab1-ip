import { useForm } from "react-hook-form";
import { addNode, useAppDispatch } from "../store";
import { Button, Paper, TextField } from "@mui/material";

type FormValues = {
  failureRate: number;
  recoveryTime: number;
};

const CreateForm = ({ id }: { id?: string }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  if (!id) return null;

  const onSubmit = ({ recoveryTime, failureRate }: FormValues) => {
    dispatch(
      addNode({
        model: id,
        node: {
          recoveryTime: +recoveryTime,
          failureRate: +failureRate,
        },
      })
    );
    reset();
  };

  return (
    <Paper sx={{ p: 2, width: "100%" }} elevation={3}>
      <h2>Создать узел</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          id="failureRate"
          label="Вероятность отказа узла"
          {...register("failureRate")}
        />
        <TextField
          variant="outlined"
          id="recoveryTime"
          label="Среднее время восстановления узла"
          {...register("recoveryTime")}
        />
        <Button variant="contained" type="submit">
          Добавить
        </Button>
      </form>
    </Paper>
  );
};

export default CreateForm;
