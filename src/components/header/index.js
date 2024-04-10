"use client";
import {useSelector, useDispatch} from 'react-redux'
import Link from "next/link";
import logo from "../../app/images/logo.svg";
import searchIcon from "../../app/images/search.svg";
import Image from "next/image";
import { logOut } from '@/app/store/slices/authSlice';

export default function Header() {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <Link href="/">
              <Image src={logo} alt="icon"/>
            </Link>
            <Link href="/resumes">Мои резюме</Link>
            <a>Помощь</a>
          </div>
          <div>
            <button className="header-search">
              <Image src={searchIcon}  alt="icon"/>
              Поиск
            </button>
            <Link
              className="header-button header-button--green"
              href="/create-resume"
            >
              Создать резюме
            </Link>
            {!isAuth && <Link className="header-button" href="/login">
              Войти
            </Link>}
            {isAuth && <a className="header-button" onClick={()=>dispatch(logOut())}>
              Выйти
            </a>}
          </div>
        </div>
      </div>
    </header>
  );
}
