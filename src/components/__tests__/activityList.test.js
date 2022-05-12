import "@testing-library/jest-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { act, isDOMComponent } from "react-dom/test-utils";
import ActivityList from "../activityList";
import {BrowserRouter as Router} from "react-router-dom";
let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

it("Render Activity List Component", () => {
	act(() => {
		ReactDOM.createRoot(container).render(<Router><ActivityList /></Router>);
	});
	const activityList = document.getElementById("activity-list-testid");
	isDOMComponent(activityList);
    
});

it("Render Activity List Component and test Filter Options", () => {
	act(() => {
		ReactDOM.createRoot(container).render(<Router><ActivityList /></Router>);
	});
	expect(document.querySelector(".form-label").innerHTML).toBe("Filter Requests");
	expect(document.querySelector(".form-control").length).toBe(4);
});