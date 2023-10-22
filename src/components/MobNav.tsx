import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { API_KEY, BASE_URL } from "@/utils/const";
import { useParams, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

interface PropsType {
	input: string;
	setInput: Dispatch<SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent) => void;
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
				setGenres(data.geners);
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
				<div className="space-x-4">
					<input
						className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor text-sm w-[180px]"
						type="text"
					/>
				</div>
			</form>
		</>
	);
};

export default MobNav;
