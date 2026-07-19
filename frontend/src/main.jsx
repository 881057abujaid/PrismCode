import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import App from "./App";
import Toast from "./components/ui/Toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false}>
        {(t) => <Toast toast={t} />}
      </Toaster>
      <App />
    </AuthProvider>
  </StrictMode>
);