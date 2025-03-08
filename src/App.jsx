import React from "react";
import AllRoutes from "./routes/AllRoutes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <AllRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
