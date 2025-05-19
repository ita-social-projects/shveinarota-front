"use client";

import { useEffect, useState } from "react";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { changeData, changeDataNoLang, getData, getDataNoLang, postData } from "api";
import { useParams } from "next/navigation";
import FileInput from "$component/dashboard/FileInput/FileInput";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";

export default function ChangePage() {
	const [file, setFile] = useState("");
	const [text, setText] = useState("");
	const [url, setUrl] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const [element, setElement] = useState();

	const params = useParams();
	const { slug } = params

	useEffect(() => {
		getDataNoLang(`payment/${slug}`, setElement);
	}, []);

	useEffect(() => {
		if (element != undefined) {
			setText(element.text)
			setUrl(element.url)
			setFile(element.path)
		}
	}, [element]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("text", text);
		formData.append("url", url);
		if (file) {
			formData.append("path", file);
		}

		changeDataNoLang("payment", slug, formData, setShowAlert)
	};

	return (
		<main className="main">
			{showAlert && (
				<Alert
					message="Метод був успішно змінений!"
					onClose={() => setShowAlert(false)}
				/>
			)}
			<div className="main__form container-lg mt-5">
				<h1 className="form-title admin-title mb-4">Змінити спосіб оплати</h1>
				<form className="form needs-validation" onSubmit={handleSubmit}>
					<div className="ua">
						<ImageInput image={file} setImage={setFile} />
						<div className="input-group mb-3">
							<span className="input-group-text" id="inputGroup-sizing-default">Додатковий текст:</span>
							<input
								required
								type="text"
								className="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-default"
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
						</div>
						<div className="input-group mb-3">
							<span className="input-group-text" id="inputGroup-sizing-default">Посилання:</span>
							<input
								required
								type="text"
								className="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-default"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
			<Bootstrap />
		</main>
	);
}
