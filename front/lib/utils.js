import { mockNews } from "./mockedData";

export const convertToId = (value) => {
	const match = value.match(/[-\w]{25,}/);
	return match ? match[0] : "";
};

export function transliterate(text) {
	const transliterationMap = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g',
		'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
		'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
		'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
		'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
		'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
		'ю': 'yu', 'я': 'ya', 'ь': '', 'ъ': '', 'ы': 'y',
		'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G',
		'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
		'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K',
		'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
		'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
		'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
		'Ю': 'Yu', 'Я': 'Ya', 'Ь': '', 'Ъ': '', 'Ы': 'Y'
	};

	let transliteratedText = '';
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		transliteratedText += transliterationMap[char] || char;
	}

	transliteratedText = transliteratedText.toLowerCase();
	transliteratedText = transliteratedText.replace(/[\s]+/g, '-');
	transliteratedText = transliteratedText.replace(/[^a-z0-9-]/g, '');
	
	return transliteratedText;
}

export const getPageCount = (totalCount, limit) => {
	return Math.ceil(totalCount / limit);
}

export function getPaginatedNews(page = 1, pageSize = 5) {
  const total = mockNews.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = mockNews.slice(start, end);

  return {
    data: data,
    total: total,
    page: page,
    pageSize: pageSize
  };
}