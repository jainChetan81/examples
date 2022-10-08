// Make a to-do application in which each task has a timer associated with it. Please make sure all of the below-listed points are followed:
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { Layout } from "../components";
import Task from "../components/Test/Task";
type TASK = {
	name: string;
	time: number;
	completed: boolean;
	running: boolean;
};
const Test: NextPage = () => {
	const [tasks, setTasks] = useState<TASK[]>([]);
	const [formData, setFormData] = useState({
		name: "",
		time: 5,
	});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTasks([
			...tasks,
			{
				name: formData.name,
				time: formData.time,
				completed: false,
				running: true,
			},
		]);
	};
	const updateRunningTasks = (pause: boolean) => {
		if (pause === undefined) return;
		const oldTasks = [...tasks];
		oldTasks.forEach((task) => {
			if (!task.completed) {
				task.running = pause;
			}
		});
		setTasks([...oldTasks]);
	};
	const completeTasks = () => {
		const oldTasks = [...tasks];
		oldTasks.forEach((task) => {
			if (!task.completed) {
				task.completed = true;
				task.running = false;
				task.time = 0;
			}
		});
		setTasks([...oldTasks]);
	};

	return (
		<Layout title="Todo App">
			<section className="tasks">
				<h2>Todo App</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						placeholder="Please type the Task..."
					/>
					<input
						type="number"
						name="time"
						placeholder="Please type remaining time"
						value={formData.time}
						onChange={handleChange}
						required
						min={5}
					/>
					<button type="submit">Submit</button>
				</form>
				<div className="overall_buttons">
					<button onClick={() => updateRunningTasks(false)}>Pause All</button>
					<button onClick={() => updateRunningTasks(true)}>Resume All</button>
					<button onClick={completeTasks}>Complete All</button>
					<button onClick={() => setTasks([])}>Remove All</button>
				</div>
				<ul className="tasks_container">
					{tasks.length > 0 && <h3>Tasks ({tasks.length})</h3>}
					{tasks.map((task, index) => (
						<Task key={index} task={task} tasks={tasks} setTasks={setTasks} index={index} />
					))}
				</ul>
			</section>
		</Layout>
	);
};

export default Test;
