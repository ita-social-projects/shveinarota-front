"use client";
import Image from "next/image";
import "$style/Guides.css";
import Link from "next/link";
import { useInView } from "hooks/useInView"; // адаптируй путь под свой проект


const HeaderBlock = () => {
  const [ref, isVisible] = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="guides-main__header header-guides">
      <div className="header-guides__container">
        <h1 className={`header-guides__title ${isVisible ? "visible" : ""}`}>
          Вітаємо в спільноті<br />"Швейна рота"
        </h1>
        <div className={`header-guides__subtitle ${isVisible ? "visible" : ""}`}>
          Крокуємо разом — від набору до тепла в руках захисників!
        </div>
        <div className={`stage-wrapper ${isVisible ? "visible" : ""}`}>
			<div className="stage">01</div>
		</div>
      </div>
    </div>
  );
};

const Card = ({ image, statusColor, statusText, title, description, delay }) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <div 
      ref={ref} 
      className={`cards-guides__card card-guides ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="card-guides__body">
        <div className="card-guides__image">
          <Image src={image} width={130} height={130} alt="image" />
        </div>
        <div className="card-guides__row">
          <div className={`card-guides__status ${statusColor}`}>
            {statusText}
          </div>
          <div className="card-guides__title">{title}</div>
        </div>
        <div className="card-guides__description">{description}</div>
      </div>
      <div className="card-guides__right">
        <button className="card-guides__button">Доєднатися</button>
      </div>
    </div>
  );
};


const ContactsBlock = () => {
  const [ref, isVisible] = useInView({ threshold: 0.3 });

  return (
    <div className="guides-main__contacts contacts-guides" ref={ref}>
      <div className="contacts-guides__container">
        <div className={`contacts-guides__title ${isVisible ? "visible" : ""}`}>
          Зв'язатися з нами
        </div>

        <div className={`contacts-guides__body ${isVisible ? "visible" : ""}`}>
          <div className="contacts-guides__text">
            <p>
              Для запиту адреси для відправки готових виробів - звертайтесь до
              координаторок.
            </p>
            <p>
              Для участі у локальних воркшопах - пишіть в{" "}
              <Link href="" className="contacts-guides__link">
                Instagram
              </Link>
              , вам підкажуть координатора у вашому місті.
            </p>
          </div>

          <div className="contacts-guides__media">
            <div className="contacts-guides__column column-guides">
              <div className="column-guides__title">Instagram</div>
              <Link href="" className="column-guides__link">
                @shveina_rota
              </Link>
            </div>
            <div className="contacts-guides__column column-guides">
              <div className="column-guides__title">Telegram</div>
              <Link href="" className="column-guides__link">
                t.me/shveina_rota
              </Link>
              <Link href="" className="column-guides__link">@shveina_rota</Link>
            </div>
          </div>
        </div>

        {/* Для stage — обертка с анимацией, чтобы не ломать позиционирование */}
        <div className={`stage-wrapper ${isVisible ? "visible" : ""}`}>
          <div className="contacts-guides__stage stage">03</div>
        </div>
      </div>
    </div>
  );
};

const GuidesMain = () => {
  return (
    <main className="guides-main">
      <HeaderBlock />  {/* Новый анимируемый заголовок */}

      <div className="guides-main__cards cards-guides">
        <div className="cards-guides__container">
          <div className="cards-guides__body">
            <Card
              image="/images/guides/main/heart.png"
              statusColor="green"
              statusText="Для новачків"
              title="Кібернабір для пошиття"
              description="Отримаєш комплект матеріалів, викрійки, інструкції, підтримка в чаті"
              delay={0.1}
            />
            <Card
              image="/images/guides/main/needle.png"
              statusColor="purple"
              statusText="Для майстрів"
              title="Самостійне пошиття"
              description="Отримаєш комплект матеріалів, викрійки, інструкції, підтримка в чаті"
              delay={0.3}
            />
            <Card
              image="/images/guides/main/team.png"
              statusColor="beige"
              statusText="Команда"
              title="Локальний воркшоп"
              description="Отримаєш комплект матеріалів, викрійки, інструкції, підтримка в чаті"
              delay={0.5}
            />
          </div>
        </div>
      </div>

      <ContactsBlock/>
    </main>
  );
};


export default GuidesMain;
