import React from "react";
import "./FormField.css";

/**
 * FormField is a component for displaying label-input pairs
 *
 * Proptypes
 * @param {string} label The label text (e.g., "Character Name:")
 * @param {string} value The input value
 * @param {string} position The position identifier
 * @param {function} onChange Handler for input changes
 * @param {string} type The input type (default: "text")
 */
const FormField = ({ label, value, position, onChange, type = "text" }) => {
  return (
    <div className={`form-field ${position}`}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
