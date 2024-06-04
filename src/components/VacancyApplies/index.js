import Apply from "./apply.js";

export default function Applies(applies) {


  

  
  const showApplies = applies.map((item) => (
    <Apply item={item} key={item.id} />
  ));

  return (
    <div >
      {showApplies}
    </div>
  );
}













