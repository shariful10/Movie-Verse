import { useParams, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

interface PropsType {
	input: string;
	setInput: Dispatch<SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent) => void;
}

const MobNav = ({ input, setInput, handleSubmit }: PropsType) => {
  const params = useParams();
  const searchParams = useSearchParams()
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {}, []);

	return <div>MobNav</div>;
};

export default MobNav;
