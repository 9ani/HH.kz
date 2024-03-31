'use client'

import logo from '../../app/images/logo.svg'
import searchIcon from '../../app/images/search.svg'
import Image from 'next/image'

export default function Header(){
    return(
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div>
                        <Image src={logo} />
                        <a>Работодателям</a>
                        <a>Помощь</a>
                        
                    </div>
                    <div>
                        <button className="header-search">
                            <Image src={searchIcon} />
                            Поиск
                        </button>
                        <button className="header-button header-button--green">
                            Создать резюме
                        </button>
                        <button className="header-button">
                            Войти
                        </button>
                    </div>

                </div>
            </div>
        </header>
    )
}