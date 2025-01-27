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
 * @param {string} min The minimum value for the input
 * @param {string} max The maximum value for the input
 * @param {string} placeholder The placeholder text for the input
 * @param {boolean} disabled Whether the input is disabled
 */
const FormField = ({ label, value, position, onChange, type = "text", min, max, placeholder, disabled }) => {
  return (
    <div className={`form-field ${position}`}>
      <label className={`form-label ${position}-label`}>{label}</label>
      <input
        type={type}
        className={`form-input ${position}`}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;
