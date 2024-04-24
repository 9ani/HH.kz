import { useState } from "react";

export default function SpecType({ specType }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`specTypes ${active?"active":""}`}
      onClick={() => setActive(!active)}
    >
      <img src="/images/arrow-right.svg" />
      {specType.name}
    </div>
  );
}
