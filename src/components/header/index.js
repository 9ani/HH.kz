"use client";

import Link from "next/link";
import logo from "../../app/images/logo.svg";
import searchIcon from "../../app/images/search.svg";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <Link href="/">
              <Image src={logo} />
            </Link>
            <Link href="/resumes">Мои резюме</Link>
            <a>Помощь</a>
          </div>
          <div>
            <button className="header-search">
              <Image src={searchIcon} />
              Поиск
            </button>
            <Link
              className="header-button header-button--green"
              href="/create-resume"
            >
              Создать резюме
            </Link>
            <Link className="header-button" href="/login">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
