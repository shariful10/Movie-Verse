import { useRouter } from "next/router";
import React, { useState } from "react";

const Navbar = () => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setInput("");
		router.push(`/search/${input}?page=1`);
	};

	return <div>Navbar</div>;
};

export default Navbar;
