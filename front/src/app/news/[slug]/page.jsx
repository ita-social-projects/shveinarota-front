"use client";
import "./style.css"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockNews } from '@lib/mockedData';
import Link from "next/link";
import { getData } from "api";
import { convertToId } from "@lib/utils";
import { useLang } from "$component/Context/LangContext";
import Image from "next/image";

const CurrNewsPage = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const [mediaLinks, setMediaLinks] = useState([]);

	const { lang } = useLang();

	const [currNews, setCurrNews] = useState(null);

	useEffect(() => {
		getData("medialinks/all", (data) => {
			const filtered = data.filter(link =>
				["телеграм", "telegram", "інстаграм", "instagram", "фейсбук", "facebook", "ютуб", "youtube"]
					.some(keyword => link.title.toLowerCase().includes(keyword))
			);
			setMediaLinks(filtered);
		});
	}, []);


	useEffect(() => {
		if (id) {
			const foundNews = mockNews.find(news => String(news.id) === id);
			setCurrNews(foundNews);
		}
	}, [id]);

	const formattedDate = new Date(currNews?.createdAt).toLocaleString("uk-UA", {
		dateStyle: "medium",
		timeStyle: "short"
	});

	return (
		<main className='curr-news-main'>
			{currNews && mediaLinks.length > 0 ? (
				<div className="curr-news-main__news news-curr">
					<div className="news-curr__container">
						<div className="news-curr__header">
							<Link href="/news" className="news-curr__back"><span>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z" />
								</svg>
							</span>
								До новин
							</Link>
							<h1 className="news-curr__title">{currNews.title}</h1>
							<div className="news-curr__date">{formattedDate}</div>
							<div className="news-curr__media">
								{mediaLinks.map(link =>
									<Link key={link.id} target="_blank" className="news-curr__link" href={link.url}>
										<Image
											src={'http://drive.google.com/uc?export=view&id=' + convertToId(link.path)}
											alt="logo"
											width={35}
											height={35}
											className="footer__icons"
										/>
									</Link>
								)}
							</div>
						</div>
						<div className="news-curr__body">
							{currNews.content.map((block, i) => {
								if (block.type === "paragraph") {
									return (
										<p className="news-curr__text" key={i}>
											{block.children.map((span, j) => {
												let style = {};
												if (span.bold) style.fontWeight = "bold";
												if (span.italic) style.fontStyle = "italic";
												return <span key={j} style={style}>{span.text} </span>;
											})}
										</p>
									);
								}
								if (block.type === "image") {
									return <img key={i} src={block.url} alt={block.alt} style={{ maxWidth: "100%", margin: "0px 0px 20px 0px" }} />;
								}
							})}
						</div>
					</div>

				</div>
			) : (
				<div className="error-text">Новина завантажується...</div>
			)}
		</main>
	);
};

export default CurrNewsPage;