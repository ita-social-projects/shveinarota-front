"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./DonatePage.css";
import Image from "next/image";
import { useLang } from "$component/Context/LangContext";
import { getDataNoLang } from "api";
import { useScrollbarWidth } from "$hooks/useScrollbarWidth";

const convertToId = (urlOrId) => {
  if (!urlOrId.includes("http")) return urlOrId;
  const match = urlOrId.match(/[-\w]{25,}/);
  return match ? match[0] : "";
};

const usePayments = (lang, triggerFetch) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!triggerFetch) return;
    getDataNoLang('payment', data => {
      console.log("Fetched payment data:", data);
      if (Array.isArray(data)) setPayments(data);
    });
  }, [lang, triggerFetch]);

  return payments;
};

const DonatePage = () => {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const isDragging = useRef(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const payments = usePayments(lang, shouldFetch);

  const closePopup = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      document.querySelector(".wrapper").style.paddingRight = 0 + "px";
      document.querySelector(".header").style.paddingRight = 0 + "px";
    }, 470);
  }, []);

  const handleCopy = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const handleOverlayMouseDown = () => {
    isDragging.current = false;
  };
  const handleOverlayMouseMove = () => {
    isDragging.current = true;
  };
  const handleOverlayClick = () => {
    if (!isDragging.current) closePopup();
  };

  useEffect(() => {
    const openHandler = () => {
      document.querySelector(".wrapper")?.classList.add("compensate-scrollbar");
      const header = document.querySelector("header.header");
      if (header && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        header.classList.add("header--default", "header--force-show");
        header.classList.remove("header--hidden");
      }
      setIsOpen(true);
      setShouldFetch(true);
      setTimeout(() => setIsVisible(true), 10);
    };
    window.addEventListener("openDonatePopup", openHandler);
    return () => window.removeEventListener("openDonatePopup", openHandler);
  }, []);

  useEffect(() => {
    const header = document.querySelector("header.header");
    if (!header) return;
    if (isOpen && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      header.classList.add("header--default", "header--force-show");
      header.classList.remove("header--hidden");
    }
    return () => {
      if (header && !isOpen) header.classList.remove("header--force-show");
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const paymentCards = useMemo(() => {
    if (!payments.length) return null;
    return payments.map((payment) => {
      const rawId = convertToId(payment.path);
      const imgSrc = `https://drive.google.com/uc?export=view&id=${rawId}`;
      return (
        <div key={payment.id} className="donate-card">
          <a
            href={payment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="donate-logo"
            title={lang === "ua" ? "Підтримати" : "Support"}
          >
            <div className="donate-logo__inner">
              {payment.path && (
                <Image
                  src={imgSrc}
                  alt={payment.text}
                  fill
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
          </a>
          <div className="donate-info">
            <div className="donate-text">{payment.text}</div>
            <div className="donate-buttons">
              <button
                onClick={() => handleCopy(payment.text, payment.id)}
                className={copiedId === payment.id ? "copied" : ""}
              >
                {copiedId === payment.id
                  ? lang === "ua" ? "Скопійовано" : "Copied"
                  : lang === "ua" ? "Копіювати" : "Copy"}
              </button>
              <a href={payment.url} target="_blank" rel="noopener noreferrer">
                <button>{lang === "ua" ? "Підтримати" : "Support"}</button>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }, [payments, copiedId, handleCopy, lang]);

  if (!isOpen) return null;

  return (
    <div
      className={`donate-overlay ${isVisible ? "show" : ""}`}
      onMouseDown={handleOverlayMouseDown}
      onMouseMove={handleOverlayMouseMove}
      onClick={handleOverlayClick}
    >
      <div
        className={`donate-modal ${isVisible ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="donate-left">
          <Image src="/images/logo-rota.png" width={500} height={500} alt="Logo" />
        </div>
        <div className="donate-right">
          <div className="donate-header-inline">
            <h2>{lang === "ua" ? "Способи підтримки" : "Ways to support"}</h2>
            <button className="donate-close-button" onClick={closePopup}>×</button>
          </div>
          <div className="wrapper_donate_line">
            <div className="donate__line" />
          </div>
          <div className="donate-cards-scrollable">
            <div className="donate-cards">
              {paymentCards || (
                <div className="donate-empty">
                  {lang === "ua"
                    ? "Наразі способи підтримки відсутні"
                    : "Currently no support options available"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;