import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App";
import NodeContainer from "../../components/NodeContainer";

test("renders Welcome to Nemo!", () => {
  render(<App />);
  const linkElement = screen.getByText("Welcome to Nemo!");
  expect(linkElement).toBeInTheDocument();
});

test("renders What Is Nemo?", () => {
  render(<App />);

  //console.log(screen.debug);
  const linkElement2 = screen.getByText("What Is Nemo?");
  expect(linkElement2).toBeInTheDocument();
});

// test("renders Nodes table", async () => {
//   await

//   render(<NodeContainer />);

//   //console.log(screen.debug);
//   const tableComp = screen.getByRole("table");
//   expect(tableComp).toBeInTheDocument();
// });
