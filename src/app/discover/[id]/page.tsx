import React, { useState } from "react";

export interface Imovie {
	id: string;
	title: string;
	poster_path: string;
	release_date: string;
}

const Discover = () => {
	const [title, setTitle] = useState("");
	const [movies, setMovies] = useState([]);
	const [discover, setDiscover] = useState("");
	const [totalPage, setTotalPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	return <div>Discover</div>;
};

export default Discover;
