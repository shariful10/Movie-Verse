"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/utils/const";

export interface Imovie {
	id: string;
	title: string;
	poster_path: string;
	release_date: string;
}

const Discover = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();

	const [title, setTitle] = useState("");
	const [movies, setMovies] = useState([]);
	const [discover, setDiscover] = useState("");
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

		setDiscover(id);

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
		axios
			.get(`${BASE_URL}/movie/${id}`, {
				params: {
					api_key: API_KEY,
					page,
				},
			})
			.then((res) => {
            console.log("res", res.data);
				setMovies(res.data.results);
				setCurrentPage(res.data.page);
				setTotalPage(res.data.total_page);
			})
			.catch((err) => console.log(err));
	}, [params.id, searchParams]);

   const handlePageChange = (button: string) => {
      let page = "";
      if (button === "prev") {
         page = `page=${currentPage - 1}`
      } else {
         page = `page=${currentPage + 1}`
      }
      router.push(`/discover/${discover}${page}`)
   };

	return <div>Discover Now</div>;
};

export default Discover;
