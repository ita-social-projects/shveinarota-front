import { NextResponse } from "next/server";

export function middleware(request) {
	const url = request.nextUrl;
	const cookies = request.cookies;
	let lang = cookies.get("lang")?.value;
	const user = 'logged';

	// Якщо куки немає, вибираємо мову по налаштуванням браузера
	if (!lang) {
		const acceptLanguage = request.headers.get("accept-language") || "uk";
		lang = acceptLanguage.startsWith("en") ? "en" : "ua";

		// Установка кукі файлу з мовою
		const response = NextResponse.next();
		response.cookies.set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
		return response;
	}

	// Перевірка доступу до dashboard
	if (url.pathname.startsWith("/dashboard")) {
		if (!user) {
			return NextResponse.redirect(new URL("/auth", request.url));
		}
		return NextResponse.next();
	}

	const isEnglish = lang === "en";
	const isAlreadyEnglishRoute = url.pathname.startsWith("/en");

	const baseRoutes = ["/", "/guides", "/about", "/questions"];

	// Перенаправлення по мові
	if (!isEnglish && isAlreadyEnglishRoute) {
		return NextResponse.redirect(new URL(url.pathname.replace(/^\/en/, ""), request.url));
	}

	if (isEnglish && baseRoutes.includes(url.pathname)) {
		return NextResponse.redirect(new URL(`/en${url.pathname}`, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/:path*"],
};