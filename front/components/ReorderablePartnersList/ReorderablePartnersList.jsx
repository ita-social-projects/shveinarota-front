'use client';

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { convertToId } from "@lib/utils";
import DatabaseItem from "$component/dashboard/DatabaseItem/DatabaseItem";

function SortablePartnerItem({ id, path, link, setSelectedId, onDelete }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="partner-row db_item list-group-item d-flex align-items-center gap-3"
			{...attributes}
			{...listeners}
		>
			<Image
				src={`http://drive.google.com/uc?export=view&id=${convertToId(path)}`}
				width={75}
				height={75}
				alt="partner"
			/>
			<DatabaseItem
				id={id}
				title="Партнер"
				link={link}
				setSelectedId={setSelectedId}
			/>
		</div>
	);
}

export default function ReorderablePartnersList({ partners, setPartners, setSelectedId }) {
	const [showAlert, setShowAlert] = useState(false);

	const handleDragEnd = async (event) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = partners.findIndex((p) => p.id === active.id);
			const newIndex = partners.findIndex((p) => p.id === over.id);
			const newOrder = arrayMove(partners, oldIndex, newIndex);
			setPartners(newOrder);

			try {
				await axios.patch(`${process.env.BACK_URL}partners/reorder`, {
					ids: newOrder.map((p) => p.id),
				}, { withCredentials: true });
				setShowAlert(true);
			} catch (error) {
				console.error("Reorder failed:", error);
				alert("Не вдалося зберегти порядок.");
			}
		}
	};

	return (
		<>
			{showAlert && (
				<div className="alert alert-success alert-dismissible fade show" role="alert">
					Порядок оновлено!
					<button type="button" className="btn-close" onClick={() => setShowAlert(false)} />
				</div>
			)}
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={partners.map(p => p.id)} strategy={verticalListSortingStrategy}>
					<div className="list-group">
						{partners.map((partner) => (
							<SortablePartnerItem
								key={partner.id}
								id={partner.id}
								path={partner.path}
								link={`/dashboard/partners/add/${partner.id}`}
								setSelectedId={setSelectedId}
								onDelete={() => { }}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</>
	);
}
