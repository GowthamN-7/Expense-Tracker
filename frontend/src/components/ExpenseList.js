import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import ExpenseLineChart from "./ExpenseLineChart";
import Reminder from "./Reminder";
import ExpenseChart from "./ExpenseChart";

import {
  useEffect,
  useState,
  useCallback
} from "react";

function ExpenseList() {

  const [expenses, setExpenses] = useState([]);

  const [income, setIncome] = useState(0);

  const [budgetLimit, setBudgetLimit] = useState("");

  const userEmail = localStorage.getItem("userEmail");



  /* FETCH */

  const fetchExpenses = useCallback(() => {

    fetch(
      `http://localhost:5000/get-expenses?userEmail=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => setExpenses(data));

  }, [userEmail]);



  useEffect(() => {

    fetchExpenses();

    fetch(
      `http://localhost:5000/get-income?email=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => setIncome(data));

  }, [fetchExpenses, userEmail]);



  /* DELETE */

  const deleteExpense = async (id) => {

    await fetch(
      `http://localhost:5000/delete-expense/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchExpenses();

  };



  /* EDIT */

  const editExpense = async (expense) => {

    const newTitle = prompt(
      "Enter New Title",
      expense.title
    );

    if (!newTitle) return;



    const newAmount = prompt(
      "Enter New Amount",
      expense.amount
    );

    if (!newAmount) return;



    const newCategory = prompt(
      "Enter New Category",
      expense.category
    );

    if (!newCategory) return;



    await fetch(

      `http://localhost:5000/update-expense/${expense._id}`,

      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          title: newTitle,

          amount: newAmount,

          category: newCategory

        })

      }

    );



    fetchExpenses();

  };



  /* EXPENSES */

  const filteredExpenses = expenses;



  /* CALCULATIONS */

  const totalExpense = expenses.reduce(

    (total, item) =>

      total + Number(item.amount),

    0

  );



  const balance = income - totalExpense;



  const transactionCount = expenses.length;



  const remainingBudget =

    Number(budgetLimit || 0) - totalExpense;



  /* CATEGORY */

  const categoryTotals = {};



  expenses.forEach((expense) => {

    if (categoryTotals[expense.category]) {

      categoryTotals[expense.category] +=
        Number(expense.amount);

    } else {

      categoryTotals[expense.category] =
        Number(expense.amount);

    }

  });



  const topCategory =

    Object.keys(categoryTotals).length

      ? Object.keys(categoryTotals).reduce(

          (a, b) =>

            categoryTotals[a] >
            categoryTotals[b]

              ? a

              : b

        )

      : "None";



  /* PDF */

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Expense Tracker Report",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Total Income: Rs. ${income}`,
      20,
      45
    );

    doc.text(
      `Total Expense: Rs. ${totalExpense}`,
      20,
      58
    );

    doc.text(
      `Balance: Rs. ${balance}`,
      20,
      71
    );

    autoTable(doc, {

      startY: 90,

      head: [["Title", "Amount", "Category"]],

      body: expenses.map((expense) => [

        expense.title,

        `Rs. ${expense.amount}`,

        expense.category

      ])

    });

    doc.save("Expense_Report.pdf");

  };



  /* INSIGHT */

  let financialInsight = "";



  if (totalExpense > income * 0.8) {

    financialInsight =
      "⚠ Your expenses are high compared to your income.";

  } else if (balance > income * 0.5) {

    financialInsight =
      "✅ Excellent savings habit.";

  } else {

    financialInsight =
      "💡 Track your expenses regularly.";

  }



  return (

    <div className="container-fluid">



      {/* SETTINGS */}

      <section id="settings">

        <div className="row">



          {/* INCOME */}

          <div className="col-md-6 mb-4">

            <div
              className="card p-5 border-0"
              style={{
                background:
                  "linear-gradient(135deg,#111827,#1e293b)",
                borderRadius: "30px",
                boxShadow:
                  "0 0 30px rgba(0,255,213,0.08)"
              }}
            >

              <h2
                style={{
                  color: "#00ffd5",
                  marginBottom: "24px",
                  fontWeight: "800"
                }}
              >

                Set Income

              </h2>

              <input
                type="number"
                placeholder="Enter Monthly Income"
                className="form-control"
                value={income}
                onChange={async (e) => {

                  setIncome(e.target.value);

                  await fetch(
                    "http://localhost:5000/update-income",
                    {

                      method: "PUT",

                      headers: {
                        "Content-Type":
                          "application/json"
                      },

                      body: JSON.stringify({

                        email: userEmail,

                        income: e.target.value

                      })

                    }
                  );

                }}
                style={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "22px",
                  borderRadius: "18px",
                  fontSize: "22px",
                  minHeight: "72px"
                }}
              />

            </div>

          </div>



          {/* BUDGET */}

          <div className="col-md-6 mb-4">

            <div
              className="card p-5 border-0"
              style={{
                background:
                  "linear-gradient(135deg,#111827,#1e293b)",
                borderRadius: "30px",
                boxShadow:
                  "0 0 30px rgba(56,189,248,0.08)"
              }}
            >

              <h2
                style={{
                  color: "#38bdf8",
                  marginBottom: "24px",
                  fontWeight: "800"
                }}
              >

                Set Budget Limit

              </h2>

              <input
                type="number"
                placeholder="Enter Budget Limit"
                className="form-control"
                value={budgetLimit}
                onChange={(e) =>
                  setBudgetLimit(e.target.value)
                }
                style={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "22px",
                  borderRadius: "18px",
                  fontSize: "22px",
                  minHeight: "72px"
                }}
              />

            </div>

          </div>

        </div>

      </section>



      {/* ANALYTICS */}

      <section id="analytics">

        <div className="row mb-4">

          <div className="col-md-4 mb-4">

            <div
              className="card p-5 border-0"
              style={{
                background:
                  "linear-gradient(135deg,#0f172a,#1e293b)",
                borderRadius: "28px"
              }}
            >

              <h5
                style={{
                  color: "#94a3b8",
                  marginBottom: "18px"
                }}
              >

                Total Transactions

              </h5>

              <h1
                style={{
                  color: "#00ffd5",
                  fontWeight: "900",
                  fontSize: "60px"
                }}
              >

                {transactionCount}

              </h1>

            </div>

          </div>



          <div className="col-md-4 mb-4">

            <div
              className="card p-5 border-0"
              style={{
                background:
                  "linear-gradient(135deg,#0f172a,#1e293b)",
                borderRadius: "28px"
              }}
            >

              <h5
                style={{
                  color: "#94a3b8",
                  marginBottom: "18px"
                }}
              >

                Remaining Budget

              </h5>

              <h1
                style={{
                  color: "#38bdf8",
                  fontWeight: "900",
                  fontSize: "48px"
                }}
              >

                ₹ {remainingBudget}

              </h1>

            </div>

          </div>



          <div className="col-md-4 mb-4">

            <div
              className="card p-5 border-0"
              style={{
                background:
                  "linear-gradient(135deg,#0f172a,#1e293b)",
                borderRadius: "28px"
              }}
            >

              <h5
                style={{
                  color: "#94a3b8",
                  marginBottom: "18px"
                }}
              >

                Top Spending

              </h5>

              <h1
                style={{
                  color: "#f472b6",
                  fontWeight: "900",
                  fontSize: "42px"
                }}
              >

                {topCategory}

              </h1>

            </div>

          </div>

        </div>



        <ExpenseChart expenses={expenses} />



        <div className="mt-4">

          <ExpenseLineChart expenses={expenses} />

        </div>

      </section>



      {/* REPORT */}

      <section id="reports">

        <button
          className="btn mt-4 mb-4"
          onClick={downloadPDF}
          style={{
            background:
              "linear-gradient(90deg,#00ffd5,#00c9a7)",
            border: "none",
            padding: "18px 28px",
            fontWeight: "800",
            color: "#020617",
            borderRadius: "18px",
            fontSize: "20px"
          }}
        >

          Download Report PDF

        </button>

      </section>



      {/* INSIGHT */}

      <div
        className="alert border-0 p-4"
        style={{
          background:
            "linear-gradient(135deg,#172554,#1e3a8a)",
          color: "white",
          borderRadius: "20px",
          fontSize: "20px",
          fontWeight: "600"
        }}
      >

        {financialInsight}

      </div>



      {/* WARNING */}

      {budgetLimit > 0 &&
        totalExpense > Number(budgetLimit) && (

        <div
          className="alert alert-danger p-4"
          style={{
            fontSize: "20px",
            borderRadius: "20px"
          }}
        >

          ⚠ Budget Limit Exceeded!

        </div>

      )}



      {/* EXPENSE TABLE */}

      <section id="expenses">

        <div
          className="card p-5 border-0"
          style={{
            background:
              "linear-gradient(135deg,#111827,#1e293b)",
            borderRadius: "30px",
            boxShadow:
              "0 0 30px rgba(0,255,213,0.08)"
          }}
        >

          <div
            style={{
              marginBottom: "35px"
            }}
          >

            <h1
              style={{
                color: "#00ffd5",
                fontWeight: "900",
                marginBottom: "14px",
                fontSize: "56px"
              }}
            >

              Expense History

            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "22px",
                margin: 0,
                lineHeight: "1.7"
              }}
            >

              View and manage all your expenses professionally 💸

            </p>

          </div>



          <div className="table-responsive">

            <table
              className="table table-dark align-middle"
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 16px"
              }}
            >

              <thead>

                <tr>

                  <th
                    style={{
                      color: "#00ffd5",
                      fontSize: "22px",
                      border: "none"
                    }}
                  >

                    Expense

                  </th>

                  <th
                    style={{
                      color: "#00ffd5",
                      fontSize: "22px",
                      border: "none"
                    }}
                  >

                    Amount

                  </th>

                  <th
                    style={{
                      color: "#00ffd5",
                      fontSize: "22px",
                      border: "none"
                    }}
                  >

                    Category

                  </th>

                  <th
                    style={{
                      color: "#00ffd5",
                      fontSize: "22px",
                      border: "none"
                    }}
                  >

                    Actions

                  </th>

                </tr>

              </thead>



              <tbody>

                {filteredExpenses.map((expense) => (

                  <tr
                    key={expense._id}
                    style={{
                      background:
                        "linear-gradient(135deg,#0f172a,#111827)"
                    }}
                  >

                    <td
                      style={{
                        padding: "24px",
                        borderTopLeftRadius:
                          "20px",
                        borderBottomLeftRadius:
                          "20px",
                        border: "none",
                        fontSize: "21px",
                        fontWeight: "700"
                      }}
                    >

                      {expense.title}

                    </td>



                    <td
                      style={{
                        border: "none",
                        fontSize: "21px",
                        fontWeight: "800",
                        color: "#38bdf8"
                      }}
                    >

                      ₹ {expense.amount}

                    </td>



                    <td
                      style={{
                        border: "none"
                      }}
                    >

                      <span
                        style={{
                          background:
                            "linear-gradient(90deg,#00ffd5,#00c9a7)",
                          color: "#020617",
                          padding:
                            "12px 18px",
                          borderRadius:
                            "30px",
                          fontWeight: "700",
                          fontSize: "16px",
                          display: "inline-block"
                        }}
                      >

                        {expense.category}

                      </span>

                    </td>



                    <td
                      style={{
                        borderTopRightRadius:
                          "20px",
                        borderBottomRightRadius:
                          "20px",
                        border: "none"
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          gap: "12px"
                        }}
                      >

                        {/* EDIT */}

                        <button
                          className="btn"
                          onClick={() =>
                            editExpense(expense)
                          }
                          style={{
                            background:
                              "linear-gradient(90deg,#38bdf8,#0ea5e9)",
                            border: "none",
                            padding:
                              "12px 22px",
                            borderRadius:
                              "16px",
                            fontWeight: "700",
                            color: "white",
                            fontSize: "17px"
                          }}
                        >

                          Edit

                        </button>



                        {/* DELETE */}

                        <button
                          className="btn"
                          onClick={() =>
                            deleteExpense(
                              expense._id
                            )
                          }
                          style={{
                            background:
                              "linear-gradient(90deg,#ff4d6d,#ff758f)",
                            border: "none",
                            padding:
                              "12px 22px",
                            borderRadius:
                              "16px",
                            fontWeight: "700",
                            color: "white",
                            fontSize: "17px"
                          }}
                        >

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>



      {/* REMINDER */}

      <section id="reminder">

        <div className="mt-4">

          <Reminder />

        </div>

      </section>

    </div>

  );

}

export default ExpenseList;