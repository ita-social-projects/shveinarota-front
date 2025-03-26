import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "./MediaBlock.css";
import { useLang } from "$component/Context/LangContext";
import { useEffect, useState } from "react";
import { getData } from "api";

const MediaBlock = () => {

	const { lang } = useLang();
	const [isMobileView, setIsMobileView] = useState(false);
	const [media, setMedia] = useState([]);

	const getYoutubeThumbnail = (url) => {
		const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|.+&v=))([^&?/]+)/;
		const match = url.match(regex);
		return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
	};

	useEffect(() => {
		getData("plots/all", setMedia);
	}, []);

	useEffect(() => {
		if (window != undefined) {
			const checkViewport = () => {
				const isMobile = window.innerWidth <= 992;
				setIsMobileView((prev) => prev !== isMobile ? isMobile : prev);
			};

			window.addEventListener("resize", checkViewport);
			checkViewport();

			return () => window.removeEventListener("resize", checkViewport);
		}
	}, []);

	return (
		<div className="main__media media">
			<div className="media-background">
				<Swiper
					modules={[Pagination, Navigation]}
					navigation={{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}}
					loop={true}
					allowTouchMove={false}
					pagination={{
						el: ".media-pagination",
						type: "bullets",
						clickable: true,
						bulletClass: "swiper-bullet",
						bulletActiveClass: "bullet-active",
					}}
				>
					{media.map((item, index) => (
						<SwiperSlide key={index} className="media-background__slide">
							<div className="media__background story__background">
								<Image src={getYoutubeThumbnail(item.url)} alt="media image" width={1920} height={1080} className="media-img" />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="media__container">
				<div className="media__title _main-title">{lang == "ua" ? "Медіа про нас" : "Media about us"}</div>
				<Swiper
					key={isMobileView ? "mobile" : "desktop"}
					modules={[Pagination, Navigation, EffectCoverflow]}
					navigation={{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					}}
					effect="coverflow"
					centeredSlides={true}
					loop={true}
					pagination={{
						el: ".media-pagination",
						type: "bullets",
						clickable: true,
						bulletClass: "swiper-bullet",
						bulletActiveClass: "bullet-active",
					}}
					breakpoints={{
						992: {
							effect: "coverflow",
							slidesPerView: 2,
							coverflowEffect: {
								rotate: 2,
								stretch: 0,
								depth: 250,
								modifier: 1,
								slideShadows: true,
							}
						},
						0: {
							effect: "slide",
							slidesPerView: 1,
							centeredSlides: false,
							spaceBetween: 10
						},
					}}
				>
					{media.map((item, index) => (
						<SwiperSlide key={index} className="media__slide">
							<Link href={item.url} target="_blank" className="media__story story">
								<div className="story__background">
									<Image src={getYoutubeThumbnail(item.url)} alt="media image" width={1920} height={1080} className="story-img" />
								</div>
								<div className="story__body">
									<div className="story__title">{item.title}</div>
									<div className="story__logo">
										<Image src={'http://drive.google.com/uc?export=view&id=' + item.path} alt="logo" width={48} height={48} className="story-logo _round" />
										{item.title_en}
									</div>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
				{/* Кнопки слайдера */}
				<div className="swiper-buttons__container">
					<div className="swiper-button-prev">
						<div className="next-img">
							<Image
								src="/images/swiper/arrow-back.png"
								height={40}
								width={29}
								alt="icon-prev"
							/>
						</div>
					</div>
					<div className="swiper-button-next">
						<Image
							src="/images/swiper/arrow-forward.png"
							height={40}
							width={29}
							alt="icon-next"
						/>
					</div>
				</div>
				<div className="swiper-pagination media-pagination"></div>
			</div>
		</div>
	);
};

export default MediaBlock;
