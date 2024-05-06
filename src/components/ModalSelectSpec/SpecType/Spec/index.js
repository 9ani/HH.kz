import { useState } from "react";
import Image from 'next/image';
import arrowRight from '@/app/images/arrow-right.svg';
export default function Spec({ spec , onChange, value}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`spec`}
     
    >
        { value === spec.id && <input type="radio" name="spec" value={spec.id} data-name={spec.name} id={`${spec.id}`} onChange={onChange} checked/>}
        { value !== spec.id && <input type="radio" name="spec" value={spec.id} data-name={spec.name} id={`${spec.id}`} onChange={onChange} />}

        <label htmlFor={`${spec.id}`}>{spec.name}</label>
      
    </div>
  );
}
