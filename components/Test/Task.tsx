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
				const oldTasks = [...tasks];
				oldTasks[index].time--;
				if (oldTasks[index].time === 0) {
					oldTasks[index].running = false;
					oldTasks[index].completed = true;
				}
				console.log(oldTasks);
				setTasks([...oldTasks]);
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
		console.log(oldTasks);
		setTasks([...oldTasks]);
	};

	return (
		<li className={`${task.completed ? "completed" : "incomplete"} ${task.running ? "paused" : "running"}`}>
			<span>{task.time}</span>
			<span>{task.name}</span>
			{!task.completed && (
				<div className="action_buttons">
					<button onClick={updateRunningTasks}>{task.running ? "Pause" : "Resume"}</button>
				</div>
			)}
		</li>
	);
};

export default Task;
