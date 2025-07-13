"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
import Alert from "$component/dashboard/Alert/Alert";
import { getData } from "api";
import axios from "axios";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";

const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });

function parseChildren(nodeList) {
	const children = [];
	nodeList.forEach(node => {
		if (node.nodeType === Node.TEXT_NODE) {
			children.push({ text: node.textContent, bold: false, italic: false });
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			const tag = node.tagName;
			const bold = tag === 'STRONG' || tag === 'B';
			const italic = tag === 'EM' || tag === 'I';
			const inner = parseChildren(Array.from(node.childNodes));
			inner.forEach(seg => {
				children.push({ text: seg.text, bold: bold || seg.bold, italic: italic || seg.italic });
			});
		}
	});
	return children;
}

const ParagraphEditor = ({ block, onChange }) => {
	const editorRef = useRef(null);

	useEffect(() => {
		if (editorRef.current && block.children) {
			editorRef.current.innerHTML = block.children.map(child => {
				let text = child.text;
				if (child.bold) text = `<strong>${text}</strong>`;
				if (child.italic) text = `<em>${text}</em>`;
				return text;
			}).join(" ");
		}
	}, [block]);

	const exec = (cmd) => {
		editorRef.current.focus();
		document.execCommand(cmd, false);
	};

	const updateChildren = () => {
		const html = editorRef.current.innerHTML;
		const dom = document.createElement('div');
		dom.innerHTML = html;
		const children = parseChildren(Array.from(dom.childNodes));
		onChange({ ...block, children });
	};

	return (
		<div className="mb-3">
			<div className="btn-group mb-1">
				<button type="button" className="btn btn-sm btn-secondary" onMouseDown={(e) => { e.preventDefault(); exec('bold'); }}><strong>B</strong></button>
				<button type="button" className="btn btn-sm btn-secondary" onMouseDown={(e) => { e.preventDefault(); exec('italic'); }}><em>I</em></button>
			</div>
			<div ref={editorRef} contentEditable className="form-control" style={{ minHeight: '80px', overflow: 'auto' }} onBlur={updateChildren} />
		</div>
	);
};

export default function EditNews() {
	const { slug } = useParams();
	const [form, setForm] = useState({ tags: [], titleUk: '', titleEn: '', createdAt: '' });
	const [content, setContent] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [availableTags, setAvailableTags] = useState([]);
	const [newTag, setNewTag] = useState({ nameUk: '', nameEn: '' });

	useEffect(() => {
		getData(`news/all/${slug}`, (data) => {
			setForm({
				tags: data.tags || [],
				titleUk: data.titleUk,
				titleEn: data.titleEn,
				createdAt: new Date(data.createdAt).toISOString().slice(0, 16),
			});
			setContent(data.contentUk || []);
		});
		getData('news/tags', setAvailableTags);
	}, [slug]);

	const addImageBlock = () => setContent([...content, { type: 'image', url: '', alt: '' }]);
	const addParagraphBlock = () => setContent([...content, { type: 'paragraph', children: [{ text: '', bold: false, italic: false }] }]);
	const updateBlock = (idx, updated) => {
		const newContent = [...content];
		newContent[idx] = updated;
		setContent(newContent);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.titleUk || !form.titleEn) {
			alert("Заповніть заголовки");
			return;
		}

		const payload = {
			titleUk: form.titleUk,
			titleEn: form.titleEn,
			createdAt: new Date(form.createdAt).toISOString(),
			contentUk: content,
			contentEn: content,
			tags: [
				...form.tags,
				...(newTag.nameUk.trim() && newTag.nameEn.trim()
					? [{ nameUk: newTag.nameUk.trim(), nameEn: newTag.nameEn.trim() }]
					: [])
			]
		};

		try {
			await axios.patch(`${process.env.BACK_URL}news/${slug}`, payload, {
				withCredentials: true,
			});
			setShowAlert(true);
		} catch (err) {
			console.error("Помилка при оновленні новини:", err);
			alert("Не вдалося оновити новину.");
		}
	};

	return (
		<main className="main">
			{showAlert && <Alert message="Новину оновлено!" onClose={() => setShowAlert(false)} />}
			<div className="main__form container-lg mt-5 mb-5">
				<h1 className="admin-title mb-4">Редагувати новину</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label">Обрані теги</label>
						<div className="d-flex flex-wrap gap-2 mb-2">
							{form.tags.map((tag, index) => (
								<span key={index} className="badge bg-primary d-flex align-items-center">
									{(tag.nameUk || 'Без назви укр')} / {(tag.nameEn || 'Без назви англ')}
									<button
										type="button"
										className="btn-close btn-close-white ms-2"
										onClick={() =>
											setForm({
												...form,
												tags: form.tags.filter(
													(t, i) =>
														!(t.nameUk === tag.nameUk && t.nameEn === tag.nameEn && i === index)
												),
											})
										}
										style={{ fontSize: '0.6rem' }}
									/>
								</span>
							))}
						</div>


						<select
							className="form-select"
							onChange={(e) => {
								const selectedId = Number(e.target.value);
								const selectedTag = availableTags.find(tag => tag.id === selectedId);
								if (selectedTag && !form.tags.some(t => t.id === selectedTag.id)) {
									setForm({ ...form, tags: [...form.tags, selectedTag] });
								}
								e.target.value = '';
							}}
							defaultValue=""
						>
							<option value="" disabled>Оберіть тег зі списку</option>
							{availableTags
								.filter(tag => !form.tags.some(t => t.id === tag.id))
								.map(tag => (
									<option key={tag.id} value={tag.id}>
										{tag.nameUk} / {tag.nameEn}
									</option>
								))}
						</select>
					</div>

					<div className="mb-3">
						<label className="form-label">Додати новий тег</label>
						<div className="row g-2 mb-2">
							<div className="col">
								<input
									type="text"
									className="form-control"
									placeholder="Назва укр"
									value={newTag.nameUk}
									onChange={(e) => setNewTag({ ...newTag, nameUk: e.target.value })}
								/>
							</div>
							<div className="col">
								<input
									type="text"
									className="form-control"
									placeholder="Назва англ"
									value={newTag.nameEn}
									onChange={(e) => setNewTag({ ...newTag, nameEn: e.target.value })}
								/>
							</div>
							<div className="col-auto">
								<button
									type="button"
									className="btn btn-success"
									onClick={() => {
										const trimmedUk = newTag.nameUk.trim();
										const trimmedEn = newTag.nameEn.trim();

										if (!trimmedUk || !trimmedEn) {
											alert('Заповніть обидва поля');
											return;
										}

										const exists = [...availableTags, ...form.tags].some(
											tag =>
												tag.nameUk.toLowerCase() === trimmedUk.toLowerCase() ||
												tag.nameEn.toLowerCase() === trimmedEn.toLowerCase()
										);

										if (exists) {
											alert('Такий тег вже існує');
											return;
										}

										const newTagObj = { nameUk: trimmedUk, nameEn: trimmedEn };
										setForm({ ...form, tags: [...form.tags, newTagObj] });
										setNewTag({ nameUk: '', nameEn: '' });
									}}
								>
									Додати
								</button>
							</div>
						</div>
					</div>

					<div className="mb-3">
						<label className="form-label">Заголовок (укр)</label>
						<input type="text" className="form-control" value={form.titleUk} onChange={(e) => setForm({ ...form, titleUk: e.target.value })} />
					</div>
					<div className="mb-3">
						<label className="form-label">Заголовок (eng)</label>
						<input type="text" className="form-control" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
					</div>
					<div className="mb-3">
						<label className="form-label">Дата створення</label>
						<input type="datetime-local" className="form-control" value={form.createdAt} onChange={(e) => setForm({ ...form, createdAt: e.target.value })} />
					</div>

					<div className="mb-3">
						<h5>Контент</h5>
						{content.map((block, idx) => (
							<div key={idx} className="mb-4">
								{block.type === 'image' ? (
									<ImageInput
										placeholder="Посилання на зображення"
										image={block.url}
										setImage={(url) => updateBlock(idx, { ...block, url })}
									/>
								) : (
									<ParagraphEditor block={block} onChange={(upd) => updateBlock(idx, upd)} />
								)}
								<button type="button" className="btn btn-danger btn-sm" onClick={() => setContent(content.filter((_, i) => i !== idx))}>
									Видалити блок
								</button>
							</div>
						))}
						<div className="btn-group">
							<button type="button" className="btn btn-secondary me-2" onClick={addImageBlock}>Додати зображення</button>
							<button type="button" className="btn btn-secondary" onClick={addParagraphBlock}>Додати параграф</button>
						</div>
					</div>

					<button type="submit" className="btn btn-primary">Зберегти</button>
				</form>
			</div>
			<Bootstrap />
		</main>
	);
}
