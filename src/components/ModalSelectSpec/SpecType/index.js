import { useState } from "react";
import Image from 'next/image';
import arrowRight from '@/app/images/arrow-right.svg';
export default function SpecType({ specType }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`specTypes${active?" active":""}`}
      onClick={() => setActive(!active)}
    >
      <Image alt="arrow" src={arrowRight} />
      {specType.name}
    </div>
  );
}
