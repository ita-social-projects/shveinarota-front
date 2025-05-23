export const convertToId = (value) => {
	const match = value.match(/[-\w]{25,}/);
	return match ? match[0] : "";
};