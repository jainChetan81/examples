import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "../components";

describe("Testing Form component here", () => {
	test("inputs should be initially empty", () => {
		render(<Form />);
		expect(screen.getByLabelText("Email")).toHaveValue("");
		expect(screen.getByLabelText("Password")).toHaveValue("");
		expect(screen.getByLabelText("Confirm Password")).toHaveValue("");

		expect(screen.getByLabelText("Check")).not.toBeChecked();
	});
	test("should be able to type an email", () => {
		render(<Form />);
		const emailInput = screen.getByRole("textbox", {
			name: /email/i,
		});
		userEvent.type(emailInput, "a@a.com");
		expect(emailInput).toHaveValue("a@a.com");
	});
	test("should be able to type a password", () => {
		render(<Form />);
		const passwordInput = screen.getByPlaceholderText("Password");
		userEvent.type(passwordInput, "abcd");
		expect(passwordInput).toHaveValue("abcd");
	});
});
