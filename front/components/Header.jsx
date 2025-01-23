"use client";

import Link from 'next/link';
import Image from 'next/image';
import '$style/Header.css'
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useScrollbarWidth } from '$hooks/useScrollbarWidth';

const Header = () => {
	const location = usePathname();
	const menuIcon = useRef()
	const scrollbarWidth = useScrollbarWidth();

	function openMenu(e) {
		e.stopPropagation()
		document.querySelector("._menu").classList.toggle("active")
		document.body.classList.toggle("menu-active")
		if (e.target.classList.contains("icon-menu")) {
			e.target.classList.toggle("btn-active")
		} else {
			e.target.closest(".icon-menu").classList.toggle("btn-active")
		}
	}

	function closeMenu(e) {
		document.querySelector("._menu").classList.remove("active")
		menuIcon.current.classList.remove("btn-active")
		document.body.classList.remove("menu-active")
	}

	useEffect(e => {
		if (typeof window !== 'undefined') {
			document.querySelector('.header').style.paddingRight = scrollbarWidth + "px";
		}
	}, [])

	return (
		<header className="header">
			<div className="header__container">
				<div className="left">
					<Link className='header__link' onClick={closeMenu} href="/">
						<div className="logo_shveya">
							<Image
								src="/images/headerlogo.png"
								alt="Logo"
								width={60}
								height={60}
								className="logo-img"
								priority
							/>
						</div>
						Швейна рота
					</Link>
				</div>

				<button ref={menuIcon} onClick={openMenu} className="icon-menu">
					<span></span>
				</button>

				<div className="right _menu">
					<nav className="menu">
						<Link onClick={closeMenu} className={location == '/' ? 'menu__link link-active' : 'menu__link'} href="/">Головна сторінка</Link>
						<Link onClick={closeMenu} className={location == '/guides' ? 'menu__link link-active' : 'menu__link'} href="/guides">Навчальний центр</Link>
						<Link onClick={closeMenu} className={location == '/about' ? 'menu__link link-active' : 'menu__link'} href="/about">Про нас</Link>
					</nav>
					<div className="menulang">
						<button>EN</button>
						<div className="_line"></div>
						<button>UK</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;