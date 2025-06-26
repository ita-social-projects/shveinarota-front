import React from 'react';

const NewsPagination = ({ page, setPage, totalPages }) => {
	const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
	const maxVisible = 5;

	let start = Math.max(1, page - Math.floor(maxVisible / 2));
	let end = start + maxVisible - 1;

	if (end > totalPages) {
		end = totalPages;
		start = Math.max(1, end - maxVisible + 1);
	}

	const pagesToShow = [];
	for (let i = start; i <= end; i++) {
		pagesToShow.push(i);
	}

	return (
		<div className="news__pagination">
			{page > 1 && (
				<>
					<span onClick={() => setPage(1)}>&laquo;</span>
				</>
			)}

			{pagesToShow.map((p) => (
				<span
					key={p}
					onClick={() => {
						setPage(p);
						window.scrollTo({ top: 0 });
					}}
					className={page === p ? "pagination-current" : ""}
				>
					{p}
				</span>
			))}

			{page < totalPages && (
				<>
					<span onClick={() => setPage(totalPages)}>&raquo;</span>
				</>
			)}
		</div>
	);
};

export default NewsPagination;
