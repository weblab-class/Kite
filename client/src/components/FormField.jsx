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
 */
const FormField = ({ label, value, position, onChange }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
