import Sidebar from "./Sidebar";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function Dashboard() {

  return (

    <div
      style={{
        display: "flex",
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        overflowX: "hidden",
        scrollBehavior: "smooth"
      }}
    >

      {/* SIDEBAR */}

      <Sidebar />



      {/* MAIN CONTENT */}

      <div
        style={{
          marginLeft: "270px",
          width: "calc(100% - 270px)",
          padding: "30px"
        }}
      >

        {/* DASHBOARD */}

        <section id="dashboard">

          <div
            className="mb-5"
            style={{
              background:
                "linear-gradient(135deg, #111827, #1e293b)",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow:
                "0 0 20px rgba(0,255,213,0.15)"
            }}
          >

            <h1
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                color: "#00ffd5",
                letterSpacing: "2px",
                marginBottom: "15px"
              }}
            >

              Expense Tracker

            </h1>



            <h4
              style={{
                color: "white",
                marginBottom: "10px",
                fontWeight: "600"
              }}
            >

              Welcome{" "}

              {localStorage.getItem("userName")} 👋

            </h4>



            <p
              style={{
                color: "#cbd5e1",
                fontSize: "17px",
                marginBottom: 0
              }}
            >

              Smart Expense & Budget Management Dashboard 🚀

            </p>

          </div>

        </section>



        {/* EXPENSE FORM */}

        <section id="expenses">

          <div className="mb-4">

            <ExpenseForm />

          </div>

        </section>



        {/* EXPENSE LIST */}

        <ExpenseList />

      </div>

    </div>

  );

}

export default Dashboard;