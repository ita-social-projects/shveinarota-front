import axios from "axios";

// функція отримання карток
export default async function getData(type, setData) {
	try {
		const response = await axios.get(process.env.BACK_URL + type);
		console.log(response.data);
		setData(response.data);
	} catch (error) {
		console.error("Ошибка при получении данных:", error);
	}
}

// функція видалення карток
export async function deleteDataById(type, id, setData) {
	try {
		await axios.delete(`${process.env.BACK_URL}${type}/${id}`);
		setData((prevData) => prevData.filter((data) => data.id !== id));
	} catch (error) {
		console.error(`Ошибка при удалении карточки с id ${id}:`, error);
	}
}

export async function postData(type, formData, setShowAlert) {
	try {
		await axios.post(process.env.BACK_URL + type, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 3000);
	} catch (error) {
		console.error("Ошибка при отправке данных:", error);
		alert("Ошибка при отправке данных.");
	}
}