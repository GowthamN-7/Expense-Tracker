import { useState } from "react";

function Reminder() {

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");

  const [reminders, setReminders] = useState([]);

  const addReminder = () => {

    if (!title || !date) {

      return;

    }

    const newReminder = {

      title,

      date

    };

    setReminders([

      ...reminders,

      newReminder

    ]);

    setTitle("");

    setDate("");

  };

  return (

    <div
      className="card border-0 shadow-lg p-4"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#111827)",
        borderRadius: "24px",
        color: "white",
        boxShadow:
          "0 0 25px rgba(0,255,213,0.08)"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: "25px"
        }}
      >

        <h2
          style={{
            color: "#00ffd5",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >

          🔔 Smart Reminders

        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0
          }}
        >

          Manage bill payments, EMI dates,
          subscriptions and important alerts 😌

        </p>

      </div>



      {/* INPUTS */}

      <div className="row">

        <div className="col-md-6 mb-3">

          <label
            style={{
              marginBottom: "8px",
              color: "#cbd5e1"
            }}
          >

            Reminder Title

          </label>

          <input

            type="text"

            placeholder="Example: Electricity Bill"

            className="form-control"

            value={title}

            onChange={(e) =>

              setTitle(e.target.value)

            }

            style={{
              background: "#1f2937",
              border: "1px solid #374151",
              color: "white",
              padding: "14px",
              borderRadius: "14px"
            }}

          />

        </div>



        <div className="col-md-6 mb-3">

          <label
            style={{
              marginBottom: "8px",
              color: "#cbd5e1"
            }}
          >

            Due Date

          </label>

          <input

            type="date"

            className="form-control"

            value={date}

            onChange={(e) =>

              setDate(e.target.value)

            }

            style={{
              background: "#1f2937",
              border: "1px solid #374151",
              color: "white",
              padding: "14px",
              borderRadius: "14px"
            }}

          />

        </div>

      </div>



      {/* BUTTON */}

      <button

        className="btn mt-2"

        onClick={addReminder}

        style={{
          background:
            "linear-gradient(90deg,#00ffd5,#00c9a7)",
          border: "none",
          padding: "14px",
          fontWeight: "bold",
          fontSize: "16px",
          color: "#020617",
          borderRadius: "14px"
        }}

      >

        + Add Smart Reminder

      </button>



      {/* REMINDER LIST */}

      <div className="mt-4">

        {reminders.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              padding: "30px",
              background: "#111827",
              borderRadius: "18px",
              color: "#94a3b8"
            }}
          >

            No reminders added yet 😌

          </div>

        ) : (

          reminders.map(

            (reminder, index) => (

              <div

                key={index}

                className="mb-3"

                style={{
                  background:
                    "linear-gradient(135deg,#111827,#1e293b)",
                  borderRadius: "18px",
                  padding: "20px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  borderLeft:
                    "5px solid #00ffd5"
                }}

              >

                <div>

                  <h5
                    style={{
                      marginBottom: "8px",
                      color: "white"
                    }}
                  >

                    🔔 {reminder.title}

                  </h5>

                  <p
                    style={{
                      margin: 0,
                      color: "#94a3b8"
                    }}
                  >

                    Due Date:
                    {" "}
                    {reminder.date}

                  </p>

                </div>



                <div
                  style={{
                    background: "#00ffd5",
                    color: "#020617",
                    padding:
                      "8px 14px",
                    borderRadius: "12px",
                    fontWeight: "bold"
                  }}
                >

                  Active

                </div>

              </div>

            )

          )

        )}

      </div>

    </div>

  );

}

export default Reminder;