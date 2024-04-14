import React from "react";
import { Provider } from "react-redux";
import store from "./services/store";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { FakeAuth } from "./components/fake-auth";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FakeAuth>
        <Provider store={store}>
          <App />
        </Provider>
      </FakeAuth>
    </BrowserRouter>
  </React.StrictMode>
);
