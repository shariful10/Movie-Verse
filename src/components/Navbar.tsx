"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setInput("");
		router.push(`/search/${input}?page=1`);
	};

	return (
		<div className="bg-primary">
			<div className="flex justify-between items-center py-4 px-2 md:px-10">
				<Link
					className="hidden md:block"
					href={"/discover/now_playing"}
				>
					<h2 className="text-[30px]">Movie Verse</h2>
				</Link>
				<form
					onSubmit={handleSubmit}
					className="space-x-2 hidden md:block"
				>
					<input
						className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor rounded-l-[5px]"
						type="text"
						value={input}
						placeholder="Search Movies..."
						onChange={(e) => setInput(e.target.value)}
					/>
				 	<button className="bg-secondary text-textColor py-2 px-4 hover:bg-textColor hover:text-white rounded-r-[5px]">Search</button>
				</form>
			</div>
		</div>
	);
};

export default Navbar;
