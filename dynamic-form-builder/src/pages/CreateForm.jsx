import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
function CreateForm() {
  // FORM INFO
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // FORM FIELDS
  const [fields, setFields] = useState([]);

  // ADD FIELD
  const addField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      type: "text",
      placeholder: "",
      required: false,
      options: ["Option 1"],
    };

    console.log("ADDING FIELD");

    setFields((prevFields) => {
      const updated = [...prevFields, newField];
      console.log(updated);
      return updated;
    });
  };

  // UPDATE FIELD
  const updateField = (id, key, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
  };

  // DELETE FIELD
  const deleteField = (id) => {
    const filteredFields = fields.filter((field) => field.id !== id);
    setFields(filteredFields);
  };

  // ADD OPTION
  const addOption = (id) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          options: [...field.options, "New Option"],
        };
      }
      return field;
    });
    setFields(updatedFields);
  };

  // UPDATE OPTION
  const updateOption = (fieldId, optionIndex, value) => {
    const updatedFields = fields.map((field) => {
      if (field.id === fieldId) {
        const updatedOptions = [...field.options];
        updatedOptions[optionIndex] = value;
        return {
          ...field,
          options: updatedOptions,
        };
      }
      return field;
    });
    setFields(updatedFields);
  };

  // SAVE FORM
const saveForm = async () => {
  toast.success("Form Saved Successfully!");
  try {
    if (!formTitle) {
      alert("Please enter form title");
      return;
    }

    if (fields.length === 0) {
      alert("Add at least one field");
      return;
    }

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const formData = {
      title: formTitle,
      description: formDescription,
      fields,
    };

    console.log("SENDING:", formData);

    const response = await axios.post(
      "https://form-builder-backend-bdv0.onrender.com/api/forms",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("SUCCESS:", response.data);

    alert("Form Saved Successfully!");

  } catch (error) {

    console.log("FULL ERROR:", error);

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);

      alert(error.response.data.message);
    } else {
      alert("Server Error");
    }
  }
};

  const FIELD_TYPE_ICONS = {
    text: "Aa",
    email: "@",
    number: "#",
    date: "📅",
    select: "▾",
    radio: "◉",
    checkbox: "☑",
  };

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .cf-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0a0a1a;
          padding: 1.5rem;
          border-radius: 1.5rem;
          color: #fff;
        }
        @media (min-width: 768px) {
          .cf-root { padding: 2.5rem; }
        }

        .cf-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.26;
          animation: cf-drift 14s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .cf-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #6c3de8, #3b1fa3);
          top: -180px; left: -140px;
        }
        .cf-orb-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #16a34a, #0e7490);
          bottom: -160px; right: -120px;
          animation-delay: -5s;
        }
        @keyframes cf-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px, 24px) scale(1.06); }
        }

        .cf-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .cf-content { position: relative; z-index: 10; }

        /* HEADER */
        .cf-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .cf-header { flex-direction: row; align-items: center; }
        }
        .cf-eyebrow {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
          margin: 0 0 0.5rem;
        }
        .cf-title {
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(135deg, #fff 40%, #c4b5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (min-width: 768px) {
          .cf-title { font-size: 2.8rem; }
        }

        .cf-header-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .cf-btn {
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
        .cf-btn:hover { transform: translateY(-2px); }
        .cf-btn-add {
          background: rgba(124, 58, 237, 0.14);
          color: #c4b5fd;
          border-color: rgba(124, 58, 237, 0.32);
        }
        .cf-btn-add:hover { background: rgba(124, 58, 237, 0.24); }
        .cf-btn-save {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.35);
        }
        .cf-btn-save:hover { box-shadow: 0 8px 26px rgba(34, 197, 94, 0.45); }

        /* PANELS */
        .cf-panel {
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 1.75rem;
          box-shadow: 0 24px 60px rgba(0,0,0,0.3);
        }
        .cf-info-panel { margin-bottom: 1.75rem; }

        .cf-input, .cf-textarea, .cf-select {
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
        .cf-input::placeholder, .cf-textarea::placeholder { color: rgba(255,255,255,0.28); }
        .cf-input:focus, .cf-textarea:focus, .cf-select:focus {
          border-color: rgba(124, 58, 237, 0.65);
          background: rgba(124, 58, 237, 0.07);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.16);
        }
        .cf-input + .cf-textarea { margin-top: 0.9rem; }
        .cf-textarea { resize: vertical; min-height: 80px; font-family: 'Inter', sans-serif; }
        .cf-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          padding-right: 2.6rem;
        }
        .cf-select option {
          background-color: #1a1a2e;
          color: #fff;
        }

        /* TWO COLUMN LAYOUT */
        .cf-columns {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }
        @media (min-width: 1024px) {
          .cf-columns { grid-template-columns: 1fr 1fr; }
        }

        .cf-panel-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 0 1.5rem;
          letter-spacing: -0.01em;
        }
        .cf-panel-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.5);
        }

        .cf-empty-hint {
          color: rgba(255,255,255,0.35);
          font-size: 0.92rem;
          text-align: center;
          padding: 2rem 1rem;
          border: 1px dashed rgba(255,255,255,0.12);
          border-radius: 14px;
        }

        /* FIELD CARD */
        .field-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 1.1rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .field-card:hover { border-color: rgba(167, 139, 250, 0.25); }
        .field-card:last-child { margin-bottom: 0; }

        .field-card-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .field-type-chip {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.18);
          color: #c4b5fd;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .field-card-label {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .field-row { margin-bottom: 0.75rem; }
        .field-row:last-of-type { margin-bottom: 0; }

        .cf-required-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0.9rem 0 1rem;
          padding: 0.6rem 0.8rem;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
        }
        .cf-required-row input[type="checkbox"] {
          width: 16px; height: 16px;
          accent-color: #7c3aed;
          cursor: pointer;
        }
        .cf-required-row label {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.65);
          cursor: pointer;
        }

        .cf-options-block {
          margin: 0.9rem 0 1rem;
          padding-top: 0.9rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .cf-options-title {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin: 0 0 0.75rem;
        }
        .cf-option-input { margin-bottom: 0.6rem; }

        .cf-btn-option {
          background: rgba(34, 197, 94, 0.12);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.28);
          padding: 0.5rem 0.9rem;
          border-radius: 9px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cf-btn-option:hover { background: rgba(34, 197, 94, 0.2); transform: translateY(-1px); }

        .cf-btn-delete-field {
          width: 100%;
          margin-top: 0.4rem;
          background: rgba(239, 68, 68, 0.1);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 0.6rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cf-btn-delete-field:hover { background: rgba(239, 68, 68, 0.2); transform: translateY(-1px); }

        /* PREVIEW */
        .preview-field { margin-bottom: 1.6rem; }
        .preview-field:last-child { margin-bottom: 0; }
        .preview-label {
          display: block;
          margin-bottom: 0.55rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
        }
        .preview-required { color: #f87171; margin-left: 0.25rem; }
        .preview-input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: #fff;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
        }
        .preview-input option {
          background-color: #1a1a2e;
          color: #fff;
        }
        .preview-options { display: flex; flex-direction: column; gap: 0.55rem; }
        .preview-option-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255,255,255,0.03);
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .preview-option-row label { font-size: 0.88rem; color: rgba(255,255,255,0.65); }
        .preview-option-row input[type="radio"],
        .preview-option-row input[type="checkbox"] {
          accent-color: #7c3aed;
          width: 15px; height: 15px;
        }

        .preview-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: rgba(255,255,255,0.3);
        }
        .preview-empty-icon {
          width: 56px; height: 56px;
          margin: 0 auto 1rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.25);
        }
      `}</style>

      <div className="cf-root">
        <div className="cf-orb cf-orb-1" />
        <div className="cf-orb cf-orb-2" />
        <div className="cf-grid-overlay" />

        <div className="cf-content">
          {/* HEADER */}
          <div className="cf-header">
            <div>
              <p className="cf-eyebrow">Form builder</p>
              <h1 className="cf-title">Create Form</h1>
            </div>

            <div className="cf-header-actions">
              <button className="cf-btn cf-btn-add" onClick={addField}>
                + Add Field
              </button>
              <button className="cf-btn cf-btn-save" onClick={saveForm}>
                Save Form
              </button>
            </div>
          </div>

          {/* FORM INFO */}
          <div className="cf-panel cf-info-panel">
            <input
              type="text"
              placeholder="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="cf-input"
            />
            <textarea
              placeholder="Form Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="cf-textarea"
            />
          </div>

          <div className="cf-columns">
            {/* LEFT SIDE — FIELDS */}
            <div className="cf-panel">
              <h2 className="cf-panel-title">
                Form Fields
                <span className="cf-panel-badge">{fields.length}</span>
              </h2>

              {fields.length === 0 && (
                <div className="cf-empty-hint">No fields added yet.</div>
              )}

              {fields.map((field) => (
                <div key={field.id} className="field-card">
                  {/* FIELD HEADER CHIP */}
                  <div className="field-card-header">
                    <span className="field-type-chip">
                      {FIELD_TYPE_ICONS[field.type] || "?"}
                    </span>
                    <span className="field-card-label">{field.type} field</span>
                  </div>

                  {/* FIELD LABEL */}
                  <div className="field-row">
                    <input
                      type="text"
                      placeholder="e.g. Full Name"
                      value={field.label}
                      onChange={(e) => updateField(field.id, "label", e.target.value)}
                      className="cf-input"
                    />
                  </div>

                  {/* PLACEHOLDER */}
                  <div className="field-row">
                    <input
                      type="text"
                      placeholder="e.g. Type your answer here"
                      value={field.placeholder}
                      onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
                      className="cf-input"
                    />
                  </div>

                  {/* FIELD TYPE */}
                  <div className="field-row">
                    <select
                      value={field.type}
                      onChange={(e) => updateField(field.id, "type", e.target.value)}
                      className="cf-select"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                      <option value="select">Dropdown</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>

                  {/* REQUIRED */}
                  <div className="cf-required-row">
                    <input
                      type="checkbox"
                      id={`req-${field.id}`}
                      checked={field.required}
                      onChange={(e) => updateField(field.id, "required", e.target.checked)}
                    />
                    <label htmlFor={`req-${field.id}`}>Required field</label>
                  </div>

                  {/* OPTIONS */}
                  {(field.type === "select" ||
                    field.type === "radio" ||
                    field.type === "checkbox") && (
                    <div className="cf-options-block">
                      <h3 className="cf-options-title">Options</h3>

                      {field.options.map((option, index) => (
                        <div key={index} className="cf-option-input">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(field.id, index, e.target.value)}
                            className="cf-input"
                          />
                        </div>
                      ))}

                      <button className="cf-btn-option" onClick={() => addOption(field.id)}>
                        + Add Option
                      </button>
                    </div>
                  )}

                  {/* DELETE */}
                  <button
                    className="cf-btn-delete-field"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete Field
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE — PREVIEW */}
            <div className="cf-panel">
              <h2 className="cf-panel-title">Live Preview</h2>

              {fields.length === 0 ? (
                <div className="preview-empty">
                  <div className="preview-empty-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h20M2 12h20M2 21h20" />
                    </svg>
                  </div>
                  Your form preview will appear here.
                </div>
              ) : (
                fields.map((field) => (
                  <div key={field.id} className="preview-field">
                    <label className="preview-label">
                      {field.label || "Untitled question"}
                      {field.required && <span className="preview-required">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select className="preview-input">
                        {field.options.map((option, index) => (
                          <option key={index}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === "radio" ? (
                      <div className="preview-options">
                        {field.options.map((option, index) => (
                          <div key={index} className="preview-option-row">
                            <input type="radio" name={`preview-${field.id}`} />
                            <label>{option}</label>
                          </div>
                        ))}
                      </div>
                    ) : field.type === "checkbox" ? (
                      <div className="preview-options">
                        {field.options.map((option, index) => (
                          <div key={index} className="preview-option-row">
                            <input type="checkbox" />
                            <label>{option}</label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="preview-input"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateForm;