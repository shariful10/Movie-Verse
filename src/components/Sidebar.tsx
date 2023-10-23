"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/utils/const";

const Sidebar = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState("");

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
				console.log(data.genres);
			})
			.catch((err) => console.log(err));
	}, []);

	return <div>Sidebar</div>;
};

export default Sidebar;
