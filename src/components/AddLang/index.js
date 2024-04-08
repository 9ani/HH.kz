import { useState, useEffect } from "react";

export default function AddLang({ onChange }) {
  const [education, setEducation] = useState([]);

  const educations = education.map((ed, index) => (
    <div key={index} className="education">
      <sapn onClick={() => removeEd(ed)}>X</sapn>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Уровень</label>
        <select
          className="input"
          onChange={onChangeData}
          name={index + "-level"}
          value={ed.level}
        >
          <option value={"Высшее"}>Высшее</option>
          <option value={"Не полное высшее"}>Не полное высшее</option>
        </select>
      </fieldset>

      <fieldset className={"fieldset fieldset-md"}>
        <label>Название учебного заведения</label>
        <input
          className="input"
          onChange={onChangeData}
          type="text"
          name={index + "-univercity_name"}
          value={ed.univercity_name}
        />
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Факультет</label>
        <input
          className="input"
          onChange={onChangeData}
          type="text"
          name={index + "-faculty"}
          value={ed.faculty}
        />
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Специализация</label>
        <input
          className="input"
          onChange={onChangeData}
          type="text"
          name={index + "-major"}
          value={ed.major}
        />
      </fieldset>
      <fieldset className={"fieldset fieldset-md"}>
        <label>Год оканчания</label>
        <input
          className="input"
          onChange={onChangeData}
          type="text"
          name={index + "-end_date"}
          value={ed.end_date}
        />
      </fieldset>
    </div>
  ));
  return (
    <div className="eds">
      {/* {educations} */}
      <a>Добавить язык</a>
    </div>
  );
}
