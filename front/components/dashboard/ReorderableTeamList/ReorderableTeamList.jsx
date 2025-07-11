"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

function SortableTeamItem({ id, name, link, onDelete, setSelectedId }) {
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
			className="db_item list-group-item d-flex justify-content-between align-items-center"
			{...attributes}
			{...listeners}
		>
			<Link href={link}>{`Член команди (${name})`}</Link>
			<div className="list-group-item__block d-flex align-items-center gap-3">
				<Link href={link} className="btn btn-outline-secondary">
					<Image src="/images/admin/change.svg" alt="icon" width={26} height={26} />
					Змінити
				</Link>
				<button
					onClick={() => {
						setSelectedId(id);
						onDelete();
					}}
					data-bs-toggle="modal"
					data-bs-target="#deleteApprove"
					type="button"
					className="btn btn-outline-danger"
				>
					Видалити
				</button>
			</div>
		</div>
	);
}

export default function ReorderableTeamList({ members, setMembers, setSelectedId }) {
	const [showAlert, setShowAlert] = useState(false);

	const handleDragEnd = async (event) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = members.findIndex((m) => m.id === active.id);
			const newIndex = members.findIndex((m) => m.id === over.id);
			const newOrder = arrayMove(members, oldIndex, newIndex);
			setMembers(newOrder);

			try {
				await axios.patch(`${process.env.BACK_URL}teams/reorder`, {
					ids: newOrder.map((m) => m.id),
				}, { withCredentials: true });
				setShowAlert(true);
			} catch (e) {
				console.error("Помилка reorder:", e);
				alert("Не вдалося зберегти порядок");
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
				<SortableContext
					items={members.map((m) => m.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="list-group">
						{members.map((member) => (
							<SortableTeamItem
								key={member.id}
								id={member.id}
								name={member.name}
								link={`/dashboard/team/add/${member.id}`}
								onDelete={() => { }} // видалення лишаємо як є
								setSelectedId={setSelectedId}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</>
	);
}
