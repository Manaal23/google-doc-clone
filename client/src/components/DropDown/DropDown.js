import React, { useEffect, useState } from "react";
import dropdownStyles from "./DropDown.module.css";

function DropDown({ ...props }) {
  const [selected, setSelected] = useState("viewer");
  const handleChange = (e) => {
    setSelected(e.target.value)
    props.updateData(props.idx ?? -1, e.target.value, props.name)
  }

  useEffect(() => {
    setSelected(props.selected)
  }, [props.selected])

  return (
    <select value={selected} onChange={handleChange}>
      {
        props.options.map(i => {
          return <option value={i}>{i}</option>
        })
      }
  </select>
  );
}

export default DropDown;
