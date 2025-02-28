"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "$style/globals.css"

const AuthCallback = () => {
	const router = useRouter();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const logged = urlParams.get("logged");

		if (logged) {
			document.cookie = `logged_in=${process.env.LOGGED_IN_SECRET}; path=/; max-age=3600; Secure; SameSite=Lax`;

			router.replace("/dashboard");
		} else {
			router.replace("/auth");
		}
	}, [router]);

	return <div className="main-callback">
		<p style={{display: "block", padding: "40px 15px 40px 15px", maxWidth: "1200px", margin: "0px auto", fontSize: "24px"}}>Триває обробка авторизації...</p>
	</div>;
};

export default AuthCallback;