import axios from "axios";
import MasterClassPage from "./MasterClassPageEN";

export async function getData(type) {
	try {
		console.log(`Запрос: ${process.env.BACK_URL_EN + type}`);

		const response = await axios.get(process.env.BACK_URL_EN + type, {
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
			title: "Гайд не знайдений",
			description: "Такого гайда немає в базі даних",
		};
	}

	return {
		title: `${guide.subcategory_en} | Shveina rota`,
		description: guide.summary_en,
		openGraph: {
			title: guide.subcategory_en,
			description: guide.summary_en,
		},
	};
}

export default function GuidesPage() {
	return <MasterClassPage />;
}