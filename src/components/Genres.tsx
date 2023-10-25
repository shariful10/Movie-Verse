import Link from "next/link";

interface Igenres {
	id: number;
	name: string;
	index: number;
	length: number;
}

const Genres = ({ index, name, length, id }: Igenres) => {
	return (
		<Link href={`/genres/${id}?genre=${name.toLowerCase()}`}>
			<div className="flex gap-4 text-textColor hover:text-white">
				<div>{name}</div>
				<div className="text-textColor">
					{index + 1 !== length ? "/" : ""}
				</div>
			</div>
		</Link>
	);
};

export default Genres;
