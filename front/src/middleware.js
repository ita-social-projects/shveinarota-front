import { NextResponse } from "next/server";

export function middleware(request) {
	const url = request.nextUrl;
	const cookies = request.cookies;
	let lang = cookies.get("lang")?.value;
	const user = 'logged';

	if (
		url.pathname.startsWith("/_next/") ||
		url.pathname.startsWith("/api/") ||
		url.pathname.startsWith("/favicon.ico") ||
		url.pathname.startsWith("/images/") ||
		url.pathname.startsWith("/auth") ||
		url.pathname.startsWith("/static/") ||
		url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf|mp4|webm|mp3|wav|ogg)$/)
	) {
		return NextResponse.next();
	}

	if (!lang) {
		const acceptLanguage = request.headers.get("accept-language") || "uk";
		lang = acceptLanguage.startsWith("en") ? "en" : "ua";

		const response = NextResponse.next();
		response.cookies.set("lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
		return response;
	}

	if (url.pathname.startsWith("/dashboard")) {
		if (!user) {
			return NextResponse.redirect(new URL("/auth", request.url));
		}
		return NextResponse.next();
	}

	const isEnglish = lang === "en";
	const isAlreadyEnglishRoute = url.pathname.startsWith("/en");

	const baseRoutes = ["/", "/guides", "/about", "/questions"];
	const shouldHaveEnPrefix = baseRoutes.some(route => url.pathname.startsWith(route));

	if (!isEnglish && isAlreadyEnglishRoute) {
		return NextResponse.redirect(new URL(url.pathname.replace(/^\/en/, ""), request.url));
	}

	if (isEnglish && shouldHaveEnPrefix && !isAlreadyEnglishRoute) {
		return NextResponse.redirect(new URL(`/en${url.pathname}`, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/:path*"],
};
