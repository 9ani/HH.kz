"use client";
import { getAgeFromBirthday } from "@/app/utils/format";
import { useDispatch } from "react-redux";
import Link from "next/link";
export default function Apply({ item }) {
  const dispatch = useDispatch();
  const age = getAgeFromBirthday(item.resume.birthday);
  return (
    <div className="card ">
      <link className="link" href={`/resumes/${item.resume.id}`}>{item.resume.position}</link>
      <p>
        {item.resume.first_name} {item.resume.last_name},Возраст: {age} лет
      </p>
      <h3>
        {item.resume.salary}
        {item.resume.salary_type}
      </h3>
      <div className="flex">
        <button className="button button-primary mr4">Пригласить</button>
        <button className="button button-secondary">Отказать</button>
      </div>
    </div>
  );
}
