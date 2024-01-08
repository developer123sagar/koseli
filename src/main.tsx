import App from "./App";
import ReactDOM from "react-dom/client";
import store from "@/redux/store";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
