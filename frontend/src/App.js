import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";

import {

  ToastContainer

} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  const user = localStorage.getItem("userEmail");

  return (

    <div
      style={{
        background: "#020617",
        minHeight: "100vh"
      }}
    >

      {user ? (

        <Dashboard />

      ) : (

        <Login />

      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

    </div>

  );

}

export default App;