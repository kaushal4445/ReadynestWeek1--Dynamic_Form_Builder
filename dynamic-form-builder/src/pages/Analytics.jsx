import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Layout from "../components/Layout";

function Analytics() {
  const [forms, setForms] = useState([]);

  const responses =
    JSON.parse(localStorage.getItem("responses")) || [];

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://form-builder-backend-bdv0.onrender.com/api/forms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Analytics Forms:", res.data);

      setForms(
        Array.isArray(res.data)
          ? res.data
          : res.data.forms || []
      );
    } catch (err) {
      console.error("Fetch Forms Error:", err);
    }
  };

  console.log("Forms:", forms);
  console.log("Responses:", responses);

  const analyticsData = forms.map((form) => {
    const totalResponses = responses.filter(
      (response) =>
        String(response.formId) === String(form._id)
    ).length;

    return {
      name: form.title || "Untitled",
      responses: totalResponses,
    };
  });

  console.log("Analytics:", analyticsData);

  const mostPopularForm =
    analyticsData.length > 0
      ? analyticsData.reduce((max, form) =>
          form.responses > max.responses
            ? form
            : max
        )
      : {
          name: "N/A",
          responses: 0,
        };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 text-white p-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Form performance and response analytics
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-slate-400">
              Total Forms
            </h2>

            <p className="text-5xl font-bold mt-4">
              {forms.length}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-slate-400">
              Total Responses
            </h2>

            <p className="text-5xl font-bold mt-4">
              {responses.length}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-slate-400">
              Avg Responses
            </h2>

            <p className="text-5xl font-bold mt-4">
              {forms.length === 0
                ? 0
                : (
                    responses.length /
                    forms.length
                  ).toFixed(1)}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">
            <h2 className="text-slate-400">
              Popular Form
            </h2>

            <p className="text-2xl font-bold mt-4">
              {mostPopularForm.name}
            </p>

            <p className="text-cyan-400 mt-2">
              {mostPopularForm.responses} responses
            </p>
          </div>

        </div>

        {/* CHART */}
        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-8">
            Responses Per Form
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={analyticsData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="responses"
                  fill="#06b6d4"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Analytics;