'use client';

import React from 'react';
import "src/app/guides/CyberComplects/styles.css";
import { useLang } from "$component/Context/LangContext";

const CyberComplectPage = () => {
  const { lang } = useLang();

  const t = {
    title: {
      ua: "САМОСТІЙНЕ ПОШИТТЯ",
      en: "SELF‑SEWING",
    },
    howToJoin: {
      ua: "Як почати самостійно шити?",
      en: "How to start sewing on your own?",
    },
    howToJoinText: {
      ua: (
        <>
          Це ваш наступний крок після отримання кібернабору: ви маєте тканину та бажання допомогти — ми покажемо, як організувати процес самостійного пошиття.<br />
          Кожен етап спроектовано так, щоб ви могли працювати у зручному для вас темпі і отримувати підтримку спільноти.
        </>
      ),
      en: (
        <>
          This is your next step after receiving a cyber‑kit: you have fabric and the will to help — we’ll guide you through organizing your own sewing process.<br />
          Each stage is designed so you can work at your own pace and get community support.
        </>
      ),
    },
    chooseTitle: {
      ua: "1. Оберіть виріб для пошиття",
      en: "1. Choose an item to sew",
    },
    chooseList: {
      ua: [
        "Кібершорти — легкі шорти для літа та відпочинку.",
        "Кіберштани — універсальні штани для повсякденної носки.",
        "Кіберфутболка — зручна футболка з еластичного трикотажу.",
        "Кібербандаж — підтримуючий пояс для зручності пораненим.",
        "Інші вироби — за вашим бажанням: рукавиці, шапки, чохли."
      ],
      en: [
        "Cyber‑shorts — lightweight shorts for summer and leisure.",
        "Cyber‑pants — versatile trousers for everyday wear.",
        "Cyber‑T‑shirt — comfortable stretch‑jersey shirt.",
        "Cyber‑bandage — supportive belt for comfort.",
        "Other items — at your choice: gloves, hats, covers."
      ],
    },
    materialsTitle: {
      ua: "2. Підготуйте матеріали",
      en: "2. Gather your materials",
    },
    materialsList: {
      ua: [
        "Викрійки та інструкції шукайте в Навчальному центрі: https://shveinarota.org/guides.",
        "Перевірте, що маєте: потрібні тканини (кулір, фліс, котон), фурнітуру (липучки, резинки), нитки та інструменти.",
        "Якщо чогось не вистачає — попросіть про допомогу у чаті підтримки: https://t.me/+d4A8Ho3ug8xlMWMy."
      ],
      en: [
        "Find patterns and guides in the Training Center: https://shveinarota.org/guides.",
        "Ensure you have: fabrics (jersey, fleece, cotton), hardware (Velcro, elastics), threads, and tools.",
        "If anything’s missing—ask for help in the support chat: https://t.me/+d4A8Ho3ug8xlMWMy."
      ],
    },
    sewTitle: {
      ua: "3. Почніть шити",
      en: "3. Start sewing",
    },
    sewText: {
      ua: (
        <>
          Дотримуйтеся лекал і відеоінструкцій: уважно розташуйте деталі, проклейте внутрішні шви, проконайте перевірку якості на кожному етапі.<br />
          Час виконання — залежить від виробу: 1–3 тижні. Не поспішайте — надійність важливіша за швидкість.
        </>
      ),
      en: (
        <>
          Follow the patterns and video tutorials: align pieces carefully, reinforce seams, and perform quality checks at each stage.<br />
          Completion time varies by item: 1–3 weeks. Don’t rush—durability matters more than speed.
        </>
      ),
    },
    deliverTitle: {
      ua: "4. Передайте готові вироби",
      en: "4. Deliver your finished items",
    },
    deliverList: {
      ua: [
        "Упакуйте роботу: виперіть, попрасуйте, приберіть зайве та підпишіть етикетку (ім’я, місто).",
        "Зв’яжіться з координаторками (@sewgeologist, @tetyanapetrenko) за адресою для відправки.",
        "Вартість доставки ви сплачуєте самостійно або через невеликий донат серед друзів."
      ],
      en: [
        "Package your work: wash, iron, trim loose threads, and fill out the label (name, city).",
        "Contact coordinators (@sewgeologist, @tetyanapetrenko) to get the current shipping address.",
        "You cover the shipping cost yourself or via a small donation among friends."
      ],
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
          : 'Clarify which fabric types are suitable — durability and comfort are important.'}
        </p>
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
