"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { getData, changeJsonData } from "api";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";
import axios from "axios";

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
				<button
					type="button"
					className="btn btn-sm btn-secondary"
					onMouseDown={(e) => {
						e.preventDefault();
						exec('bold');
					}}
				>
					<strong>B</strong>
				</button>
				<button
					type="button"
					className="btn btn-sm btn-secondary"
					onMouseDown={(e) => {
						e.preventDefault();
						exec('italic');
					}}
				>
					<em>I</em>
				</button>
			</div>
			<div
				ref={editorRef}
				contentEditable
				className="form-control"
				style={{ minHeight: '80px', overflow: 'auto' }}
				onBlur={updateChildren}
			/>
		</div>
	);
};


export default function EditNews() {
	const { slug } = useParams();
	const [form, setForm] = useState({
		tagsUk: [],
		tagsEn: [],
		titleUk: '',
		titleEn: '',
		createdAt: ''
	});
	const [content, setContent] = useState([]);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		getData(`news/all/${slug}`, (data) => {
			setForm({
				tagsUk: data.tagsUk,
				tagsEn: data.tagsEn,
				titleUk: data.titleUk,
				titleEn: data.titleEn,
				createdAt: new Date(data.createdAt).toISOString().slice(0, 16),
			});
			setContent(data.contentUk || []);
		});
	}, [slug]);

	useEffect(() => {
		console.log(form);
	}, [form]);

	const handleTags = (e, lang) => {
		const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
		setForm(prev => ({ ...prev, [lang]: arr }));
	};

	const addImageBlock = () => {
		setContent([...content, { type: 'image', url: '', alt: '' }]);
	};

	const addParagraphBlock = () => {
		setContent([...content, { type: 'paragraph', children: [{ text: '', bold: false, italic: false }] }]);
	};

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
			tagsUk: form.tagsUk,
			tagsEn: form.tagsEn,
			titleUk: form.titleUk,
			titleEn: form.titleEn,
			createdAt: new Date(form.createdAt).toISOString(),
			contentUk: content,
			contentEn: content
		};

		try {
			await axios.patch(`${process.env.BACK_URL}news/${slug}`, payload, {
				withCredentials: true,
			});
			setShowAlert(true);
		} catch (error) {
			console.error("Помилка при оновленні новини:", error);
			alert("Не вдалося оновити новину.");
		}
	};


	return (
		<main className="main">
			{showAlert && <Alert message="Новину оновлено!" onClose={() => setShowAlert(false)} />}
			<div className="main__form container-lg mt-5 mb-5">
				<h1 className="admin-title mb-4">Редагувати новину</h1>
				<form onSubmit={handleSubmit}>
					<div className="row mb-3">
						<div className="col">
							<label className="form-label">Теги (укр)</label>
							<input type="text" className="form-control" value={form.tagsUk.join(', ')} onChange={(e) => handleTags(e, 'tagsUk')} />
						</div>
						<div className="col">
							<label className="form-label">Теги (eng)</label>
							<input type="text" className="form-control" value={form.tagsEn.join(', ')} onChange={(e) => handleTags(e, 'tagsEn')} />
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
