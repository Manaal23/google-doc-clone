import React, { useState } from "react";
import dropdownStyles from "./DropDown.module.css";

function DropDown({ ...props }) {

  const handleChange = (e) => {
    props.setSelected(e.target.value)
  }
  return (
    <select value={props.selected} onChange={handleChange}>
      {
        props.options.map(i => {
          return <option value={i}>{i}</option>
        })
      }
  </select>
  );
}

export default DropDown;
