import Card from "./Card/Card";
import "./CardBlock.css"

const CardBlockEn = () => {

	const cards = [
		{
			id: 4,
			img: 'url/img',
			title: 'Hospitals, clinics, medical centers, rehabs, prosthetics centers that received adaptive clothing',
			number: '100+'
		},
		{
			id: 1,
			img: 'url/img',
			title: 'Units of adaptive clothing',
			number: '100 000+'
		},
		{
			id: 2,
			img: 'url/img',
			title: 'Volunteers in all parts of the world!',
			number: ' 700+'
		},
		{
			id: 3,
			img: 'url/img',
			title: 'Individual targeted requests for adaptive clothing',
			number: '1800+'
		},
	]

	return (
		<div className="cardbox">
			<div
				className="cardbox__container"
			>
				{cards.map(card => 
					<Card key={card.id} title={card.title} number={card.number} />
				)}
			</div>
		</div>
	);
};

export default CardBlockEn;