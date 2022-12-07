import React from "react";
import { trpc } from "../../utils/trpc";

const Forms = () => {
	const { data, isLoading } = trpc.forms.getAllForms.useQuery();
	if (isLoading) return <div>Loading...</div>;
	return (
		<div>
			{data?.map((form) => (
				<div className="form" key={form.id}>
					<h1>
						<strong>Title: </strong>
						{form.formTitle}
					</h1>
					<p>
						<strong>Description: </strong>
						{form.formDescription}
					</p>
					<p>
						<strong>Total Questions: </strong>
						{form.formSections[0]?._count.questions}
					</p>
					<p>
						<strong>Total Sections: </strong>
						{form._count.formSections}
					</p>
				</div>
			))}
		</div>
	);
};

export default Forms;
