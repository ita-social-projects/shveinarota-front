'use client';

import dynamic from 'next/dynamic';
const Bootstrap = dynamic(() => import('$component/guides/Bootstrap/Bootstrap'), { ssr: false });
import '$style/bootstrap.min.css'
import "$style/admin/Admin.css"
import Link from "next/link";
import DatabaseItem from "$component/dashboard/DatabaseItem/DatabaseItem";
import { useEffect, useRef, useState } from "react";
import { getData } from 'api';
import axios from 'axios';
import { getPaginatedNews } from '@lib/utils';


export default function CardsPage() {
	const [news, setNews] = useState([]);
	const [selectedCardId, setSelectedCardId] = useState(null);

	useEffect(() => {
		const fetchNews = async () => {
			const result = await getPaginatedNews("uk", 1, 100);
			setNews(result.data);
		};

		fetchNews();
	}, []);


	async function deleteDataById(type, id, setData) {
		try {
			await axios.delete(`${process.env.BACK_URL}${type}/${id}`, {
				withCredentials: true
			});

			setData((prevData) => ({
				...prevData,
				data: prevData.data.filter((item) => item.id !== id)
			}));
		} catch (error) {
			console.error(`Помилка при видаленні елемента з id ${id}:`, error);
			alert("Помилка при видаленні.");
		}
	}


	return (
		<main className="main">
			<div className="modal fade" id="deleteApprove" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Підтвердження дії</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							Новина буде повністю видалена!
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Відмінити</button>
							<button
								type="button"
								data-bs-dismiss="modal"
								onClick={() => {
									if (selectedCardId) {
										deleteDataById(`news`, selectedCardId, setNews);
									}
								}}
								className="btn btn-outline-danger">
								Видалити
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="main__items items container-md mt-5">
				<div className="items__header mb-4">
					<h1 className="admin-title">Новини ({news != undefined ? news.length : "-"})</h1>
					<Link href="/dashboard/news/add" type="button" className="btn btn-success">
						<span className="_plus">+</span> Додати
					</Link>
				</div>
				<div className="list-group">
					{news != undefined
						? <>
							{news.map((item, index) =>
								<DatabaseItem setSelectedId={setSelectedCardId} key={item.id} title={`Новина (${item.title})`} link={`/dashboard/news/add/${item.id}`} id={item.id} />)}
						</>
						: <div>Новини завантажуються</div>
					}

				</div>
			</div>
			<Bootstrap />
		</main>
	);
}