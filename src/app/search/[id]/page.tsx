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

		switch (id) {
			case "now_playing":
				setTitle("Now Playing Movies");
				break;
			case "top_rated":
				setTitle("Top Rated Movies");
				break;
			case "popular":
				setTitle("Popular Movies");
				break;
			case "upcoming":
				setTitle("Upcoming Movies");
				break;
			default:
				setTitle("");
				break;
		}
		setDiscover(id);
		axios
			.get(`${BASE_URL}/discover/movie`, {
				params: {
					api_key: API_KEY,
					with_genres: id,
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
		router.push(
			`/genres/${params.id}?genre=${searchParams.get("genre")}&${page}`
		);
	};

	return <div>Search</div>;
};

export default Search;
