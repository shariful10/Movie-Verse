/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import Genres from "@/components/Genres";
import Footer from "@/components/Footer";
import { IoMdClose } from "react-icons/io";
import Loading from "@/components/Loading";
import { BsPlayFill } from "react-icons/bs";
import { API_KEY, BASE_IMG_URL } from "@/utils/const";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export interface Root {
	id: number;
	title: string;
	adult: boolean;
	budget: number;
	status: string;
	video: boolean;
	videos: Videos;
	genres: Genre[];
	imdb_id: string;
	revenue: number;
	runtime: number;
	tagline: string;
	overview: string;
	homepage: string;
	vote_count: number;
	popularity: number;
	poster_path: string;
	release_date: string;
	vote_avarage: number;
	backdrop_path: string;
	original_title: string;
	original_language: string;
	spoken_languages: SpokenLanguage[];
	production_companies: productionCompany[];
	production_countries: productionCountry[];
	belongs_to_collection: BelongsToCollection;
}

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface productionCompany {
	id: number;
	name: string;
	logo_path: string;
	origin_country: string;
}

export interface productionCountry {
	name: string;
	iso_3166_1: string;
}

export interface SpokenLanguage {
	name: string;
	iso_639_1: string;
	english_name: string;
}

export interface Videos {
	results: Result[];
}

export interface Result {
	id: string;
	key: string;
	name: string;
	site: string;
	size: string;
	type: string;
	official: boolean;
	iso_639_1: string;
	iso_3166_1: string;
	published_at: string;
}

const MovieDetails = () => {
	const router = useRouter();
	const params = useParams();
	const mainRef = useRef<HTMLDivElement>(null);

	const [movie, setMovie] = useState<Root>();
	const [trailer, setTrailer] = useState("");
	const [showPlayer, setShowPlayer] = useState(false);

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&append_to_response=videos`
			)
			.then((res) => {
				console.log(res.data);
				setMovie(res.data);
			});
	}, [params.id]);

	useEffect(() => {
		const trailerIndex = movie?.videos?.results?.findIndex(
			(element) => element.type === "Trailer"
		);

		const trailerURL = `https://www.youtube.com/watch?v=${
			movie?.videos?.results[trailerIndex!]
		}?.key`;

		setTrailer(trailerURL);
	}, [movie]);

	const startPlayer = () => {
		mainRef?.current?.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
		setShowPlayer(true);
	};

	return (
		<main
			ref={mainRef}
			className="bg-secondary p-8 max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222A] scroll-smooth relative scrollbar-track-primary"
		>
			{movie === null && <Loading />}
			<div
				onClick={router.back}
				className="text-textColor hover:text-white absolute right-0 top-0 m-2 cursor-pointer"
			>
				<IoMdClose size={27} />
			</div>
			<div className="flex justify-center items-center pt-4 md:pt-0">
				<div className="grid md:grid-cols-[300px,1fr] max-w-[1200px] gap-12">
					<div>
						<img
							src={`${BASE_IMG_URL}${movie?.poster_path}`}
							alt={movie?.title}
						/>
					</div>
					<div className="space-y-6 md:space-y-3 text-textColor">
						<div className="uppercase text-[26px] md:text-[34px] font-medium pr-4 text-white">
							{movie?.title}
						</div>
						<div className="flex gap-4 flex-wrap">
							{movie?.genres?.map((genre, index) => (
								<Genres
									key={genre.id}
									index={index}
									length={movie?.genres?.length}
									name={genre.name}
									id={genre.id}
								/>
							))}
						</div>
						<div className="flex flex-col md:flex-row gap-2 md:gap-6">
							<div>
								Language: {movie?.original_language?.toUpperCase()}
							</div>
							<div>Release: {movie?.release_date}</div>
							<div>Runtime: {movie?.runtime}</div>
							<div>Rating: {movie?.vote_avarage} ⭐</div>
						</div>
						<div className="pt-14 space-y-2 pr-4">
							<div>OVERVIEW:</div>
							<div>{movie?.overview}</div>
						</div>
						<div
							onClick={startPlayer}
							className="inline-block pt-6 cursor-pointer"
						>
							<div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#B4B4B4]">
								<BsPlayFill size={24} />
								Watch Trailer
							</div>
						</div>
					</div>
				</div>
			</div>
         {/* <==<<=== React Player ===>>==> */}
			<div className="pt-10">
				<Footer />
			</div>
		</main>
	);
};

export default MovieDetails;
