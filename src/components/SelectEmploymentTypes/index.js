import { useState } from "react";

export default function SelectEmploymentTypes({
  employmentTypes,
  label,
  size,
}) {
  const [eTypes, setETypes] = useState([]);

  const onSelect = (e) => {
    const tps = [...eTypes];
    if (e.target.checked && !tps.includes(e.target.value * 1)) {
      setETypes([...tps, e.target.value * 1]);
    } else if (!e.target.checked && tps.includes(e.target.value)) {
      const index = tps.indexOf(e.target.value * 1);
      tps.splice(index, 1);
      setETypes(tps);
    }
  };
  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <div>
        {employmentTypes.map((type, index) => (
          <div key={index} className="checkbox">
            <input
              type="checkbox"
              name="employmentTypes"
              value={type.id}
              id={type.id + "-type"}
              onChange={onSelect}
            />
            <label for="">{type.name}</label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
