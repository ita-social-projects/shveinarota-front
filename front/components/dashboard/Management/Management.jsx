import Link from "next/link";
import ManagementElement from "../ManagementElement/ManagementElement";
import { useEffect, useState } from "react";
import { getData } from "api";

const Management = () => {
	const [statistic, setStatistic] = useState({})

	useEffect(() => {
		getData("statistic", setStatistic)
	}, [])

	return (
		<>
			<h1 className="admin__title admin-title">Керування елементами</h1>
			<div className="mt-3">
				<ul className="list-group">
					<ManagementElement title="Слайди" number={statistic.Slide} addLink="dashboard/slides/add" link="dashboard/slides" />
					<ManagementElement title="Статистичні картки" number={statistic.card} addLink="dashboard/cards/add" link="dashboard/cards" />
					<ManagementElement title="Соц Мережі" number={statistic.MediaLinks} addLink="dashboard/media/add" link="dashboard/media" />
					<ManagementElement title="Партнери" number={statistic.Partners} addLink="dashboard/partners/add" link="dashboard/partners" />
					<ManagementElement title="Cлайди-сюжети" number={statistic.Plot} addLink="dashboard/plots/add" link="dashboard/plots" />
					<ManagementElement title="Маркери на мапі" number={statistic.Marker} addLink="dashboard/markers/add" link="dashboard/markers" />
					<ManagementElement title="Категорії кібер-одягу" number={statistic.Category} addLink="dashboard/categories/add" link="dashboard/categories" />
					<ManagementElement title="Майстер-класи" number={statistic.Subcategory} addLink="dashboard/masterclass/add" link="dashboard/masterclass" />
					<ManagementElement title="Наша команда" number={statistic.Team} addLink="dashboard/team/add" link="dashboard/team" />
				</ul>
			</div>
		</>
	);
};

export default Management;