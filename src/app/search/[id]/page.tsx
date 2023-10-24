/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { Imovie } from "@/app/discover/[id]/page";
import { API_KEY, BASE_URL } from "@/utils/const";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();

	const [title, setTitle] = useState("");
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		mainRef?.current?.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
		const id = params.id.toString();
		const page = searchParams.get("page");

		setSearch(id);
		setTitle(`${id} Movies`);

		axios
			.get(`${BASE_URL}/search/movie`, {
				params: {
					api_key: API_KEY,
					query: id,
					page,
				},
			})
			.then((res) => {
				setMovies(res.data.results);
				setCurrentPage(res.data.page);
				setTotalPage(res.data.total_pages);
			})
			.catch((err) => console.log(err));
	}, [params.id, searchParams.get("page")]);

	const handlePageChange = (button: string) => {
		let page = "";
		if (button === "prev") {
			page = `page=${currentPage - 1}`;
		} else {
			page = `page=${currentPage + 1}`;
		}
		router.push(`/search/${search}?${page}`);
	};

	return (
		<main
			ref={mainRef}
			className="bg-secondary p-8 max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222A] scroll-smooth relative scrollbar-track-primary"
		>
			<h2 className="text-2xl tracking-[2px]">{title}</h2>
			{movies.length === 0 && <Loading />}
			<div className="movie__grid grid gap-8 place-items-center mt-8">
				{movies.map((movie: Imovie) => (
					<Card
						key={movie.id}
						id={movie.id}
						title={movie.title}
						img={movie.poster_path}
						releaseDate={movie.release_date}
					/>
				))}
			</div>
			<div className="flex justify-center gap-16 py-6 pt-16">
				<button
					onClick={() => handlePageChange("prev")}
					className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
						currentPage === 1 && "hidden"
					}`}
				>
					Prev
				</button>
				<button
					onClick={() => handlePageChange("next")}
					className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
						currentPage === totalPage && "hidden"
					}`}
				>
					Next
				</button>
			</div>
			<div className="pt-10">
				<Footer />
			</div>
		</main>
	);
};

export default Search;
