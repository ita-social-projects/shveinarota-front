import MasterClassPage from "./MasterClassPage";
import axios from "axios";
import { cookies } from "next/headers"; // Импорт для работы с куками на сервере

export async function getData(type) {
	try {
		console.log(`Запрос: ${process.env.BACK_URL + type}`);

		const response = await axios.get(process.env.BACK_URL + type, {
			timeout: 5000, // Максимальное ожидание 5 сек
		});

		return response.data;
	} catch (error) {
		console.error("Ошибка загрузки данных:", error?.response?.status || error);
		return null;
	}
}

export async function generateMetadata({ params }) {
	let guide = [];

	const { slug } = await params;

	if (slug) {
		guide = await getData(`subcategories/${slug?.[1]}`);
	} else {
		const cat = await getData('categories/all');
		guide = await getData(`subcategories/${cat[0].subcategories[0].id}`);
	}

	if (!guide) {
		return {
			title: "Гайд не найден",
			description: "Такого гайда нет в базе данных",
		};
	}

	return {
		title: `${guide.subcategory} | Швейна рота`,
		description: guide.summary,
		openGraph: {
			title: guide.subcategory,
			description: guide.summary,
		},
	};
}

export default function GuidesPage() {
	return <MasterClassPage />;
}