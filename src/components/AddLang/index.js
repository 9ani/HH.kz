import { useState, useEffect } from "react";

export default function AddLang({ onChange, foreignLanguages }) {

  const remove=(index)=>{
    const langs = [...foreignLanguages]
    langs.splice(index, 1)
    onChange(langs)
  }
  const onSelect=(e)=>{
    const [index, key]=e.target.name.split("-")
    const langs = [...foreignLanguages]
    langs[index][key]=e.target.value
    onChange(langs)
  }

  const lns = foreignLanguages.map((ln, index) => (
    <div key={index} className="lns fieldset-md selectDate selectdate-noday">
      <span className="remove" onClick={()=>remove(index)}>X</span>
      <select placeholder="Язык" className="input" name={index + "-name"} value={foreignLanguages[index].name} onChange={onSelect}>
        <option value="Казахский">Казахский</option>
        <option value="Английский">Английский</option>
        <option value="Русский">Русский</option>
      </select>

      <select placeholder="Уровень" className="input"  name={index + "-level"} value={foreignLanguages[index].level}  onChange={onSelect}>
        <option value="A1">А1 - Начальный</option>
        <option value="A2">A2 - Элементарный</option>
        <option value="B1">B1 - Средний</option>
        <option value="B2">B2 - Средне-продвинутый</option>
        <option value="C1">C1 - Продвинутый</option>
        <option value="C2">C2 - в совершенстве</option>
      
      </select>
    </div>
  ));
  return (
    <div className="eds">
      {lns}
      <a
        onClick={() =>
          onChange([...foreignLanguages, { name: "", level: "" }])
        }
      >
        Добавить язык
      </a>
    </div>
  );
}
