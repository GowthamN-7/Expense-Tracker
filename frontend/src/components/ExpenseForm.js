import { useState } from "react";

import { toast } from "react-toastify";

function ExpenseForm() {

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");



  const addExpense = async () => {

    if (!title || !amount || !category) {

      toast.error("Please fill all fields");

      return;

    }



    await fetch(

      "http://localhost:5000/add-expense",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          userEmail:

            localStorage.getItem("userEmail"),

          title,

          amount,

          category

        })

      }

    );



    toast.success(

      "Expense Added Successfully"

    );



    setTitle("");

    setAmount("");

    setCategory("");



    setTimeout(() => {

      window.location.reload();

    }, 1000);

  };



  const inputStyle = {

    background: "#1f2937",

    border: "1px solid #374151",

    color: "white",

    padding: "20px",

    borderRadius: "18px",

    fontSize: "20px",

    fontWeight: "500",

    minHeight: "68px"

  };



  const labelStyle = {

    marginBottom: "12px",

    color: "#e2e8f0",

    fontSize: "24px",

    fontWeight: "600",

    display: "block"

  };



  return (

    <div
      className="card p-5 shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #111827, #1e293b)",
        border: "none",
        borderRadius: "28px",
        color: "white",
        boxShadow:
          "0 0 30px rgba(0,255,213,0.08)"
      }}
    >

      {/* HEADING */}

      <div
        style={{
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            color: "#00ffd5",
            fontWeight: "800",
            fontSize: "56px",
            marginBottom: "14px",
            letterSpacing: "1px"
          }}
        >

          Add Expense

        </h1>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "1.7"
          }}
        >

          Track your daily spending smartly 🚀

        </p>

      </div>



      {/* EXPENSE NAME */}

      <div className="mb-4">

        <label style={labelStyle}>

          Expense Name

        </label>

        <input

          type="text"

          placeholder="Enter Expense Name"

          className="form-control"

          value={title}

          onChange={(e) =>

            setTitle(e.target.value)

          }

          style={inputStyle}

        />

      </div>



      {/* AMOUNT */}

      <div className="mb-4">

        <label style={labelStyle}>

          Amount

        </label>

        <input

          type="number"

          placeholder="Enter Amount"

          className="form-control"

          value={amount}

          onChange={(e) =>

            setAmount(e.target.value)

          }

          style={inputStyle}

        />

      </div>



      {/* CATEGORY */}

      <div className="mb-5">

        <label style={labelStyle}>

          Category

        </label>

        <select

          className="form-control"

          value={category}

          onChange={(e) =>

            setCategory(e.target.value)

          }

          style={inputStyle}

        >

          <option value="">

            Select Category

          </option>

          <option value="Food">

            🍔 Food

          </option>

          <option value="Travel">

            ✈ Travel

          </option>

          <option value="Shopping">

            🛒 Shopping

          </option>

          <option value="Study">

            📚 Study

          </option>

          <option value="Bills">

            💡 Bills

          </option>

          <option value="Entertainment">

            🎬 Entertainment

          </option>

          <option value="Health">

            🏥 Health

          </option>

          <option value="Recharge">

            📱 Recharge

          </option>

          <option value="Rent">

            🏠 Rent

          </option>

          <option value="Fuel">

            ⛽ Fuel

          </option>

          <option value="Groceries">

            🥦 Groceries

          </option>

          <option value="Investment">

            📈 Investment

          </option>

          <option value="EMI">

            💳 EMI

          </option>

          <option value="Insurance">

            🛡 Insurance

          </option>

          <option value="Subscription">

            📺 Subscription

          </option>

          <option value="Gym">

            🏋 Gym

          </option>

          <option value="Medical">

            💊 Medical

          </option>

          <option value="Pet Care">

            🐶 Pet Care

          </option>

          <option value="Gifts">

            🎁 Gifts

          </option>

          <option value="Clothing">

            👕 Clothing

          </option>

          <option value="Electronics">

            💻 Electronics

          </option>

          <option value="Taxi">

            🚕 Taxi

          </option>

          <option value="Vacation">

            🌴 Vacation

          </option>

          <option value="Utilities">

            🔌 Utilities

          </option>

          <option value="Charity">

            ❤️ Charity

          </option>

          <option value="Other">

            📦 Other

          </option>

        </select>

      </div>



      {/* BUTTON */}

      <button

        className="btn"

        onClick={addExpense}

        style={{
          background:
            "linear-gradient(90deg,#00ffd5,#00c9a7)",
          border: "none",
          padding: "18px",
          fontWeight: "700",
          fontSize: "22px",
          color: "#020617",
          borderRadius: "18px",
          minHeight: "72px",
          letterSpacing: "0.5px",
          transition: "0.3s"
        }}

      >

        + Add Expense

      </button>

    </div>

  );

}

export default ExpenseForm;