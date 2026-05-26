import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer

} from "recharts";

function ExpenseChart({ expenses }) {

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

  const data = Object.keys(categoryTotals).map(

    (category) => ({

      name: category,

      value: categoryTotals[category]

    })

  );

  const COLORS = [

    "#00ffd5",
    "#38bdf8",
    "#818cf8",
    "#f472b6",
    "#fb7185",
    "#facc15",
    "#4ade80",
    "#f97316"

  ];

  return (

    <div
      className="card p-4 shadow mt-4"
      style={{
        background: "#111827",
        border: "none",
        borderRadius: "15px"
      }}
    >

      <h3
        style={{
          color: "white",
          marginBottom: "20px",
          fontWeight: "bold"
        }}
      >

        Expense Analysis

      </h3>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={140}
            paddingAngle={3}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>



      {/* ANALYSIS */}

      <div className="row mt-4">

        {data.map((item, index) => (

          <div
            className="col-md-3 mb-3"
            key={index}
          >

            <div
              style={{
                background: "#1f2937",
                padding: "15px",
                borderRadius: "12px",
                textAlign: "center"
              }}
            >

              <h5
                style={{
                  color:
                    COLORS[
                      index % COLORS.length
                    ]
                }}
              >

                {item.name}

              </h5>

              <h4 style={{ color: "white" }}>

                Rs. {item.value}

              </h4>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default ExpenseChart;