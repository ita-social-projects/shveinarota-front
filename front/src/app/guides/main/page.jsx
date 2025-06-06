import Image from "next/image";
import "$style/Guides.css"
import Link from "next/link";

const GuidesMain = () => {
	return (
		<main className="guides-main">
			<div className="guides-main__header header-guides">
				<div className="header-guides__container">
					<h1 className="header-guides__title">
						Вітаємо в спільноті<br />"Швейна рота"
					</h1>
					<div className="header-guides__subtitle">
						Крокуємо разом — від набору до тепла в руках захисників!
					</div>
					<div className="header-guides__stage stage">
						01
					</div>
				</div>
			</div>
			<div className="guides-main__cards cards-guides">
				<div className="cards-guides__container">
					<div className="cards-guides__body">
						<div className="cards-guides__card card-guides">
							<div className="card-guides__body">
								<div className="card-guides__image">
									<Image
										src={"/images/guides/main/heart.png"}
										width={130}
										height={130}
										alt="heart"
									/>
								</div>
								<div className="card-guides__row">
									<div className="card-guides__status green">
										Для новачків
									</div>
									<div className="card-guides__title">Кібернабір для пошиття</div>
								</div>
								<div className="card-guides__description">
									Отримаєш комплект матеріалів, викрійки, інструкції, підтримка в чаті
								</div>
							</div>
							<div className="card-guides__right">
								<button className="card-guides__button">
									Доєднатися
								</button>
							</div>
						</div>
						<div className="cards-guides__card card-guides">
							<div className="card-guides__body">
								<div className="card-guides__image">
									<Image
										src={"/images/guides/main/needle.png"}
										width={130}
										height={130}
										alt="heart"
									/>
								</div>
								<div className="card-guides__row">
									<div className="card-guides__status purple">
										Для майстрів
									</div>
									<div className="card-guides__title">Самостійне пошиття</div>
								</div>
								<div className="card-guides__description">
									Отримаєш комплект матеріалів, викрійки, інструкції, підтримка в чаті
								</div>
							</div>
							<div className="card-guides__right">
								<button className="card-guides__button">
									Доєднатися
								</button>
							</div>
						</div>
						<div className="cards-guides__card card-guides">
							<div className="card-guides__body">
								<div className="card-guides__image">
									<Image
										src={"/images/guides/main/team.png"}
										width={130}
										height={130}
										alt="heart"
									/>
								</div>
								<div className="card-guides__row">
									<div className="card-guides__status beige">
										Команда
									</div>
									<div className="card-guides__title">Локальний воркшоп</div>
								</div>
								<div className="card-guides__description">
									Отримаєш комплект матеріалів, викрійки, інструкції, підтримка в чаті
								</div>
							</div>
							<div className="card-guides__right">
								<button className="card-guides__button">
									Доєднатися
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="guides-main__contacts contacts-guides">
				<div className="contacts-guides__container">
					<div className="contacts-guides__title">
						Зв'язатися з нами
					</div>
					<div className="contacts-guides__body">
						<div className="contacts-guides__text">
							<p>Для запиту адреси для відправки готових виробів - звертайтесь до координаторок.</p>
							<p>Для участі у локальних воркшопах - пишіть в <Link href="" className="contacts-guides__link">Instagram</Link>, вам підкажуть координатора у вашому місті.</p>
						</div>
						<div className="contacts-guides__media">
							<div className="contacts-guides__column column-guides">
								<div className="column-guides__title">Instagram</div>
								<Link href="" className="column-guides__link">@shveina_rota</Link>
							</div>
							<div className="contacts-guides__column column-guides">
								<div className="column-guides__title">Telegram</div>
								<Link href="" className="column-guides__link">t.me/shveina_rota</Link>
								<Link href="" className="column-guides__link">@shveina_rota</Link>
							</div>
						</div>
					</div>
					<div className="contacts-guides__stage stage">
						03
					</div>
				</div>
			</div>
		</main>
	);
};

export default GuidesMain;