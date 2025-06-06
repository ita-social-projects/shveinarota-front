"use client";

import Link from "next/link";
import Image from "next/image";
import "$style/Header.css";
import "$style/HeaderColors.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./Context/LangContext";
import { useScrollbarWidth } from "$hooks/useScrollbarWidth";
import DonatePage from "./info/DonatePage/DonatePage";

const Header = () => {
	const pathname = usePathname();
	const location = usePathname();
	const menuIcon = useRef();
	const router = useRouter();
	const headerRef = useRef(null);
	const lastScrollTop = useRef(0);
	const { lang, changeLanguage } = useLang();
	const scrollbarWidth = useScrollbarWidth();
	const [activeLang, setActiveLang] = useState('ua');
	const [hoveredLang, setHoveredLang] = useState(null);

	useEffect(() => {
		if (pathname.startsWith('/en')) {
			setActiveLang('en');
		} else {
			setActiveLang('ua');
		}
	}, [pathname]);


	// Открытие окна
	function openPopup() {

	document.querySelector(".wrapper")?.style.setProperty("padding-right", scrollbarWidth + "px");
	document.querySelector(".header")?.style.setProperty("padding-right", scrollbarWidth + "px");

	const event = new Event("openDonatePopup");
	window.dispatchEvent(event);
	}

	const handleLanguageChange = (language) => {
		let currentPath = location;

		if (language === "ua") {
			currentPath = location.replace(/^\/en/, "") || "/";
		} else {
			currentPath = location.startsWith("/en") ? location : `/en${location}`;
		}

		changeLanguage(language);
		window.location.href = currentPath;
	};

	function openMenu(e) {
		e.stopPropagation();
		document.querySelector("._menu").classList.toggle("active");
		document.body.classList.toggle("menu-active");
		if (e.target.classList.contains("icon-menu")) {
			e.target.classList.toggle("btn-active");
		} else {
			e.target.closest(".icon-menu").classList.toggle("btn-active");
		}
	}

	const isActiveVisible = (lang) => {
		// Скрыть стиль активной кнопки, если наводим на другую
		return activeLang === lang && hoveredLang !== (lang === 'en' ? 'ua' : 'en');
	};

	function closeMenu() {
		document.querySelector("._menu").classList.remove("active");
		menuIcon.current.classList.remove("btn-active");
		document.body.classList.remove("menu-active");
	}

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;

			if (!headerRef.current) return;

			if (scrollTop > lastScrollTop.current && scrollTop > 100 && !document.body.classList.contains("menu-active")) {
				headerRef.current.classList.add("header--hidden");
			} else {
				headerRef.current.classList.remove("header--hidden");
			}

			lastScrollTop.current = scrollTop;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);



	let colorClass = '';
	if (pathname.includes('/about')) colorClass = 'header--about';
	else if (pathname.includes('/guides')) colorClass = 'header--guides';
	else colorClass = 'header--default';

	return (
		<header ref={headerRef} className={`header ${colorClass}`}>
			<div className="header__container">
				<div className="left">
					<Link className="header__link" onClick={closeMenu} href="/">
						<div className="logo_shveya">
							<Image
								src="/images/logo-rota.png"
								alt="Logo"
								width={90}
								height={60}
								className="logo_main_img"
								priority
							/>
						</div>
					</Link>
				</div>
				<div className="Menu_header_wrapper">
					<button ref={menuIcon} onClick={openMenu} className="icon-menu">
						<span></span>
					</button>
				</div>

				<div className="right _menu">
					<nav className="menu">
						<Link
							onClick={closeMenu}
							className={location == "/" || location == "/en" ? "menu__link link-active" : "menu__link"}
							href={"/"}
						>
							{lang == "ua" ? "Головна" : "Home page"}
						</Link>
						<Link
							onClick={closeMenu}
							className={location.includes("/about") ? "menu__link link-active" : "menu__link"}
							href={"/about"}
						>
							{lang == "ua" ? "Про нас" : "About us"}
						</Link>
						<Link
							onClick={closeMenu}
							className={location.includes("/questions") ? "menu__link link-active" : "menu__link"}
							href={"/questions"}
						>
							{lang == "ua" ? "Питання" : "questions"}
						</Link>
						<Link
							onClick={closeMenu}
							className={location.includes("guides") ? "menu__link link-active" : "menu__link"}
							href={"/guides"}
						>
							{lang == "ua" ? "Навчальний центр" : "Training center"}
						</Link>
						<button onClick={openPopup} className="header__support">
							<Image
								src="/images/header/donate.svg"
								alt="Logo"
								width={24}
								height={24}
								className="Support-img"
								priority
							/>
							{lang == "ua" ? "Підтримати" : "Support us"}
						</button>
					</nav>
					<div className="menulang">
						<button
							className={isActiveVisible('en') ? 'active' : ''}
							onClick={() => { handleLanguageChange('en'); closeMenu(); }}
							onMouseEnter={() => setHoveredLang('en')}
							onMouseLeave={() => setHoveredLang(null)}
						>
							EN
						</button>
						<div className="_line"></div>
						<button
							className={isActiveVisible('ua') ? 'active' : ''}
							onClick={() => { handleLanguageChange('ua'); closeMenu(); }}
							onMouseEnter={() => setHoveredLang('ua')}
							onMouseLeave={() => setHoveredLang(null)}
						>
							UA
						</button>
					</div>

				</div>
			</div>
			<DonatePage />
		</header>
	);
};

export default Header;
