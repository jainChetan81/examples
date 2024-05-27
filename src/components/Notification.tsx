const notify = async () => {
	try {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const notification = new Notification("Vanilla Notification", {
				body: "This is a vanilla notification",
				data: {
					url: "https://www.google.com"
				},
				icon: "https://doodleipsum.com/100x100/flat?i=0eb04614d2ff66e0c288922e95511051"
			});
			notification.addEventListener("close", () => console.log("closed"));
		}
	} catch (error) {
		console.error(error);
	}
};
export const NotifyButton = () => {
	return (
		<button className="block ml-auto border-2 border-gray-600 my-10 " onClick={notify}>
			push a notification
		</button>
	);
};
