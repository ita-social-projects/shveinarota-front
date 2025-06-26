import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "./Aside.css";
import "./Toggle_Button.css"
import "./Menu_Links.css";
import "./Aside_spoiler.css";
import Spoller from "./Spoiler/Spoller";
import Link from "next/link";

const Aside = ({ categories }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const urlId = pathSegments[pathSegments.length - 1];

  const [activeLink, setActiveLink] = useState(null);
  const [openCategories, setOpenCategories] = useState(new Set());
  const [isOpen, setIsOpen] = useState(true);
  const [isNonActiveHovered, setIsNonActiveHovered] = useState(false);

  // Ссылки на контейнер прокрутки и активный элемент
  const asideContentRef = useRef(null);
  const activeLinkRef = useRef(null);

  // Определяем активную ссылку по URL или по первой подкатегории
  useEffect(() => {
    let newActiveLink = null;

    if (urlId) {
      newActiveLink = urlId; // Не проверяем на число
    } else if (categories.length > 0) {
      for (const category of categories) {
        if (category.subcategories.length > 0) {
          newActiveLink = category.subcategories[0].id;
          break;
        }
      }
    }

    setActiveLink(newActiveLink);
  }, [urlId, categories]);


  // Открываем ту категорию, где находится активная подкатегория
  useEffect(() => {
    if (activeLink) {
      let newOpenCategories = new Set();
      for (const category of categories) {
        if (category.subcategories.some((sub) => sub.id == activeLink)) {
          newOpenCategories.add(category.id);
          break;
        }
      }
      setOpenCategories(newOpenCategories);
    }
  }, [activeLink, categories]);

  // Прокрутка контейнера так, чтобы активный элемент оказался по центру.
  // Задержка 300 мс позволяет дождаться завершения анимации открытия Spoller (если она есть)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeLinkRef.current && asideContentRef.current) {
        const activeRect = activeLinkRef.current.getBoundingClientRect();
        const containerRect = asideContentRef.current.getBoundingClientRect();
        const offset = activeRect.top - containerRect.top;
        const newScrollTop = offset - containerRect.height / 2 + activeRect.height / 2;
        asideContentRef.current.scrollTo({
          top: newScrollTop,
          behavior: "smooth",
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [activeLink]);

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  function closeAsideOnClick() {
    setIsOpen(false);
  }

  return (
    <aside
      className={`aside ${isOpen ? "open" : "closed"} ${isNonActiveHovered ? "nonActiveHovered" : ""
        }`}
    >
      {/* Кнопка сворачивания */}
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        <div className={`toggle-icon ${isOpen ? "rotated" : ""}`}></div>
      </button>

      {/* Контейнер с прокруткой */}
      <div className="aside-content" ref={asideContentRef}>
        <Spoller
          title={"Навч. центр"}
          isActiveCategory={true}
        >
          <Link onClick={() => {
              setActiveLink("main");
              closeAsideOnClick();
            }}
            className={`spoller__link ${activeLink === "main" ? "active" : ""}`} href="/guides/main">Головна</Link>
          <Link
            onClick={() => {
              setActiveLink("cybercomplects");
              closeAsideOnClick();
            }}
            className={`spoller__link ${activeLink === "cybercomplects" ? "active" : ""}`}
            href="/guides/cybercomplects"
          >
            Кібернабір для пошиття
          </Link>
          <Link onClick={() => closeAsideOnClick()} className="spoller__link" href="/guides/workshops">Самостійне пошиття</Link>
          <Link onClick={() => {
            setActiveLink("workshops");
            closeAsideOnClick()
          }} className={`spoller__link ${activeLink === "workshops" ? "active" : ""}`} href="/guides/workshops">Локальний воркшоп</Link>
        </Spoller>
        {/* <div className="aside__heading heading">
          <Link onClick={() => closeAsideOnClick()} href="/guides/main" className="heading__title">Головна</Link>
          <ul className="heading__body">
            <li>
              <Link
                onClick={() => {
                  setActiveLink("cybercomplects");
                  closeAsideOnClick();
                }}
                className={`spoller__link ${activeLink === "cybercomplects" ? "active" : ""}`}
                href="/guides/cybercomplects"
              >
                Кібернабір для пошиття
              </Link>
            </li>
            <li><Link onClick={() => closeAsideOnClick()} className="spoller__link" href="/guides/workshops">Самостійне пошиття</Link></li>
            <li>
              <Link onClick={() => {
                setActiveLink("workshops");
                closeAsideOnClick()
              }} className={`spoller__link ${activeLink === "workshops" ? "active" : ""}`} href="/guides/workshops">Локальний воркшоп</Link>
            </li>
          </ul>
        </div> */}
        {categories.map((category) => {
          const isActiveCategory = category.subcategories.some(
            (sub) => sub.id == activeLink
          );

          return category.subcategories.length > 0 ? (
            <Spoller
              key={category.id}
              title={category.category}
              isActiveCategory={isActiveCategory}
            >
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/guides/${sub.subcategory_en.toLowerCase()}/${sub.id}`}
                  className={`spoller__link ${activeLink == sub.id ? "active" : ""}`}
                  onClick={() => { setActiveLink(sub.id); closeAsideOnClick() }}
                  // Привязываем ref только к активной ссылке
                  ref={activeLink == sub.id ? activeLinkRef : null}
                  onMouseEnter={() => {
                    if (activeLink !== sub.id) {
                      setIsNonActiveHovered(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (activeLink !== sub.id) {
                      setIsNonActiveHovered(false);
                    }
                  }}
                >
                  {sub.subcategory}
                  {activeLink == sub.id && <span className="indicator"></span>}
                </Link>
              ))}
            </Spoller>
          ) : null;
        })}
      </div>
    </aside>
  );
};

export default Aside;
