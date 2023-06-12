import type { Dispatch, FC, SetStateAction } from "react";
type Props = {
	setPage: Dispatch<SetStateAction<"planets" | "people">>;
};
const Navbar: FC<Props> = ({ setPage }) => {
	return (
		<nav>
			<button onClick={() => setPage("planets")}>Planets</button>
			<button onClick={() => setPage("people")}>People</button>
		</nav>
	);
};

export default Navbar;
