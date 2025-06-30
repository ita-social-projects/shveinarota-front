"use client";

import { useEffect, useRef, useState } from "react";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { changeJsonData, getData, postData, postDataJson } from "api";
import GDriveInput from "$component/dashboard/GDriveInput/GDriveInput";
import { useParams } from "next/navigation";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";
import AutoGrowTextarea from "$component/dashboard/AutoGrowTextarea/AutoGrowTextarea";

export default function ChangePage() {
	const [categories, setCategories] = useState([]);
	const [formData, setFormData] = useState({
		title: '',
		title_en: '',
		videoUrl: [''],
		videoEnUrl: [''],
		details: '',
		details_en: '',
		summary: '',
		summary_en: '',
		authors: [],
		authors_en: [],
		category: '',
		category_en: ''
	});
	const [lekala, setLekala] = useState([{ path: "", text: "", text_en: "" }]);
	const [examples, setExamples] = useState([{ path: "", text: "", text_en: "" }]);
	const [preview, setPreview] = useState("");

	const authors = useRef();
	const authors_en = useRef();
	const select = useRef();

	const [element, setElement] = useState();

	const params = useParams();
	const { slug } = params

	useEffect(() => {
		getData("categories", setCategories);
		getData(`subcategories/all/${slug}`, setElement);
	}, []);

	useEffect(() => {
		if (element != undefined) {
			setFormData({
				title: element.subcategory,
				title_en: element.subcategory_en,
				videoUrl: element.url != null && Array.isArray(element.url) ? element.url : [""],
				videoEnUrl: element.url_en != null && Array.isArray(element.url_en) ? element.url_en : [""],
				details: element.details != null ? element.details : "",
				details_en: element.details_en != null ? element.details_en : "",
				summary: element.summary != null ? element.summary : "",
				summary_en: element.summary_en != null ? element.summary_en : "",
				authors: element.authors,
				authors_en: element.authors_en,
				category: element.categoryname,
				category_en: element.categoryname_en
			})
			element.preview != null && setPreview(element.preview)
			setLekala(element.lekala)
			setExamples(element.example)
			authors.current.value = element.authors.join(", ")
			if (element.authors_en) {
				authors_en.current.value = element.authors_en.join(", ")
			}
			select.current.value = element.categoryname
		}
	}, [element]);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const [showAlert, setShowAlert] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requiredFields = [
			"title", "title_en", "videoUrl", "details", "details_en",
			"summary", "summary_en", "category"
		];

		const emptyFields = requiredFields.filter(field => !formData[field]);

		if (emptyFields.length > 0) {
			alert(`Будь ласка, заповніть всі поля! Пропущено: ${emptyFields.join(", ")}`);
			return;
		}

		let error = false

		formData.videoUrl.forEach(e => {
			if (e == "") {
				alert('Посилання на відео не має бути пустим')
				error = true
				return;
			}
		});

		formData.videoEnUrl.forEach(e => {
			if (e == "") {
				alert('Посилання на відео не має бути пустим')
				error = true
				return;
			}
		});

		if (error) {
			return
		}

		if (preview.length == "") {
			alert('Будь ласка, додайте зображення етикетки!');
			return;
		}

		const data = {
			subcategory: formData.title,
			subcategory_en: formData.title_en,
			details: formData.details,
			details_en: formData.details_en,
			summary: formData.summary,
			summary_en: formData.summary_en,
			url: formData.videoUrl.map((url) => url.trim()),
			url_en: formData.videoEnUrl.map((url) => url.trim()),
			authors: formData.authors.map((author) => author.trim()),
			authors_en: formData.authors_en.map((author) => author.trim()),
			lekala: lekala,
			example: examples,
			categoryname: formData.category,
			categoryname_en: formData.category,
			preview: preview
		};

		console.log(data);

		changeJsonData("subcategories", slug, data, setShowAlert)
	};

	return (
		<main className="main">
			{showAlert && (
				<Alert
					message="Майстер-клас успішно змінений!"
					onClose={() => setShowAlert(false)}
				/>
			)}
			<div className="main__form container-lg mt-5 mb-5">
				<h1 className="form-title admin-title mb-4">Додати майстре-клас</h1>
				<form className="form needs-validation" onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="title" className="form-label">Заголовок</label>
						<input onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} type="text" className="form-control" id="title" name="title" placeholder="Введіть заголовок" />
					</div>

					<div className="mb-3">
						<label htmlFor="title" className="form-label">Заголовок (англ)</label>
						<input onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} value={formData.title_en} type="text" className="form-control" id="title" name="title" placeholder="Введіть заголовок" />
					</div>

					<ImageInput placeholder="Посилання на зображення етикетки виробу" image={preview} setImage={setPreview} />

					<div className="mb-3">
						<label className="form-label">Лекала</label>
						<GDriveInput images={lekala} setImages={setLekala} />
					</div>

					<div className="mb-3">
						<label className="form-label">Посилання на відео (embed)</label>
						{formData.videoUrl.map((url, index) => (
							<div key={index} className="input-group mb-2">
								<input
									type="url"
									className="form-control"
									placeholder="Введіть посилання на відео"
									value={url}
									onChange={(e) => {
										const updatedUrls = [...formData.videoUrl];
										updatedUrls[index] = e.target.value;
										setFormData({ ...formData, videoUrl: updatedUrls });
									}}
								/>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => {
										const updatedUrls = formData.videoUrl.filter((_, i) => i !== index);
										setFormData({ ...formData, videoUrl: updatedUrls });
									}}
									disabled={formData.videoUrl.length === 1}
								>
									Видалити
								</button>
							</div>
						))}
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => setFormData({ ...formData, videoUrl: [...formData.videoUrl, ''] })}
						>
							Додати посилання
						</button>
					</div>

					<div className="mb-3">
						<label className="form-label">Посилання на відео англійською (embed)</label>
						{formData.videoEnUrl.map((url, index) => (
							<div key={index} className="input-group mb-2">
								<input
									type="url"
									className="form-control"
									placeholder="Введіть посилання на відео"
									value={url}
									onChange={(e) => {
										const updatedUrls = [...formData.videoEnUrl];
										updatedUrls[index] = e.target.value;
										setFormData({ ...formData, videoEnUrl: updatedUrls });
									}}
								/>
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => {
										const updatedUrls = formData.videoEnUrl.filter((_, i) => i !== index);
										setFormData({ ...formData, videoEnUrl: updatedUrls });
									}}
									disabled={formData.videoEnUrl.length === 1}
								>
									Видалити
								</button>
							</div>
						))}
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => setFormData({ ...formData, videoEnUrl: [...formData.videoEnUrl, ''] })}
						>
							Додати посилання
						</button>
					</div>

					<div className="mb-3">
						<label className="form-label">Приклади готового виробу</label>
						<GDriveInput images={examples} setImages={setExamples} />
					</div>

					<div className="input-group mb-3">
						<span className="input-group-text">Деталі</span>
						<AutoGrowTextarea
							value={formData.details}
							onChange={(val) => setFormData({ ...formData, details: val })}
							ariaLabel="деталі"
						/>
					</div>

					<div className="input-group mb-3">
						<span className="input-group-text">Деталі (англ)</span>
						<AutoGrowTextarea
							value={formData.details_en}
							onChange={(val) => setFormData({ ...formData, details_en: val })}
							ariaLabel="деталі англійською"
						/>
					</div>

					<div className="input-group mb-3">
						<span className="input-group-text">Підсумок</span>
						<AutoGrowTextarea
							value={formData.summary}
							onChange={(val) => setFormData({ ...formData, summary: val })}
							ariaLabel="підсумок"
						/>
					</div>

					<div className="input-group mb-3">
						<span className="input-group-text">Підсумок (англ)</span>
						<AutoGrowTextarea
							value={formData.summary_en}
							onChange={(val) => setFormData({ ...formData, summary_en: val })}
							ariaLabel="підсумок англійською"
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="title" className="form-label">Імена авторів через кому (,)</label>
						<input ref={authors} onChange={e => setFormData({ ...formData, authors: e.target.value.split(",") })} type="text" className="form-control" id="title" name="title" placeholder="Введіть авторів" />
					</div>

					<div className="mb-3">
						<label htmlFor="title" className="form-label">Імена авторів (англ)</label>
						<input ref={authors_en} onChange={e => setFormData({ ...formData, authors_en: e.target.value.split(",") })} type="text" className="form-control" id="title" name="title" placeholder="Введіть авторів" />
					</div>

					<div className="input-group mb-3">
						<label className="input-group-text" htmlFor="inputGroupSelect01">Категорія</label>
						<select ref={select} defaultValue="DEFAULT" onChange={e => setFormData({ ...formData, category: e.target.value })} className="form-select" id="inputGroupSelect01">
							<option value="DEFAULT" disabled>Оберіть категорію...</option>
							{categories.map(cat =>
								<option key={cat.id} value={cat.id}>{cat.category}</option>
							)}
						</select>
					</div>
					<button onClick={(e) => handleSubmit(e)} type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
			<Bootstrap />
		</main>
	);
}
