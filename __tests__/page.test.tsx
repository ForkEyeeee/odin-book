import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const text = screen.getByText("Get started by editing");
    expect(text).toBeInTheDocument();
  });
});
