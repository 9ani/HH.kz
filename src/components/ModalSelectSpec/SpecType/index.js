import { useEffect, useState } from "react";
import Image from "next/image";
import arrowRight from "@/app/images/arrow-right.svg";
import Spec from "./Spec";
export default function SpecType({ specType, onChange , value}) {
  const [active, setActive] = useState(false);
  useEffect(()=>{
    specType.specializations.map(spec => spec.id === value ? setActive(true) : null)
  },[])
  return (
    <div>
    <div
      className={`specTypes${active ? " active" : ""}`}
      onClick={() => setActive(!active)}
    >
      <Image alt="arrow" src={arrowRight} />
      {specType.name}
      </div>
      {active && specType.specializations.map((spec) => <Spec spec={spec} onChange={onChange}/>)}
    </div>
  );
}
