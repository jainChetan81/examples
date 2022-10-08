import { Layout } from "../components";

const Imagekit = () => {
	return (
		<Layout title="Imagekit optimization">
			<div className="container_image">
				<h1>Image Gallery</h1>
				<div className="gallery">
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
						<picture key={i}>
							<source
								type="image/webp"
								media="(max-width:1200px)"
								srcSet={`https://ik.imagekit.io/aqaseg5nkl6/tr:w-1200,h-1200/images/cover_image-${i}.jpg 1200w`}
							/>
							<source
								type="image/webp"
								media="(max-width:800px)"
								srcSet={`https://ik.imagekit.io/aqaseg5nkl6/tr:w-800,h-800/images/cover_image-${i}.jpg 800w`}
							/>
							<source
								type="image/webp"
								media="(max-width:400px)"
								srcSet={`https://ik.imagekit.io/aqaseg5nkl6/tr:w-400,h-400/images/cover_image-${i}.jpg 400w`}
							/>
							{/*   eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`https://ik.imagekit.io/aqaseg5nkl6/images/cover_image-${i}.jpg`}
								alt={`Cover for Image ${i} for Image Gallery`}
							/>
						</picture>
					))}
				</div>
			</div>
			<div className="popup">
				<img src="" alt="" className="popup__selected" />
			</div>
		</Layout>
	);
};

export default Imagekit;
