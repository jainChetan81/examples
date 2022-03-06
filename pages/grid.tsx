import { Layout } from "../components";

const Grid = () => {
	return (
		<Layout title="Simple Grid Fireship">
			<h1>Photo Gallery Grid</h1>
			<div className="photo-grid">
				<div
					className="card card-tall card-wide"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
						)`,
					}}
				>
					1
				</div>
				<div
					className="card card-tall"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583585635793-0e1894c169bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=913&q=80"
						)`,
					}}
				>
					2
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583531172005-814191b8b6c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
						)`,
					}}
				>
					3
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583426573939-97d09302d76a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
						)`,
					}}
				>
					4
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583532452513-a02186582ccd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
						)`,
					}}
				>
					5
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583445013765-46c20c4a6772?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
						)`,
					}}
				>
					6
				</div>
				<div
					className="card card-wide"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80"
						)`,
					}}
				>
					7
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583483425010-c566431a7710?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
						)`,
					}}
				>
					8
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583500557349-fb5238f8d946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
						)`,
					}}
				>
					9
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583468323330-9032ad490fed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
						)`,
					}}
				>
					10
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583425423320-2386622cd2e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1980&q=80"
						)`,
					}}
				>
					11
				</div>
				<div
					className="card"
					style={{
						backgroundImage: `url(
							"https://images.unsplash.com/photo-1583518257225-f9a8081f6a84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
						)`,
					}}
				>
					12
				</div>
			</div>
		</Layout>
	);
};

export default Grid;
