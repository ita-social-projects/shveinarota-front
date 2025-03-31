"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "$style/bootstrap.min.css";
import "$style/admin/Admin.css";
import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import Alert from "$component/dashboard/Alert/Alert";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);

		try {
			await axios.put(process.env.BACK_URL_IMG + "auth", {
				username: username,
				password: password
			}, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true
			});
			
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 3000);
		} catch (error) {
			console.error("Помилка при відправці даних:", error);
			alert("Помилка при відправці даних.");
		}
	};

	return (
		<main className="main">
			{showAlert && (
				<Alert
					message="Користувач успішно змінений!"
					onClose={() => setShowAlert(false)}
				/>
			)}
			<div className="main__form container-lg mt-5">
				<h1 className="form-title admin-title mb-4">Змінити користувача</h1>
				<form className="form needs-validation" onSubmit={handleSubmit}>
					<div className="input-group mb-3">
						<span className="input-group-text" id="inputGroup-sizing-default">Ім'я користувача:</span>
						<input
							required
							type="text"
							className="form-control"
							aria-label="Sizing example input"
							aria-describedby="inputGroup-sizing-default"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="input-group mb-3 password_input">
						<label className="settings__label" htmlFor="password">Пароль:</label>
						<div className="settings-password-wrapper">
							<input
								className="settings__input"
								type={showPassword ? 'text' : 'password'}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Введіть пароль"
							/>
							<button
								type="button"
								className="settings-toggle-password"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
			<Bootstrap />
		</main>
	);
}
