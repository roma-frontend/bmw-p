import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import router from "./routes";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);