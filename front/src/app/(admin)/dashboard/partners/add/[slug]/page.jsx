"use client";

import { useEffect, useState } from "react";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { changeData, getData, postData } from "api";
import { useParams } from "next/navigation";
import FileInput from "$component/dashboard/FileInput/FileInput";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";

export default function ChangePage() {
	const [file, setFile] = useState("");
	const [link, setLink] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const [element, setElement] = useState(undefined);

	const params = useParams();
	const { slug } = params

	useEffect(() => {
		getData('partners/' + slug, setElement);
	}, []);

	useEffect(() => {
		if (element != undefined) {
			setFile(element.path);
			setLink(element.link);
		}
	}, [element]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			alert("Будь ласка, оберіть файл");
			return;
		}

		const formData = new FormData();
		formData.append("path", file);
		formData.append("link", link);

		changeData("partners", slug, formData, setShowAlert)
	};

	return (
		<main className="main">
			{showAlert && (
				<Alert
					message="Партнер був успішно змінений!"
					onClose={() => setShowAlert(false)}
				/>
			)}
			<div className="main__form container-lg mt-5">
				<h1 className="form-title admin-title mb-4">Змінити партнера</h1>
				<form className="form needs-validation" onSubmit={handleSubmit}>
					<ImageInput image={file} setImage={setFile} />
					<div className="input-group mb-3">
						<span className="input-group-text" id="inputGroup-sizing-default">Посилання:</span>
						<input
							required
							type="text"
							className="form-control"
							aria-label="Sizing example input"
							aria-describedby="inputGroup-sizing-default"
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
			<Bootstrap />
		</main>
	);
}
