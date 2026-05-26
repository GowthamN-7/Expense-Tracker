import { useState } from "react";

function Login() {

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);



  const handleSubmit = async () => {

    const url = isRegister

      ? "http://localhost:5000/register"

      : "http://localhost:5000/login";



    const response = await fetch(url, {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        name,

        email,

        password

      })

    });



    const data = await response.json();



    /* REGISTER */

    if (isRegister) {

      alert(data.message || data);

      setIsRegister(false);

      return;

    }



    /* LOGIN */

    if (data.message === "Login Success") {

      localStorage.setItem(

        "userName",

        data.userName

      );



      localStorage.setItem(

        "userEmail",

        data.userEmail

      );



      alert("Login Successful");



      window.location.href = "/dashboard";

    } else {

      alert(data.message || data);

    }

  };



  return (

    <div
      className="container mt-5"
      style={{
        maxWidth: "800px"
      }}
    >

      <div
        className="card p-4 shadow"
        style={{
          background: "#111827",
          border: "none",
          borderRadius: "15px",
          color: "white"
        }}
      >

        <h3
          style={{
            marginBottom: "25px",
            color: "#00ffd5"
          }}
        >

          {isRegister ? "Register" : "Login"}

        </h3>



        {/* NAME */}

        {isRegister && (

          <input

            type="text"

            placeholder="Name"

            className="form-control mb-3"

            value={name}

            onChange={(e) =>

              setName(e.target.value)

            }

            style={{
              background: "#1f2937",
              border: "1px solid #374151",
              color: "white"
            }}

          />

        )}



        {/* EMAIL */}

        <input

          type="email"

          placeholder="Email"

          className="form-control mb-3"

          value={email}

          onChange={(e) =>

            setEmail(e.target.value)

          }

          style={{
            background: "#1f2937",
            border: "1px solid #374151",
            color: "white"
          }}

        />



        {/* PASSWORD */}

        <input

          type={showPassword ? "text" : "password"}

          placeholder="Password"

          className="form-control mb-2"

          value={password}

          onChange={(e) =>

            setPassword(e.target.value)

          }

          style={{
            background: "#1f2937",
            border: "1px solid #374151",
            color: "white"
          }}

        />



        {/* SHOW PASSWORD */}

        <div
          className="mb-3"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <input

            type="checkbox"

            id="showPassword"

            checked={showPassword}

            onChange={() =>

              setShowPassword(!showPassword)

            }

            style={{

              width: "18px",

              height: "18px",

              cursor: "pointer",

              accentColor: "#00ffd5"

            }}

          />



          <label

            htmlFor="showPassword"

            style={{

              cursor: "pointer",

              color: "#cbd5e1",

              fontSize: "15px"

            }}

          >

            Show Password

          </label>

        </div>



        {/* BUTTON */}

        <button

          className="btn btn-primary"

          onClick={handleSubmit}

          style={{
            background: "#00c9a7",
            border: "none",
            fontWeight: "bold"
          }}

        >

          {isRegister ? "Register" : "Login"}

        </button>



        {/* TOGGLE */}

        <p

          className="mt-3"

          style={{

            cursor: "pointer",

            color: "#cbd5e1"

          }}

          onClick={() =>

            setIsRegister(!isRegister)

          }

        >

          {isRegister

            ? "Already have account? Login"

            : "Don't have account? Register"}

        </p>

      </div>

    </div>

  );

}

export default Login;