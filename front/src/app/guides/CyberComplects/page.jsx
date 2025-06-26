// app/guides/cybercomplect/page.jsx
'use client';


import React from 'react';
import "src/app/guides/CyberComplects/styles.css";
import { useLang } from "$component/Context/LangContext";

const CyberComplectPage = () => {
  const { lang } = useLang();

  const t = {
    title: {
      ua: "КІБЕР НАБІР",
      en: "CYBER KIT",
    },
    howToJoin: {
      ua: "ЯК ДОЄДНАТИСЯ?",
      en: "HOW TO JOIN?",
    },
    howToJoinText: {
      ua: (
        <>
          Навіть якщо ви не маєте змоги приєднатися до спільної майстерні — ви можете шити вдома або у власному просторі.<br />
          Інформацію про пошиття конкретних виробів ви знайдете у Навчальному центрі.<br />
          Підтримку, поради та спільноту однодумців можна знайти у наших каналах:<br />
          Telegram: <a href="https://t.me/shveina_rota" target="_blank" rel="noopener noreferrer">@shveyna_rota</a><br />
          Instagram: <a href="https://www.instagram.com/shveina_rota" target="_blank" rel="noopener noreferrer">@shveyna_rota</a>
        </>
      ),
      en: (
        <>
          Even if you can't join a shared workshop — you can sew at home or in your own space.<br />
          You’ll find instructions in our Training Center.<br />
          Support and community can be found in our channels:<br />
          Telegram: <a href="https://t.me/shveina_rota" target="_blank" rel="noopener noreferrer">@shveyna_rota</a><br />
          Instagram: <a href="https://www.instagram.com/shveina_rota" target="_blank" rel="noopener noreferrer">@shveyna_rota</a>
        </>
      ),
    },
    chooseTitle: {
      ua: "ОБЕРІТЬ ЩО ШИТИ",
      en: "CHOOSE WHAT TO SEW",
    },
    chooseList: {
      ua: ["Балаклави", "Наплічники", "Сумки", "Розгрузки", "Інші корисні речі для військових"],
      en: ["Balaclavas", "Backpacks", "Bags", "Vests", "Other useful items for soldiers"]
    },
    materialsTitle: {
      ua: "ОТРИМАЙТЕ МАТЕРІАЛИ",
      en: "GET MATERIALS",
    },
    materialsList: {
      ua: [
        "Замовити через ініціативу — ми можемо надіслати необхідні тканини та фурнітуру.",
        "Придбати самостійно — якщо маєте можливість."
      ],
      en: [
        "Order through the initiative — we can send you the necessary fabrics and accessories.",
        "Buy them yourself — if you have the means."
      ]
    },
    sewTitle: {
      ua: "ПОШИЙТЕ",
      en: "SEW",
    },
    sewText: {
      ua: "Дотримуйтеся якісного пошиву — важлива не кількість, а надійність речей.",
      en: "Maintain quality — durability matters more than quantity.",
    },
    deliverTitle: {
      ua: "ПЕРЕДАЙТЕ ГОТОВІ РЕЧІ",
      en: "DELIVER FINISHED ITEMS",
    },
    deliverList: {
      ua: [
        "Передати через нас — ми маємо зв’язки з підрозділами і волонтерами.",
        "Або самостійно — якщо маєте перевірені волонтерські канали."
      ],
      en: [
        "Deliver through us — we have contacts with military units and volunteers.",
        "Or on your own — if you have reliable channels."
      ]
    },
  };

  return (
    <main className="page-content">
      <h1 className="title">{t.title[lang]}</h1>

      <section className="section">
        <div className="section-with-image fixed-left-image">
          <img
            src="/images/guides/CyberComplects/CyberComplects1.png"
            width={250}
            height={250}
            className="section-image"
            alt="Кібернабір"
          />
          <div className="section-text">
            <h2 className="section-title center-title">{t.howToJoin[lang]}</h2>
            <p className="pext">{t.howToJoinText[lang]}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title left-title">{t.chooseTitle[lang]}</h2>
        <p className="pext">{lang === 'ua' ? 'Найбільш затребувані речі:' : 'Most requested items:'}</p>
        <ul className="dots">
          {t.chooseList[lang].map((item, index) => (
            <li key={index} className="li">{item}</li>
          ))}
        </ul>
        <p className="pext">{lang === 'ua' ? 'Можна обрати щось із цього списку або запропонувати власні ідеї.' : 'You can pick something from this list or suggest your own ideas.'}</p>
      </section>

      <section className="section">
        <h2 className="section-title right-title">{t.materialsTitle[lang]}</h2>
        <p className="pext">{lang === 'ua' ? 'Є два варіанти:' : 'Two options:'}</p>
        <ul className="dots">
          {t.materialsList[lang].map((item, index) => (
            <li key={index} className="li">{item}</li>
          ))}
        </ul>
        <p className="pext">{lang === 'ua'
          ? 'Уточнюйте тип тканин, які підходять — важливо, щоб речі були витривалими та зручними у використанні.'
          : 'Clarify which fabric types are suitable — durability and comfort are important.'}</p>
      </section>

      <section className="section">
        <h2 className="section-title left-title">{t.sewTitle[lang]}</h2>
        <p className="pext">
          {t.sewText[lang]}<br />
          {lang === 'ua'
            ? 'За потреби можна звернутись за порадами або викрійками до учасників “Швейної роти” — спільнота активно ділиться досвідом.'
            : 'Feel free to ask for tips or patterns — our community actively shares experience.'}
        </p>
      </section>

      <section className="section">
        <h2 className="section-title center-title">{t.deliverTitle[lang]}</h2>
        <p className="pext">{lang === 'ua' ? 'Готову продукцію можна:' : 'You can deliver the finished items:'}</p>
        <ul className="dots">
          {t.deliverList[lang].map((item, index) => (
            <li key={index} className="li">{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CyberComplectPage;