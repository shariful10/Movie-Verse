/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";
import React, { useState } from "react";
import CardSkeleton from "./CardSkeleton";
import { BASE_IMG_URL } from "@/utils/const";

interface PropsType {
	id: string;
	img: string;
	title: string;
	releaseDate: string;
}

const Card = ({ id, img, title, releaseDate }: PropsType) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	return (
		<div className="group bg-primary h-[450px] md:h-[335px] w-full">
			{!loaded && !error && <CardSkeleton />}
			{error && <CardSkeleton error />}
			<Link
				href={`/details/${id}`}
				className={`${!loaded && error && "hidden"}`}
			>
				<div className="relative">
					<img
						src={`${BASE_IMG_URL}${img}`}
						onLoad={() => setLoaded(true)}
						onError={() => setError(true)}
						alt="Movie Poster"
					/>
               <div className="absolute bg-primary w-full bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100">
                  {title}
                  <p className="">{releaseDate}</p>
               </div>
				</div>
			</Link>
		</div>
	);
};

export default Card;
