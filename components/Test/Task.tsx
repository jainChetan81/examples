import { Dispatch, FC, SetStateAction, useEffect } from "react";
type TASK = {
	name: string;
	time: number;
	completed: boolean;
	running: boolean;
};
type Props = {
	task: TASK;
	setTasks: Dispatch<SetStateAction<TASK[]>>;
	index: number;
	tasks: TASK[];
};
const Task: FC<Props> = ({ task, setTasks, index, tasks }) => {
	useEffect(() => {
		const interval = setInterval(() => {
			if (task.running && !task.completed) {
				const currentTask = { ...task };
				currentTask.time--;
				if (currentTask.time === 0) {
					currentTask.running = false;
					currentTask.completed = true;
				}
				setTasks((tasks) => {
					tasks[index] = currentTask;
					return [...tasks];
				});
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [task]);
	const updateRunningTasks = () => {
		const oldTasks = [...tasks];
		oldTasks[index].time--;
		oldTasks[index].running = !oldTasks[index].running;
		setTasks([...oldTasks]);
	};
	const updateCompletedTasks = () => {
		const oldTasks = [...tasks];
		oldTasks[index].time = 0;
		oldTasks[index].completed = !oldTasks[index].completed;
		setTasks([...oldTasks]);
	};
	const removeTask = () => {
		const oldTasks = [...tasks];
		oldTasks.splice(index, 1);
		setTasks([...oldTasks]);
	};

	return (
		<li className={`${task.completed ? "completed" : "incomplete"} ${task.running ? "running" : "paused"}`}>
			<span>{task.time}</span>
			<span>{task.name}</span>
			<div className="action_buttons">
				{!task.completed && (
					<>
						<button onClick={updateRunningTasks}>{task.running ? "Pause" : "Resume"}</button>
						<button onClick={updateCompletedTasks}>Complete</button>
					</>
				)}
				<button onClick={removeTask}>Remove</button>
			</div>
		</li>
	);
};

export default Task;
