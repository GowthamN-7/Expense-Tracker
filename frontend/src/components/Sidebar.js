function Sidebar() {

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };



  const scrollToSection = (id) => {

    const section = document.getElementById(id);

    if (section) {

      section.scrollIntoView({

        behavior: "smooth"

      });

    }

  };



  const menuStyle = {

    padding: "18px 20px",

    borderRadius: "18px",

    cursor: "pointer",

    fontSize: "22px",

    fontWeight: "700",

    transition: "0.3s",

    marginBottom: "16px",

    background: "#0f172a",

    border: "1px solid #1e293b",

    boxShadow:
      "0 0 12px rgba(0,0,0,0.2)"

  };



  return (

    <div
      style={{
        width: "270px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617,#0f172a)",
        color: "white",
        padding: "28px 20px",
        position: "fixed",
        left: 0,
        top: 0,
        borderRight: "1px solid #1e293b",
        boxShadow:
          "0 0 25px rgba(0,255,213,0.08)"
      }}
    >

      {/* LOGO */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "60px"
        }}
      >

        <h1
          style={{
            color: "#00ffd5",
            fontWeight: "900",
            fontSize: "50px",
            marginBottom: "0px",
            letterSpacing: "1px"
          }}
        >

          Expense

        </h1>

        <h1
          style={{
            color: "white",
            fontWeight: "900",
            fontSize: "50px"
          }}
        >

          Tracker

        </h1>



        <p
          style={{
            color: "#94a3b8",
            marginTop: "12px",
            fontSize: "18px",
            lineHeight: "1.6"
          }}
        >

          Smart Finance Dashboard 🚀

        </p>

      </div>



      {/* MENU */}

      <div>

        {/* DASHBOARD */}

        <div
          style={menuStyle}
          onClick={() =>
            scrollToSection("dashboard")
          }
          onMouseEnter={(e) => {

            e.target.style.background =
              "#00ffd5";

            e.target.style.color =
              "#020617";

          }}
          onMouseLeave={(e) => {

            e.target.style.background =
              "#0f172a";

            e.target.style.color =
              "white";

          }}
        >

          🏠 Dashboard

        </div>



        {/* ANALYTICS */}

        <div
          style={menuStyle}
          onClick={() =>
            scrollToSection("analytics")
          }
          onMouseEnter={(e) => {

            e.target.style.background =
              "#00ffd5";

            e.target.style.color =
              "#020617";

          }}
          onMouseLeave={(e) => {

            e.target.style.background =
              "#0f172a";

            e.target.style.color =
              "white";

          }}
        >

          📊 Analytics

        </div>



        {/* EXPENSES */}

        <div
          style={menuStyle}
          onClick={() =>
            scrollToSection("expenses")
          }
          onMouseEnter={(e) => {

            e.target.style.background =
              "#00ffd5";

            e.target.style.color =
              "#020617";

          }}
          onMouseLeave={(e) => {

            e.target.style.background =
              "#0f172a";

            e.target.style.color =
              "white";

          }}
        >

          💸 Expenses

        </div>



        {/* REMINDER */}

        <div
          style={menuStyle}
          onClick={() =>
            scrollToSection("reminder")
          }
          onMouseEnter={(e) => {

            e.target.style.background =
              "#00ffd5";

            e.target.style.color =
              "#020617";

          }}
          onMouseLeave={(e) => {

            e.target.style.background =
              "#0f172a";

            e.target.style.color =
              "white";

          }}
        >

          🔔 Reminder

        </div>

      </div>



      {/* LOGOUT */}

      <button
        className="btn"
        onClick={logout}
        style={{
          marginTop: "45px",
          width: "100%",
          fontWeight: "800",
          fontSize: "22px",
          padding: "16px",
          borderRadius: "18px",
          border: "none",
          background:
            "linear-gradient(90deg,#ff4d6d,#ff758f)",
          color: "white",
          boxShadow:
            "0 0 18px rgba(255,77,109,0.3)"
        }}
      >

        Logout

      </button>

    </div>

  );

}

export default Sidebar;