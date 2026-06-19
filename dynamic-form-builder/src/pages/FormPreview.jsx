import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FormPreview() {
  const [form, setForm] = useState(null);
  const { id } = useParams();
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // GET FORMS
 useEffect(() => {
  fetchForm();
}, [id]);

const fetchForm = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://form-builder-backend-bdv0.onrender.com/api/forms/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm(res.data);
  } catch (err) {
    console.error(err);
  }
};

  // FIND FORM
 

  const sharedStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

      .fp-root {
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
        background: #0a0a1a;
        padding: 1.5rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @media (min-width: 768px) { .fp-root { padding: 3rem 1.5rem; } }

      .fp-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: 0.26;
        animation: fp-drift 14s ease-in-out infinite alternate;
        pointer-events: none;
      }
      .fp-orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, #6c3de8, #3b1fa3); top: -180px; left: -140px; }
      .fp-orb-2 { width: 420px; height: 420px; background: radial-gradient(circle, #06b6d4, #0e7490); bottom: -160px; right: -120px; animation-delay: -5s; }
      @keyframes fp-drift {
        0%   { transform: translate(0,0) scale(1); }
        100% { transform: translate(30px, 24px) scale(1.06); }
      }

      .fp-grid-overlay {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
      }

      .fp-card {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 660px;
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 26px;
        padding: 2.5rem;
        box-shadow: 0 30px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
      }
      @media (min-width: 768px) { .fp-card { padding: 3rem; } }

      .fp-not-found {
        position: relative; z-index: 10;
        text-align: center;
        max-width: 420px;
        padding: 1rem;
      }
      .fp-not-found-icon {
        width: 64px; height: 64px;
        margin: 0 auto 1.5rem;
        border-radius: 18px;
        background: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.25);
        display: flex; align-items: center; justify-content: center;
        color: #fca5a5;
      }
      .fp-not-found h2 { font-size: 1.6rem; font-weight: 700; margin: 0 0 0.6rem; }
      .fp-not-found p { color: rgba(255,255,255,0.4); margin: 0; font-size: 0.95rem; }

      .fp-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.74rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #67e8f9;
        margin: 0 0 0.9rem;
      }
      .fp-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: #67e8f9; box-shadow: 0 0 6px #67e8f9; }

      .fp-title {
        font-size: 2.1rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin: 0 0 0.75rem;
        background: linear-gradient(135deg, #fff 40%, #c4b5fd 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      @media (min-width: 768px) { .fp-title { font-size: 2.4rem; } }

      .fp-desc {
        color: rgba(255,255,255,0.45);
        font-size: 1rem;
        line-height: 1.6;
        margin: 0 0 2.25rem;
        padding-bottom: 1.75rem;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }

      .fp-field { margin-bottom: 1.75rem; }
      .fp-field:last-of-type { margin-bottom: 2.25rem; }

      .fp-label {
        display: block;
        margin-bottom: 0.6rem;
        font-size: 0.95rem;
        font-weight: 600;
        color: rgba(255,255,255,0.85);
      }
      .fp-required { color: #f87171; margin-left: 0.25rem; }

      .fp-input, .fp-select {
        width: 100%;
        box-sizing: border-box;
        padding: 0.8rem 1rem;
        border-radius: 12px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: #fff;
        font-size: 0.95rem;
        font-family: 'Inter', sans-serif;
        outline: none;
        transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
      }
      .fp-input::placeholder { color: rgba(255,255,255,0.25); }
      .fp-input:focus, .fp-select:focus {
        border-color: rgba(124, 58, 237, 0.65);
        background: rgba(124, 58, 237, 0.07);
        box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.16);
      }
      .fp-select {
        appearance: none;
        -webkit-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.9rem center;
        padding-right: 2.6rem;
      }
      .fp-select option {
        background-color: #1a1a2e;
        color: #fff;
      }

      .fp-options { display: flex; flex-direction: column; gap: 0.6rem; }
      .fp-option-row {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.65rem 0.9rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 11px;
        transition: border-color 0.15s, background 0.15s;
        cursor: pointer;
      }
      .fp-option-row:hover { border-color: rgba(167, 139, 250, 0.3); background: rgba(255,255,255,0.05); }
      .fp-option-row input[type="radio"],
      .fp-option-row input[type="checkbox"] {
        width: 16px; height: 16px;
        accent-color: #7c3aed;
        cursor: pointer;
        flex-shrink: 0;
      }
      .fp-option-row label { font-size: 0.92rem; color: rgba(255,255,255,0.75); cursor: pointer; }

      .fp-submit-btn {
        width: 100%;
        padding: 0.95rem;
        border: none;
        border-radius: 13px;
        background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.01em;
        cursor: pointer;
        transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
        box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4);
      }
      .fp-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5); }
      .fp-submit-btn:active { transform: translateY(0); }

      .fp-footer-note {
        text-align: center;
        font-size: 0.78rem;
        color: rgba(255,255,255,0.25);
        margin-top: 1.25rem;
      }

      /* SUCCESS STATE */
      .fp-success { text-align: center; padding: 2rem 0.5rem; }
      .fp-success-icon {
        width: 72px; height: 72px;
        margin: 0 auto 1.5rem;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(34,197,94,0.18), rgba(6,182,212,0.18));
        border: 1px solid rgba(34, 197, 94, 0.3);
        display: flex; align-items: center; justify-content: center;
        color: #86efac;
      }
      .fp-success h2 { font-size: 1.7rem; font-weight: 700; margin: 0 0 0.6rem; }
      .fp-success p { color: rgba(255,255,255,0.45); margin: 0; font-size: 0.95rem; }
    `}</style>
  );

  // FORM NOT FOUND
  if (!form) {
    return (
      <div className="fp-root">
        {sharedStyles}
        <div className="fp-orb fp-orb-1" />
        <div className="fp-orb fp-orb-2" />
        <div className="fp-grid-overlay" />
        <div className="fp-not-found">
          <div className="fp-not-found-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2>Form not found</h2>
          <p>This form may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  // HANDLE INPUT CHANGE
  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // SUBMIT FORM
  const submitForm = () => {
    console.log("RESPONSES:", responses);
    console.log(form);

    const formResponse = {
  formId: form._id,
  formTitle: form.title,
  answers: responses,
  submittedAt: new Date().toISOString(),
};

    // GET OLD RESPONSES
    const existingResponses = JSON.parse(localStorage.getItem("responses")) || [];

    // PUSH NEW RESPONSE
    existingResponses.push(formResponse);

    // SAVE
    localStorage.setItem("responses", JSON.stringify(existingResponses));

    console.log(formResponse);
    setSubmitted(true);
  };

  return (
    <div className="fp-root">
      {sharedStyles}
      <div className="fp-orb fp-orb-1" />
      <div className="fp-orb fp-orb-2" />
      <div className="fp-grid-overlay" />

      <div className="fp-card">
        {submitted ? (
          <div className="fp-success">
            <div className="fp-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Response submitted</h2>
            <p>Thanks for filling out "{form.title}".</p>
          </div>
        ) : (
          <>
            <p className="fp-eyebrow"><span className="dot" /> Form</p>

            {/* TITLE */}
            <h1 className="fp-title">{form.title}</h1>

            {/* DESCRIPTION */}
            {form.description && <p className="fp-desc">{form.description}</p>}

            {/* FIELDS */}
            {form.fields.map((field) => (
              <div key={field._id} className="fp-field">
                <label className="fp-label">
                  {field.label}
                  {field.required && <span className="fp-required">*</span>}
                </label>

                {/* TEXT INPUT */}
                {field.type !== "select" &&
                  field.type !== "radio" &&
                  field.type !== "checkbox" && (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="fp-input"
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  )}

                {/* SELECT */}
                {field.type === "select" && (
                  <select
                    className="fp-select"
                    onChange={(e) => handleChange(field._id, e.target.value)}
                  >
                    <option value="">Select</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {/* RADIO */}
                {field.type === "radio" && (
                  <div className="fp-options">
                    {field.options.map((option, index) => (
                      <label key={index} className="fp-option-row">
                        <input
                          type="radio"
                          name={field._id}
                          value={option}
                          onChange={(e) => handleChange(field._id, e.target.value)}
                        />
                        <label>{option}</label>
                      </label>
                    ))}
                  </div>
                )}

                {/* CHECKBOX */}
                {field.type === "checkbox" && (
                  <div className="fp-options">
                    {field.options.map((option, index) => (
                      <label key={index} className="fp-option-row">
                        <input
                          type="checkbox"
                          value={option}
                          onChange={(e) => {
                            const current = responses[field._id] || [];
                            if (e.target.checked) {
                              handleChange(field._id, [...current, option]);
                            } else {
                              handleChange(
                                field._id,
                                current.filter((item) => item !== option)
                              );
                            }
                          }}
                        />
                        <label>{option}</label>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* SUBMIT */}
            <button onClick={submitForm} className="fp-submit-btn">
              Submit Form
            </button>

            <p className="fp-footer-note">Your response is saved securely on this device.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default FormPreview;