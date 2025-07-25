"use client"

import { mockNews } from '@lib/mockedData';
import React, { useEffect, useRef, useState } from 'react';
import "./style.css"
import NewsPreview from './NewsPreviewItem';
import CalendarFilter from './CalendarFilter';
import { getPageCount, getPagesArray, getPaginatedNews } from '@lib/utils';
import NewsPagination from './NewsPagination';
import { getData } from 'api';

const NewsPage = () => {
	const [data, setData] = useState([]);
	const [date, setDate] = useState("");
	const [filteredNews, setFilteredNews] = useState([]);
	const [dateValue, setDateValue] = useState("Обрати дату");
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [currentTag, setCurrentTag] = useState("");

	const [filteredByDate, setFilteredByDate] = useState([]);
	const [filteredByTag, setFilteredByTag] = useState([]);


	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(0);

	const [isLoading, setIsLoading] = useState(true);


	const calendarRef = useRef(null);
	const buttonRef = useRef(null);

	const [tags, setTags] = useState([]);

	useEffect(() => {
		getData("news/tags", setTags);
	}, [])

	useEffect(() => {
		const fetchNews = async () => {
			setIsLoading(true);
			const result = await getPaginatedNews("uk", page, limit);
			setData(result.data);
			setFilteredNews(result.data);

			// Якщо бекенд повертає totalCount — розраховуємо кількість сторінок:
			if (result.total) {
				setTotalPages(getPageCount(result.total, limit));
			} else {
				setTotalPages(1); // fallback
			}

			setIsLoading(false);

		};

		fetchNews();
	}, [page, limit]);


	// useEffect(() => {
	// 	if (date) {
	// 		const formatted = new Date(date).toLocaleDateString('uk-UA');
	// 		setDateValue(formatted);
	// 		setIsCalendarOpen(false);
	// 		setCurrentTag("");

	// 		const filtered = data.filter(news => {
	// 			const newsDate = new Date(news.createdAt).toLocaleDateString('uk-UA');
	// 			return newsDate === formatted;
	// 		});
	// 		setFilteredByDate(filtered);
	// 	} else {
	// 		setDateValue("Обрати дату");
	// 		setFilteredByDate([]);
	// 		setIsCalendarOpen(false);
	// 	}
	// }, [date]);


	useEffect(() => {
		if (currentTag) {
			setDate("");

			const filtered = data.filter(news => news.tags[0] === currentTag);
			setFilteredByTag(filtered);
		} else {
			setFilteredByTag([]);
		}
	}, [currentTag, data]);

	const displayNews =
		date ? filteredByDate :
			currentTag ? filteredByTag :
				filteredNews;


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setIsCalendarOpen(false);
			}
		};

		if (isCalendarOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isCalendarOpen]);

	const handleDateChange = (newDate) => {
		setDate(newDate);
		setCurrentTag("");
	};

	return (
		<main className='news-main'>
			<div className="news-main__news news">
				<div className="news__container">
					<div className={isCalendarOpen ? "news__row calendar-active" : "news__row"}>
						<h1 className='news__title'>Новини</h1>
						<button
							className='news__subtitle'
							onClick={() => setIsCalendarOpen(prev => !prev)}
							ref={buttonRef}
						>
							{dateValue}
							<div>
								<img src="images/news/calendar.png" alt="calendar" />
							</div>
						</button>
						<div className="calendar-wrapper" ref={calendarRef}>
							<CalendarFilter onDateChange={handleDateChange} />
						</div>
					</div>

					<div className="news__body">
						<div className='news__tags'>
							{tags.map((el, i) =>
								<button
									key={el.id}
									onClick={() => {
										setCurrentTag(prev => (prev === el.nameUk ? "" : el.nameUk));
									}}
									value={el.nameUk}
									className={el.nameUk == currentTag ? 'news__tag tag-active' : 'news__tag'}
								>
									{el.nameUk}
								</button>
							)}
						</div>
						{isLoading
							? <div className='error-text'>Завантаження новин...</div>
							: displayNews.length > 0
								? <>
									<div className="news__list">
										{displayNews.map(el =>
											<NewsPreview key={el.id} element={el} content={el.content} />
										)}
									</div>
									<NewsPagination page={page} setPage={setPage} totalPages={totalPages} />
								</>
								: <div className='error-text'>Новин не знайдено</div>
						}
					</div>
				</div>
			</div>
		</main>
	);
};

export default NewsPage;
