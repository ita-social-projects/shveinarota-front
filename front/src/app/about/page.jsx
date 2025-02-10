"use client";

import Image from "next/image";
import Link from "next/link";
import "$style/AboutPage.css"

export default function AboutPage() {

	return (
		<main className='main'>
			<div className="main__about about">
				<div className="about__container">
					<div className="about__row">
						<div className="title-underline about__title"><h1 className='_main-title'>Хто ми?</h1></div>
						<div className="about__text">
							Ми - <span className="_italic">Марина Пальченко</span> та Ксенія Самойлич засновниці “Швейної роти”, яка пошила 100 000+ одиниць адаптивного одягу для поранених захисників у 90+ госпіталів України та об’єднала навколо себе 700+ волонтерів в усіх частинах світу.
						</div>
					</div>
				</div>
			</div>
			<div className="main__team team">
				<div className="team__container">
					<div className="team__title title-underline"><h1 className="_main-title">Наша команда</h1></div>
					<div className="team__members">
						<div className="team__member member">
							<div className="member__image">
								<Image
									src="/images/about/user.png"
									alt="logo"
									width={182}
									height={182}
									className="member-img"
								/>
							</div>
							<div className="member__body">
								<div className="member__name">Марія Іванівна</div>
								<div className="member__post">Засновниця</div>
							</div>
						</div>
						<div className="team__member member">
							<div className="member__image">
								<Image
									src="/images/about/user.png"
									alt="logo"
									width={182}
									height={182}
									className="member-img"
								/>
							</div>
							<div className="member__body">
								<div className="member__name">Марія Іванівна</div>
								<div className="member__post">Засновниця</div>
							</div>
						</div>
						<div className="team__member member">
							<div className="member__image">
								<Image
									src="/images/about/user.png"
									alt="logo"
									width={182}
									height={182}
									className="member-img"
								/>
							</div>
							<div className="member__body">
								<div className="member__name">Марія Іванівна</div>
								<div className="member__post">Засновниця</div>
							</div>
						</div>
						<div className="team__member member">
							<div className="member__image">
								<Image
									src="/images/about/user.png"
									alt="logo"
									width={182}
									height={182}
									className="member-img"
								/>
							</div>
							<div className="member__body">
								<div className="member__name">Марія Іванівна</div>
								<div className="member__post">Засновниця</div>
							</div>
						</div>
						<div className="team__member member">
							<div className="member__image">
								<Image
									src="/images/about/user.png"
									alt="logo"
									width={182}
									height={182}
									className="member-img"
								/>
							</div>
							<div className="member__body">
								<div className="member__name">Марія Іванівна</div>
								<div className="member__post">Засновниця</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}