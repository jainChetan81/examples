import { Doughnut } from "react-chartjs-2";
import { Layout } from "../components";
import "chart.js/auto";

const data = {
	labels: ["Red", "Green", "Yellow", "Green", "Purple", "Orange"],
	datasets: [
		{
			data: [300, 50, 100, 90, 150, 200],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
			borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
			borderWidth: 1,
		},
	],
};

const reactCharts = () => {
	return (
		<Layout title="React Charts">
			<h1 style={{ textAlign: "center" }}>Doughnut Chart</h1>
			<div style={{ width: "600px", marginInline: "auto" }}>
				<Doughnut data={data} />
			</div>
		</Layout>
	);
};

export default reactCharts;
