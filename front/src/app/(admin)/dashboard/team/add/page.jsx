"use client";

import { useState } from "react";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { postData } from "api";
import FileInput from "$component/dashboard/FileInput/FileInput";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";

export default function ChangePage() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [name_en, setNameEn] = useState("");
  const [status_en, setStatusEn] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Будь ласка, оберіть файл");
      return;
    }

    if (!name || !status) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }

    const formData = new FormData();
    formData.append("path", file);
    formData.append("name", name);
    formData.append("name_en", name);
    formData.append("status", status);
    formData.append("status_en", status);

    postData("teams", formData, setShowAlert)
  };


  return (
    <main className="main">
      {showAlert && (
        <Alert
          message="Член команди був успішно доданий!"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="main__form container-lg mt-5">
        <h1 className="form-title admin-title mb-4">Додати члена команди</h1>
        <form className="form needs-validation" onSubmit={handleSubmit}>
          <div className="ua">
            <ImageInput image={file} setImage={setFile}/>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">Ім'я:</span>
              <input
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">Посада:</span>
              <input
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
