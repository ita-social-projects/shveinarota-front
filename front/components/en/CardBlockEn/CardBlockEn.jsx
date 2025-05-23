import { getEnData } from "api";
import Card from "./Card/Card";
import "./CardBlock.css"
import { useEffect, useState } from "react";
import { useLang } from "$component/Context/LangContext";

const CardBlockEn = () => {
	const { lang } = useLang();
	const [cards, setCards] = useState([]);

	useEffect(() => {
		getEnData("cards", setCards)
	}, [])

	return (
		<div className="cardbox">
			<h1 className="card__title__main-title">{lang == 'ua' ? "Наші досягнення" : "Our achievements"}</h1>
			<div className="card__line"></div>
			<div
				className="cardbox__container"
			>
				{cards.map(card =>
					<Card key={card.id} title={card.title_en} number={card.description_en} img={card.path}/>
				)}
			</div>
		</div>
	);
};

export default CardBlockEn;