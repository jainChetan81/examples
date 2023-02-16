import { useMemo, useState, type CSSProperties } from "react";
import { Layout } from "../../components";
import useFetch from "./useFetch";
type PRODUCT = {
	id: string;
	title: string;
	description: string;
	price: number;
	category: string;
};
const Ecommerce = () => {
	const { data, loading, error } = useFetch<PRODUCT[]>("https://dummyjson.com/products");
	const [searchTerm, setSearchTerm] = useState("");
	const filteredProducts = useMemo(
		() => (data ?? []).filter((p) => p.category.toLocaleLowerCase().trim().includes(searchTerm.toLocaleLowerCase().trim())),
		[data]
	);

	if (loading || data === null) return <div>Loading...</div>;

	return (
		<Layout title="test Aajtak">
			<div className="gallery" style={gridStyle}>
				{filteredProducts.map((product) => (
					<article key={product.id}>
						<h1>{product.title}</h1>
						<p>{product.description}</p>
						<p>{product.price}</p>
					</article>
				))}
			</div>
		</Layout>
	);
};

export default Ecommerce;

const gridStyle: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3,1fr)",
	gap: "10px"
};

const galleryStyle: CSSProperties = { display: "grid", gridTemplateRows: "repeat(3,1fr)", gap: "10px" };
