import AuthPage from "./AuthPage";

export const metadata = {
	title: "Вхід для адміністрації | Швейна рота",
	robots: {
		index: false,
		follow: false,
	},
};

export default function GuidesPage() {
	return <AuthPage />;
}