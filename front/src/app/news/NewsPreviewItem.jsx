import React, { useEffect } from 'react';
import "./NewsPreviewItem.css"
import Link from 'next/link';
import Image from 'next/image';
import { convertToId, transliterate } from '@lib/utils';

const NewsPreviewItem = ({ content, element }) => {
	const firstParagraph = content.find(item => item.type === "paragraph");
	const firstImage = content.find(item => item.type === "image");

	console.log(firstImage);
	console.log(firstParagraph);
	console.log(convertToId(firstImage.url));

	const maxTextLength = 189;

	function slicedText(firstParagraph) {
		const text = firstParagraph.children.map(el => el.text).join(' ');

		if (text.length > maxTextLength) {
			return text.slice(0, maxTextLength).replace(/\s+\S*$/, '') + '...';
		}
	}

	const formattedDate = new Date(element.createdAt).toLocaleString("uk-UA", {
		dateStyle: "medium",
		timeStyle: "short"
	});



	return (
		<Link href={{pathname: `/news/${transliterate(element.title.slice(0, 40))}`, query: { id: element.id }}} className="news__item item-news">
			{firstImage &&
				<div className="item-news__image">
					<Image width={1920} height={1080} alt={firstImage.alt} src={'http://drive.google.com/uc?export=view&id=' + convertToId(firstImage.url)} />
				</div>
			}
			<div className="item-news__body">
				<div className='item-news__group'>
					<div className="item-news__title">{element.title}</div>
					{firstParagraph && (
						<p className='item-news__text'>
							{slicedText(firstParagraph)}
						</p>
					)}
				</div>
				<div className="item-news__date">
					{formattedDate}
				</div>
			</div>
		</Link>
	);
};


export default NewsPreviewItem;