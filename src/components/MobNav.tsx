import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { API_KEY, BASE_URL } from "@/utils/const";
import { useParams, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Link from "next/link";

interface PropsType {
	input: string;
	setInput: Dispatch<SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent) => void;
}

interface Igenre {
	id: string;
	name: string;
}

const MobNav = ({ input, setInput, handleSubmit }: PropsType) => {
	const params = useParams();
	const searchParams = useSearchParams();
	const [genres, setGenres] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState("");

	useEffect(() => {
		axios
			.get(
				`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
			)
			.then(({ data }) => {
				setGenres(data.genres);
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
		<>
			<form
				onSubmit={handleSubmit}
				className="md:hidden flex justify-between w-full"
			>
				<div onClick={() => setIsOpen(true)}>
					<AiOutlineMenu size={30} />
				</div>
				<div className="space-x-1">
					<input
						type="text"
						value={input}
						placeholder="Search Movies..."
						onChange={(e) => setInput(e.target.value)}
						className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor text-sm w-[180px] rounded-l-[5px]"
					/>
					<button className="bg-secondary text-sm text-textColor py-2 px-4 hover:bg-textColor hover:text-white rounded-r-[5px]">
						Search
					</button>
				</div>
			</form>
			{/* <==<<=== Full Screen Nav ===>>==> */}
			<div
				className={`min-h-[100vh] max-h-[100vh] w-full bg-primary fixed left-0 top-0 z-10 overflow-scroll ${
					isOpen ? "block" : "hidden"
				}`}
			>
				<div className="sticky top-0 bg-primary py-4 w-full">
					<IoMdClose
						size={28}
						onClick={() => setIsOpen(false)}
						className="absolute top-0 right-0 m-2 mt-7"
					/>
					<Link
						href={"/discover/now_playing"}
						className="w-fit"
						onClick={() => setIsOpen(false)}
					>
						<div className="font-semibold text-[28px] text-center">
							MovieVerse
						</div>
					</Link>
				</div>
				<div className="px-4 pb-6">
					<div className="flex flex-col gap-4 pt-4">
						<p className="font-semibold text-[18px]">Discover</p>
						<Link
							href={"/discover/now_playing"}
							className="w-fit"
							onClick={() => setIsOpen(false)}
						>
							<p
								className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
									selectedGenre === "now_playing"
										? "text-white"
										: ""
								}`}
							>
								Now Playing
							</p>
						</Link>
						<Link
							href={"/discover/top_rated"}
							className="w-fit"
							onClick={() => setIsOpen(false)}
						>
							<p
								className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
									selectedGenre === "top_rated"
										? "text-white"
										: ""
								}`}
							>
								Top Rated
							</p>
						</Link>
						<Link
							href={"/discover/popular"}
							className="w-fit"
							onClick={() => setIsOpen(false)}
						>
							<p
								className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
									selectedGenre === "popular"
										? "text-white"
										: ""
								}`}
							>
								Popular
							</p>
						</Link>
						<Link
							href={"/discover/upcoming"}
							className="w-fit"
							onClick={() => setIsOpen(false)}
						>
							<p
								className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
									selectedGenre === "upcoming"
										? "text-white"
										: ""
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
								}?genre=${genre.name.toLocaleLowerCase()}`}
								className="w-fit"
								onClick={() => setIsOpen(false)}
							>
								<p
									className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${
										genre?.name?.toLowerCase() ===
										selectedGenre
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
			</div>
		</>
	);
};

export default MobNav;
