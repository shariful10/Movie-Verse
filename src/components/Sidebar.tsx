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
				console.log("sidebar", data.genres);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (searchParams.get("genre")) {
			setSelectedGenres(searchParams.get("genre")?.toString()!);
			return;
		}
	}, [params.id, searchParams]);

	return <div className="bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thumb-[#22222A] scrollbar-track-primary hidden sm:block">
		<div className="flex flex-col gap-4 pt-4">
			<p className="font-semibold text-[18px]">Discover</p>
		</div>
	</div>;
};

export default Sidebar;
