"use client";
import { useState, useEffect } from "react";
import Input from "../input";
export default function AutoCompliteTags({
  label,
  placeholder,
  type,
  size,
  items,
  onSelect,
}) {
  const [value, setValue] = useState([{ name: "" }]);

  const [filteredItems, setFilteredItems] = useState([]);

  const onClick = (item) => {
    // onSelect(item);
    setValue([...value, item]);
  };
  const reset = () => {
    setValue([]);
    onSelect(null);
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      setFilteredItems([]);
    } else {
      setFilteredItems([
        ...items.filter((item) => item.name.includes(e.target.value)),
      ]);
    }
  };

  useEffect(() => {
    let fi = [];
    filteredItems.map((item) => {
      let exist = false
      value.map((tag) => {
        if (tag.name === item.name) {
          exist = true
        }
      });
      if(!exist){
        fi.push(item)
      }
    });
    setFilteredItems(fi)
  }, [value]);

  return (
    <div className="fieldset-lg">
      <div className="tags">
        {value.length > 0 &&
          value.map((tag) => (
            <div className="tag">
              <span>{tag.name} </span>
              <i onClick={reset}>X</i>
            </div>
          ))}
      </div>

      <Input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        label={label}
        size={size}
      />

      {items.length > 0 && (
        <div className="dropdown dropdown-tags">
          <h4>Рекомендуемые навыки</h4>
          {filteredItems.map((item) => (
            <a onClick={() => onClick(item)}>{item.name}</a>
          ))}
        </div>
      )}
    </div>
  );
}
