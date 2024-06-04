"use client";
import { getAgeFromBirthday } from "@/app/utils/format";
import { useDispatch } from "react-redux";
export default function Apply({ item }) {
  const dispatch = useDispatch();
  const age = getAgeFromBirthday(item.resume.birthday)
  return (
    <div className="row flex">
      <link href={/resumes/}>{item.resume.position}</link>
      <p>{item.resume.first_name} {item.resume.last_name},Возраст: {age} лет</p>
        <h3>{item.resume.salary}{item.resume.salary_type}</h3>

        <button className="button button-primary">Пригласить</button>
        <button className="button button-secondary">Отказать</button>

    </div>
  );
}
