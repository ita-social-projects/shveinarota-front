import { useEffect, useRef } from "react";

const AutoGrowTextarea = ({ value, onChange, ariaLabel }) => {
	const textareaRef = useRef(null);

	const adjustHeight = () => {
		const el = textareaRef.current;
		if (el) {
			el.style.height = "auto"; // скидаємо висоту
			el.style.height = el.scrollHeight + "px"; // встановлюємо нову
		}
	};

	useEffect(() => {
		adjustHeight();
	}, [value]);

	return (
		<textarea
			ref={textareaRef}
			className="form-control"
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
				adjustHeight();
			}}
			aria-label={ariaLabel}
			style={{ resize: "none", overflow: "hidden", minHeight: "80px" }}
		/>
	);
};

export default AutoGrowTextarea;