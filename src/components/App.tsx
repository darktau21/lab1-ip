import { RouterProvider } from "react-router-dom";
import router from "../router";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { Dna } from "react-loader-spinner";

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Dna width={200} height={200} />}
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
