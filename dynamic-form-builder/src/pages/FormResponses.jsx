import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Layout from "../components/Layout";

function FormResponses() {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem("responses")) || [];

    const filteredResponses = savedResponses.filter(
      (response) => String(response.formId) === String(id)
    );

    setResponses(filteredResponses);
  }, [id]);

  // EXPORT CSV
  const exportCSV = () => {
    if (responses.length === 0) {
      alert("No responses to export!");
      return;
    }

    const csvData = responses.map((response) => ({
      Form: response.formTitle,
      SubmittedAt: new Date(response.submittedAt).toLocaleString(),
      ...response.answers,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "responses.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // EXPORT PDF
  const exportPDF = () => {
    if (responses.length === 0) {
      alert("No responses to export!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Form Responses", 14, 20);

    const rows = [];

    responses.forEach((response) => {
      Object.entries(response.answers || {}).forEach(([key, value]) => {
        rows.push([
          response.formTitle,
          key,
          Array.isArray(value) ? value.join(", ") : value,
        ]);
      });
    });

    autoTable(doc, {
      head: [["Form", "Field", "Answer"]],
      body: rows,
      startY: 30,
    });

    doc.save("responses.pdf");
  };

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .fr-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0a0a1a;
          padding: 1.5rem;
          border-radius: 1.5rem;
          color: #fff;
        }
        @media (min-width: 768px) { .fr-root { padding: 2.5rem; } }

        .fr-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.26;
          animation: fr-drift 14s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .fr-orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, #6c3de8, #3b1fa3); top: -180px; left: -140px; }
        .fr-orb-2 { width: 420px; height: 420px; background: radial-gradient(circle, #06b6d4, #0e7490); bottom: -160px; right: -120px; animation-delay: -5s; }
        @keyframes fr-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px, 24px) scale(1.06); }
        }

        .fr-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .fr-content { position: relative; z-index: 10; }

        /* HEADER */
        .fr-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          justify-content: space-between;
          margin-bottom: 2.25rem;
        }
        @media (min-width: 768px) { .fr-header { flex-direction: row; align-items: center; } }

        .fr-eyebrow {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
          margin: 0 0 0.5rem;
        }
        .fr-title {
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(135deg, #fff 40%, #c4b5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (min-width: 768px) { .fr-title { font-size: 2.8rem; } }

        .fr-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .fr-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }
        .fr-btn:hover { transform: translateY(-2px); }
        .fr-btn-csv {
          background: rgba(34, 197, 94, 0.14);
          color: #86efac;
          border-color: rgba(34, 197, 94, 0.3);
        }
        .fr-btn-csv:hover { background: rgba(34, 197, 94, 0.24); }
        .fr-btn-pdf {
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          color: #fff;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
        }
        .fr-btn-pdf:hover { box-shadow: 0 8px 26px rgba(124, 58, 237, 0.45); }

        /* SUMMARY STRIP */
        .fr-summary {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.75rem;
          color: rgba(255,255,255,0.4);
          font-size: 0.9rem;
        }
        .fr-summary .count {
          color: #fff;
          font-weight: 700;
        }

        /* EMPTY STATE */
        .fr-empty {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 4rem 1.5rem;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0,0,0,0.3);
        }
        .fr-empty-icon {
          width: 64px; height: 64px;
          margin: 0 auto 1.5rem;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.18));
          display: flex; align-items: center; justify-content: center;
          color: #a5f3fc;
        }
        .fr-empty h2 { font-size: 1.6rem; font-weight: 700; margin: 0 0 0.6rem; }
        .fr-empty p { color: rgba(255,255,255,0.4); margin: 0; font-size: 0.95rem; }

        /* RESPONSE CARD */
        .fr-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .fr-card {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 1.75rem;
          transition: border-color 0.25s, transform 0.2s;
        }
        .fr-card:hover { border-color: rgba(167, 139, 250, 0.3); }

        .fr-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.4rem;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .fr-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0 0 0.4rem;
        }
        .fr-card-index {
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #67e8f9;
          margin: 0 0 0.4rem;
        }
        .fr-card-time {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.83rem;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
          padding: 0.4rem 0.8rem;
          border-radius: 9px;
        }

        .fr-no-answers {
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.88rem;
          margin: 0;
        }

        .fr-answers {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.9rem;
        }
        @media (min-width: 768px) {
          .fr-answers { grid-template-columns: repeat(2, 1fr); }
        }
        .fr-answer {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 13px;
          padding: 1rem 1.1rem;
        }
        .fr-answer-key {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin: 0 0 0.5rem;
        }
        .fr-answer-value {
          font-size: 0.95rem;
          color: #c4b5fd;
          margin: 0;
          word-break: break-word;
        }
      `}</style>

      <div className="fr-root">
        <div className="fr-orb fr-orb-1" />
        <div className="fr-orb fr-orb-2" />
        <div className="fr-grid-overlay" />

        <div className="fr-content">
          {/* HEADER */}
          <div className="fr-header">
            <div>
              <p className="fr-eyebrow">Response data</p>
              <h1 className="fr-title">Form Responses</h1>
            </div>

            <div className="fr-actions">
              <button onClick={exportCSV} className="fr-btn fr-btn-csv">
                Export CSV
              </button>
              <button onClick={exportPDF} className="fr-btn fr-btn-pdf">
                Download PDF
              </button>
            </div>
          </div>

          {responses.length > 0 && (
            <p className="fr-summary">
              <span className="count">{responses.length}</span>{" "}
              {responses.length === 1 ? "response" : "responses"} submitted
            </p>
          )}

          {responses.length === 0 ? (
            <div className="fr-empty">
              <div className="fr-empty-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2>No responses yet</h2>
              <p>Once people submit this form, their answers will show up here.</p>
            </div>
          ) : (
            <div className="fr-list">
              {responses.map((response, index) => (
                <div key={index} className="fr-card">
                  <div className="fr-card-header">
                    <div>
                      <p className="fr-card-index">Response #{index + 1}</p>
                      <h2 className="fr-card-title">{response.formTitle}</h2>
                    </div>
                    <span className="fr-card-time">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {new Date(response.submittedAt).toLocaleString()}
                    </span>
                  </div>

                  {/* ANSWERS */}
                  {Object.keys(response.answers || {}).length === 0 ? (
                    <p className="fr-no-answers">No answers found</p>
                  ) : (
                    <div className="fr-answers">
                      {Object.entries(response.answers).map(([key, value]) => (
                        <div key={key} className="fr-answer">
                          <p className="fr-answer-key">Field ID: {key}</p>
                          <p className="fr-answer-value">
                            {Array.isArray(value) ? value.join(", ") : value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FormResponses;