import MyVacancy from "./myvacancy";
import { useSelector } from "react-redux";
export default function MyVacancies({ resumes }) {
    const vacancies = useSelector((state)=> state.vacancy.vacancies)
  const showVacancies = Array.isArray(resumes)
    ? vacancies.map((item) => (
        <MyVacancy item={item}
          key={item.id}
        />
      ))
    : null;

  return <div>{showVacancies}</div>;
}
