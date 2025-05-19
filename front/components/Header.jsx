"use client";

import Link from "next/link";
import Image from "next/image";
import "$style/Header.css";
import "$style/HeaderColors.css"; 
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLang } from "./Context/LangContext";
import { useScrollbarWidth } from "$hooks/useScrollbarWidth";

const Header = () => {
	const location = usePathname();
	const menuIcon = useRef();
	const router = useRouter();
	const headerRef = useRef(null);
	const lastScrollTop = useRef(0);
	const { lang, changeLanguage } = useLang();
	const scrollbarWidth = useScrollbarWidth();
	

	// Открытие окна
	function openPopup() {
		console.log("Попап відкривається");
		document.body.classList.add("popup-active");
		document.querySelector(".wrapper").style.paddingRight = scrollbarWidth + "px";
		document.querySelector(".header").style.paddingRight = scrollbarWidth + "px";
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

	const pathname = usePathname();

	let colorClass = '';
	if (pathname.startsWith('/about')) colorClass = 'header--about';
	else if (pathname.startsWith('/guides')) colorClass = 'header--guides';
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
							{lang == "ua" ? "Головна сторінка" : "Home page"}
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
						<button onClick={() => { handleLanguageChange("en"); closeMenu(); }}>EN</button>
						<div className="_line"></div>
						<button onClick={() => { handleLanguageChange("ua"); closeMenu(); }}>UA</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
