import { useState } from "react";
import type { FC, FormEvent } from "react";
const Form: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [checked, setChecked] = useState<boolean>(false);

	const [error, setError] = useState<string>("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e.target);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email</label>
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
				/>
				<small id="emailHelp" className="form-text text-muted">
					Well never share your email with anyone else.
				</small>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>
				<input
					type="password"
					name="password"
					className="form-control"
					id="exampleInputPassword1"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword2">Confirm Password</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword2"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			<div className="form-group form-check">
				<input
					type="checkbox"
					className="form-check-input"
					id="exampleCheck1"
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				/>
				<label className="form-check-label" htmlFor="exampleCheck1">
					Check
				</label>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default Form;
