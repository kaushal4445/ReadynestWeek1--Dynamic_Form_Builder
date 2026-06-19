import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Layout from "../components/Layout";

function Responses() {

  const [responses, setResponses] = useState([]);

  // LOAD RESPONSES

  useEffect(() => {

    const savedResponses =
      JSON.parse(localStorage.getItem("responses")) || [];

    setResponses(savedResponses);

  }, []);

  // CSV DATA

  const csvData = responses.map((response) => ({

    Form: response.formTitle,

    SubmittedAt: new Date(
      response.submittedAt
    ).toLocaleString(),

    Answers: JSON.stringify(response.answers),

  }));

  // DELETE RESPONSE

  const deleteResponse = (index) => {

    const confirmDelete =
      window.confirm("Delete this response?");

    if (!confirmDelete) return;

    const updatedResponses = [...responses];

    updatedResponses.splice(index, 1);

    setResponses(updatedResponses);

    localStorage.setItem(
      "responses",
      JSON.stringify(updatedResponses)
    );

  };

  // CLEAR ALL RESPONSES

  const clearAllResponses = () => {

    const confirmClear =
      window.confirm(
        "Delete ALL responses?"
      );

    if (!confirmClear) return;

    localStorage.removeItem("responses");

    setResponses([]);

  };

  return (
    <Layout>

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">

        <div>

          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">

            Form Responses

          </h1>

          <p className="text-slate-400 text-lg">

            View all submitted responses

          </p>

        </div>

        {/* ACTION BUTTONS */}

        <div className="flex gap-4 flex-wrap">

          {/* EXPORT CSV */}

          <CSVLink
            data={csvData}
            filename={"form-responses.csv"}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-bold transition"
          >
            Export CSV
          </CSVLink>

          {/* CLEAR ALL */}

          {responses.length > 0 && (

            <button
              onClick={clearAllResponses}
              className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold transition"
            >
              Clear All
            </button>

          )}

        </div>

      </div>

      {/* EMPTY STATE */}

      {responses.length === 0 ? (

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-14 text-center">

          <div className="text-7xl mb-5">
            📭
          </div>

          <h2 className="text-3xl font-bold mb-3">
            No Responses Yet
          </h2>

          <p className="text-slate-400">
            Responses submitted by users will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {responses.map((response, index) => (

            <div
              key={index}
              className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8 shadow-2xl hover:scale-[1.01] transition"
            >

              {/* TOP */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">

                <div>

                  <h2 className="text-3xl font-bold mb-2 text-cyan-400">

                    {response.formTitle}

                  </h2>

                  <p className="text-slate-400">

                    Submitted:
                    {" "}
                    {new Date(
                      response.submittedAt
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="flex gap-4 items-center">

                  <div className="text-5xl">
                    📄
                  </div>

                  <button
                    onClick={() =>
                      deleteResponse(index)
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

              {/* ANSWERS */}

              <div className="space-y-4">

                {Object.keys(response.answers).length === 0 ? (

                  <div className="bg-red-500/20 border border-red-500 p-4 rounded-2xl">

                    <p className="text-red-400 font-bold">
                      No answers submitted
                    </p>

                  </div>

                ) : (

                  Object.entries(response.answers).map(
                    ([fieldId, answer]) => (

                      <div
                        key={fieldId}
                        className="bg-slate-700 p-5 rounded-2xl border border-slate-600"
                      >

                        <p className="text-slate-400 mb-2 text-sm">

                          Field ID

                        </p>

                        <h3 className="text-lg font-bold text-cyan-300">

                          {fieldId}

                        </h3>

                        <div className="mt-4 bg-slate-800 p-4 rounded-xl">

                          <p className="text-white break-words">

                            {Array.isArray(answer)
                              ? answer.join(", ")
                              : answer}

                          </p>

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
</Layout>
  );
}

export default Responses;