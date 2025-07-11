"use client";

import { useEffect, useState, useRef } from "react";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import { getData, postDataJson } from "api";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";
import Alert from "$component/dashboard/Alert/Alert";
import Bootstrap from "$component/guides/Bootstrap/Bootstrap";

function parseChildren(nodeList) {
  const children = [];
  nodeList.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      children.push({ text: node.textContent, bold: false, italic: false });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName;
      const bold = tag === 'STRONG' || tag === 'B';
      const italic = tag === 'EM' || tag === 'I';
      // Recursively handle nested nodes
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

export default function AddNews() {
  const [form, setForm] = useState({
    tagsUk: [],
    tagsEn: [],
    titleUk: '',
    titleEn: '',
    createdAt: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  });
  const [content, setContent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Helpers for tags
  const handleTags = (e, lang) => {
    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setForm({ ...form, [lang]: arr });
  };

  useEffect(() => {
    console.log(content);
  }, [content])

  // Add blocks
  const addImageBlock = () => {
    setContent([...content, { type: 'image', url: '', alt: '' }]);
  };
  const addParagraphBlock = () => {
    setContent([...content, { type: 'paragraph', children: [{ text: '', bold: false, italic: false }] }]);
  };

  // Update a block
  const updateBlock = (idx, updated) => {
    const newContent = [...content];
    newContent[idx] = updated;
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titleUk || !form.titleEn) {
      alert('Заповніть заголовки');
      return;
    }
    // Build JSON payload
    const payload = {
      tagsUk: form.tagsUk,
      tagsEn: form.tagsEn,
      titleUk: form.titleUk,
      titleEn: form.titleEn,
      createdAt: new Date(form.createdAt).toISOString(),
      contentUk: content,
      contentEn: content,
    };
    postDataJson('news', payload, setShowAlert);
  };

  return (
    <main className="main">
      {showAlert && (
        <Alert
          message="Новина була успішно додана!"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="main__form container-lg mt-5 mb-5">
        <h1 className="admin-title mb-4">Додати новину</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Теги (укр, через коми)</label>
              <input type="text" className="form-control" placeholder="Допомога армії, Волонтерство" onChange={(e) => handleTags(e, 'tagsUk')} />
            </div>
            <div className="col">
              <label className="form-label">Теги (eng, через коми)</label>
              <input type="text" className="form-control" placeholder="ArmySupport, Volunteering" onChange={(e) => handleTags(e, 'tagsEn')} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Заголовок (укр)</label>
            <input type="text" className="form-control" onChange={(e) => setForm({ ...form, titleUk: e.target.value })} value={form.titleUk} />
          </div>
          <div className="mb-3">
            <label className="form-label">Заголовок (eng)</label>
            <input type="text" className="form-control" onChange={(e) => setForm({ ...form, titleEn: e.target.value })} value={form.titleEn} />
          </div>
          <div className="mb-3">
            <label className="form-label">Дата створення</label>
            <input type="datetime-local" className="form-control" onChange={(e) => setForm({ ...form, createdAt: e.target.value })} value={form.createdAt} />
          </div>

          <div className="mb-3">
            <h5>Контент</h5>
            {content.map((block, idx) => (
              <div key={idx} className="mb-4">
                {block.type === 'image' ? (
                  <>
                    <ImageInput
                      placeholder="Посилання на зображення"
                      image={block.url}
                      setImage={(url) => updateBlock(idx, { ...block, url, alt: '' })}
                    />
                  </>
                ) : (
                  <ParagraphEditor block={block} onChange={(upd) => updateBlock(idx, upd)} />
                )}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => setContent(content.filter((_, i) => i !== idx))}>
                  Видалити блок
                </button>
              </div>
            ))}
            <div className="btn-group">
              <button type="button" className="btn btn-secondary" style={{ "marginRight": "15px", "borderRadius": "7px" }} onClick={addImageBlock}>
                Новий блок зображення
              </button>
              <button type="button" className="btn btn-secondary" style={{ "marginRight": "15px", "borderRadius": "7px" }} onClick={addParagraphBlock}>
                Новий блок параграф
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Зберегти</button>
        </form>
      </div>
      <Bootstrap />
    </main>
  );
}