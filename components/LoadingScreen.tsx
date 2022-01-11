import { Balls } from "../styles/Balls";
import { Screen } from "./Screen";

const LoadingScreen = () => {
	return (
		<Screen>
			<Balls>
				<div className="ball one"></div>
				<div className="ball two"></div>
				<div className="ball three"></div>
			</Balls>
		</Screen>
	);
};

export default LoadingScreen;
