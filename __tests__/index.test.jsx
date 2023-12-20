import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Login from "../src/pages/index";
 
test("submits the form when the login button is clicked", async () => {
    const { getByRole, findByText } = render(<Login />);
    const loginButton = getByRole("button", { name: "Login"});
    fireEvent.click(loginButton);
    expect(await findByText("Email cannot be empty")).toBeVisible();
  });