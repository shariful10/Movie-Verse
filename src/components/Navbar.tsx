import { useRouter } from "next/router";
import React, { useState } from "react";

const Navbar = () => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return <div>Navbar</div>;
};

export default Navbar;
