import { useState } from "react";
import Image from 'next/image';
import arrowRight from '@/app/images/arrow-right.svg';
export default function Spec({ spec , onChange}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`spec`}
     
    >
        <input type="radio" name="spec" value={spec.id} id={`${spec.id}`} onChange={onChange}/>
        <label htmlFor={`${spec.id}`}>{spec.name}</label>
      
    </div>
  );
}
