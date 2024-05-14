import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App";

test("renders Welcome to Nemo!", () => {
  render(<App />);
  const linkElement = screen.getByText("Welcome to Nemo!");
  expect(linkElement).toBeInTheDocument();
});
