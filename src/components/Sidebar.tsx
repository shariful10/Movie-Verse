"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/utils/const";
import Link from "next/link";

const Sidebar = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("");

	interface Igenre {
		id: string;
		name: string;
	}

	useEffect(() => {
		axios
			.get(
				`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
			)
			.then(({ data }) => {
				setGenres(data.genres);
				console.log("sidebar", data.genres);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (searchParams.get("genere")) {
			setSelectedGenre(searchParams.get("genere")!);
			return;
		}
		setSelectedGenre(params.id.toString());
	}, [params.id, searchParams]);

	return (
		<div className="bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#22222A] scrollbar-track-primary scroll-smooth hidden sm:block">
			<div className="flex flex-col gap-4 pt-4">
				<p className="font-semibold text-[18px]">Discover</p>
				<Link href={"/discover/now_playing"}>
					<p
						className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
							selectedGenre === "now_playing" ? "text-white" : ""
						}`}
					>
						Now Playing
					</p>
				</Link>
				<Link href={"/discover/top_rated"}>
					<p
						className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
							selectedGenre === "top_rated" ? "text-white" : ""
						}`}
					>
						Top Rated
					</p>
				</Link>
				<Link href={"/discover/popular"}>
					<p
						className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
							selectedGenre === "popular" ? "text-white" : ""
						}`}
					>
						Popular
					</p>
				</Link>
				<Link href={"/discover/upcoming"}>
					<p
						className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
							selectedGenre === "upcoming" ? "text-white" : ""
						}`}
					>
						Upcoming
					</p>
				</Link>
			</div>
			<div className="flex flex-col gap-4 pt-4">
				<p className="font-semibold text-[18px]">Genres</p>
				{genres.map((genre: Igenre) => (
					<Link
						key={genre.id}
						href={`/genres/${
							genre.id
						}?genre=${genre.name.toLowerCase()}`}
					>
						<p
							className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
								genre.name.toLowerCase() === selectedGenre
									? "font-semibold text-[18px]"
									: ""
							}`}
						>
							{genre.name}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
