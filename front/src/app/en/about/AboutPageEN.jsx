"use client";

import AboutSection from "$component/about/About_section/About";
import TeamSection from "$component/about/Team_section/Team";

export default function AboutPage() {
	return (
		<main className="main">
			<AboutSection />
			<TeamSection />
		</main>
	);
}
