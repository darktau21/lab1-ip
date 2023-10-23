import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";

export interface Node {
  id: string;
  failureRate?: number;
  recoveryTime?: number;
  label: string;
}

export interface Link {
  id: string;
  channelsCount?: number;
  speed?: number;
  avgMsgSize?: number;
  timeout?: number;
  recoveryTime?: number;
  failureRate?: number;
  source: string;
  target: string;
  label: string;
}

export interface Route {
  nodes: string[];
}

export interface Model {
  name: string;
  avgMsgLength: number;
  msgIntensity: number;
  minTime: number;
  nodes?: Node[];
  links?: Link[];
  routes?: Route[];
}

interface ModelsState {
  list: Model[];
}

const initialState: ModelsState = {
  list: [],
};

const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    addModel(state, action: PayloadAction<Model>) {
      state.list.push(action.payload);
    },
    removeModel(state, action: PayloadAction<string>) {
      state.list = state.list.filter((model) => model.name !== action.payload);
    },
    addNode(
      state,
      action: PayloadAction<{ model: string; node: Omit<Node, "id" | "label"> }>
    ) {
      const { model, node } = action.payload;
      const modelF = state.list.find((m) => m.name === model);
      if (!modelF) {
        throw new Error("Model not found");
      }
      if (!modelF.nodes) {
        modelF.nodes = [];
      }
      modelF.nodes?.push({
        id: `${modelF.nodes.length + 1}`,
        label: `Узел ${modelF.nodes.length + 1}`,
        ...node,
      });
    },
    removeNode(state, action: PayloadAction<{ model: string; node: Node }>) {
      const { model, node } = action.payload;
      const modelF = state.list.find((m) => m.name === model);
      if (!modelF) {
        throw new Error("Model not found");
      }
      modelF.nodes = modelF.nodes?.filter((n) => n.id !== node.id);
    },
    addLink(
      state,
      action: PayloadAction<{ model: string; link: Omit<Link, "id" | "label"> }>
    ) {
      const { model, link } = action.payload;
      const modelF = state.list.find((m) => m.name === model);
      if (!modelF) {
        throw new Error("Model not found");
      }
      if (!modelF.links) {
        modelF.links = [];
      }
      modelF.links?.push({
        id: `${modelF.links.length + 1}`,
        label: `Связь ${modelF.links.length + 1}`,
        ...link,
      });
    },
    removeLink(state, action: PayloadAction<{ model: string; link: Link }>) {
      const { model, link } = action.payload;
      const modelF = state.list.find((m) => m.name === model);
      if (!modelF) {
        throw new Error("Model not found");
      }
      modelF.links = modelF.links?.filter((n) => n.id !== link.id);
    },
    addRoute(state, action: PayloadAction<{ model: string; route: string }>) {
      const { model, route } = action.payload;
      const modelF = state.list.find((m) => m.name === model);
      if (!modelF) {
        throw new Error("Model not found");
      }
      if (!modelF.routes) {
        modelF.routes = [];
      }

      const routeArray = route.split(",");
      modelF.routes?.push({
        nodes: routeArray,
      });
    },
  },
});

export const {
  addModel,
  removeModel,
  addNode,
  removeNode,
  addLink,
  removeLink,
  addRoute,
} = modelsSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, modelsSlice.reducer);

export const store = configureStore({
  reducer: {
    models: persistedReducer,
  },
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
