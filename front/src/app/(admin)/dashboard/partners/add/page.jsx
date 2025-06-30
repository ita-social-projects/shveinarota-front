"use client";

import { useState } from "react";
import axios from "axios";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { postData } from "api";
import PhotoInput from "$component/dashboard/ImageInput/ImageInput";
import ImageInput from "$component/dashboard/ImageInput/ImageInput";

export default function ChangePage() {
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Будь ласка, оберіть файл");
      return;
    }

    const formData = new FormData();
    formData.append("path", file);
    formData.append("link", link);

    postData("partners", formData, setShowAlert)
  };

  return (
    <main className="main">
      {showAlert && (
        <Alert
          message="Партнер був доданий успішно!"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="main__form container-lg mt-5">
        <h1 className="form-title admin-title mb-4">Додати партнера</h1>
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
