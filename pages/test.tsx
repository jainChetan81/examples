// Make a to-do application in which each task has a timer associated with it. Please make sure all of the below-listed points are followed:
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { Layout } from "../components";
import Task from "../components/Test/Task";

// 1. Create two text fields to input a task name and time (in seconds, minimum 5 seconds) and a button to create the task.

// 2. All tasks should be shown in a list view. Each list item should show the task name, time remaining in seconds (i.e., countdown), and a button. The button can be used to pause or resume the timer - i.e., when the timer is running it will pause the task and vice versa. This button should be removed from the UI once the task is completed. A task is considered completed when the countdown reaches zero.
// 3. List items for tasks that are completed should have a light green color, items that are paused should have a light yellow color and those that are running should have a light blue color.

// 4. User should be able to manually complete a task & manually remove a task from the list. Buttons for both can be added to the list item for the task.

// 5. Once a task is created timer countdown should begin automatically
// 6. On top of the list view there will be two buttons to pause and resume the tasks in bulk. These buttons should not affect the tasks that are completed.

// 7. You can use any state management technique.

// 8. Bonus: a) there will be bonus points for clean UI and app structure. b) Short tasks by remaining time.
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
		<Layout title="Todo App | Test">
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
