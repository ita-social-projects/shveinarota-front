import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl;
  const cookies = request.cookies;
  const lang = cookies.get("lang")?.value || "ua"; // Проверка на язык
  const isLoggedIn = cookies.get("logged_in")?.value === process.env.LOGGED_IN_SECRET;

  // Пропускаем системные файлы и маршруты авторизации
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

  // Защита /dashboard и вложенных маршрутов
  if (url.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Логика редиректов для языков (оставляем как есть)
  const isEnglish = lang === "en";
  const isAlreadyEnglishRoute = url.pathname.startsWith("/en");
  const baseRoutes = ["/", "/guides", "/about", "/questions"];
  const shouldHaveEnPrefix = baseRoutes.some((route) => url.pathname.startsWith(route)) && !url.pathname.startsWith("/dashboard");

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