import { Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { addRoute, useAppDispatch } from "../store";

type FormValues = {
  route: string;
};

const RouteForm = ({ id }: { id?: string }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  if (!id) return null;
  const onSubmit = ({ route }: FormValues) => {
    dispatch(addRoute({ model: id, route }));
    reset();
  };
  return (
    <Paper sx={{ p: 2, width: "100%" }} elevation={3}>
      <h2>Номера узлов через запятую</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          id="route"
          label="Маршрут"
          {...register("route")}
        />
        <Button variant="contained" type="submit">
          Добавить
        </Button>
      </form>
    </Paper>
  );
};

export default RouteForm;
