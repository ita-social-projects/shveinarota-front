import React from 'react';
import "$style/Guides.css";
import "./styles.css"

const WorkshopsPage = () => {
	return (
		<main className='workshops-main'>
			<div className="workshops-wrapper">
				<h1 className="title">Воркшоп</h1>

				<section className="section">
					<div className="section-with-image fixed-left-image">
						<img
							src="/images/guides/workshops.png"
							width={250}
							height={250}
							className="section-image"
							alt="Кібернабір"
						/>
						<div className="section-text">
							<h2 className="section-title center-title">Як доєднатися?</h2>
							<p className="text">
								Напиши в Instagram: @shveina_rota
							</p>
							<p>Тобі підкажуть:</p>
							<ul className='text-list'>
								<li>Хто координатор у твоєму місті</li>
								<li>Графік проведення воркшопів</li>
							</ul>
						</div>
					</div>
				</section>
				<section className='workshops-columns columns-workshops'>
					<div className="columns-workshops__column">
						<div className="columns-workshops__title">Формат</div>
						<div className="columns-workshops__text">Командна робота на місці</div>
					</div>
					<div className="columns-workshops__column">
						<div className="columns-workshops__title">Що робити</div>
						<ol>
							<li>Долучись до воркшопу</li>
							<li>Поший виріб</li>
							<li>Здай координатору</li>
						</ol>
					</div>
					<div className="columns-workshops__column">
						<div className="columns-workshops__title">Надамо</div>
						<div className="columns-workshops__text">Тканини на місці</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default WorkshopsPage;