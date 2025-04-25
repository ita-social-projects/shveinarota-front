"use client";

import AboutSectionEn from "$component/about/About_section_en/About";
import TeamSection from "$component/about/Team_section/Team";

export default function AboutPage() {
	return (
		<main className="main">
			<AboutSectionEn />
			<TeamSection />
		</main>
	);
}
