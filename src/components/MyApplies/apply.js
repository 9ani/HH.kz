"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { deleteVacancy } from "@/app/store/slices/vacancySlice";
export default function MyApply({ item }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <div className="row flex">
      <div className="col">{item.status}</div>
      <div className="col">
        {item.vacancy.name}
        <div className="Link mt2">Удалить</div>
      </div>
      <div className="col">{item.updatedAt}</div>
    </div>
  );
}
