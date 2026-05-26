import {

  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend

} from "recharts";

function ExpenseLineChart({ expenses }) {

  const chartData = expenses.map(

    (expense, index) => ({

      name: expense.title,

      amount: Number(expense.amount),

      category: expense.category

    })

  );



  const highestExpense = Math.max(

    ...expenses.map((e) =>

      Number(e.amount)

    ),

    0

  );



  const totalCategories = new Set(

    expenses.map((e) => e.category)

  ).size;



  return (

    <div
      className="card p-4 shadow-lg border-0 mt-4"
      style={{
        background:
          "linear-gradient(135deg, #0f172a, #111827)",
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
            marginBottom: "8px"
          }}
        >

          Expense Analytics

        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
            fontSize: "15px"
          }}
        >

          Analyze your spending trends with smart insights 📈

        </p>

      </div>



      {/* PREMIUM GRAPH */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#111827,#1e293b)",
          borderRadius: "20px",
          padding: "20px"
        }}
      >

        <ResponsiveContainer
          width="100%"
          height={420}
        >

          <AreaChart data={chartData}>

            <defs>

              <linearGradient
                id="expenseColor"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#00ffd5"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#00ffd5"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>



            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />



            <XAxis
              dataKey="name"
              stroke="#cbd5e1"
              tick={{
                fill: "#cbd5e1",
                fontSize: 13
              }}
            />



            <YAxis
              stroke="#cbd5e1"
              tick={{
                fill: "#cbd5e1",
                fontSize: 13
              }}
            />



            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "none",
                borderRadius: "12px",
                color: "white"
              }}
            />



            <Legend />



            <Area
              type="monotone"
              dataKey="amount"
              stroke="#00ffd5"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#expenseColor)"
              dot={{
                r: 6,
                fill: "#00ffd5",
                strokeWidth: 2,
                stroke: "#0f172a"
              }}
              activeDot={{
                r: 8
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>



      {/* EXTRA INSIGHTS */}

      <div className="row mt-4">

        <div className="col-md-4 mb-3">

          <div
            style={{
              background:
                "linear-gradient(135deg,#111827,#1e293b)",
              padding: "22px",
              borderRadius: "18px",
              textAlign: "center"
            }}
          >

            <h6
              style={{
                color: "#94a3b8",
                marginBottom: "10px"
              }}
            >

              Total Expenses

            </h6>

            <h2
              style={{
                color: "#00ffd5",
                fontWeight: "bold"
              }}
            >

              {expenses.length}

            </h2>

          </div>

        </div>



        <div className="col-md-4 mb-3">

          <div
            style={{
              background:
                "linear-gradient(135deg,#111827,#1e293b)",
              padding: "22px",
              borderRadius: "18px",
              textAlign: "center"
            }}
          >

            <h6
              style={{
                color: "#94a3b8",
                marginBottom: "10px"
              }}
            >

              Highest Spending

            </h6>

            <h2
              style={{
                color: "#38bdf8",
                fontWeight: "bold"
              }}
            >

              ₹ {highestExpense}

            </h2>

          </div>

        </div>



        <div className="col-md-4 mb-3">

          <div
            style={{
              background:
                "linear-gradient(135deg,#111827,#1e293b)",
              padding: "22px",
              borderRadius: "18px",
              textAlign: "center"
            }}
          >

            <h6
              style={{
                color: "#94a3b8",
                marginBottom: "10px"
              }}
            >

              Categories Used

            </h6>

            <h2
              style={{
                color: "#f472b6",
                fontWeight: "bold"
              }}
            >

              {totalCategories}

            </h2>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ExpenseLineChart;