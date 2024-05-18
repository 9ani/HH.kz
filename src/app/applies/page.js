"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getEmployeeApplies } from "@/app/store/slices/applySlice";
import { useEffect } from "react";
export default function Applies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeApplies());
  }, []);
  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb7">
          <h1>Отклики и приглашения</h1>
          <Link
            className="button button-secondary-bordered"
            href="/create-vacancy"
          >
            Создать вакансию
          </Link>
        </div>
      </div>
    </main>
  );
}
