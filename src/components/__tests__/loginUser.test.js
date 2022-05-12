import "@testing-library/jest-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { act, isDOMComponent } from "react-dom/test-utils";
import LoginUser from "../loginUser";
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

it("Render Login Component", () => {
	act(() => {
		ReactDOM.createRoot(container).render(<Router><LoginUser /></Router>);
	});
	isDOMComponent(container.outerHTML);
});

it("Render Login Component and check NavBar", () => {
	act(() => {
		ReactDOM.createRoot(container).render(<Router><LoginUser /></Router>);
	});
	const groupList = document.getElementsByClassName("navbar-item");
	expect(groupList.length).toBe(2); // Corresponds to {Home, Login} in NavBar
	const groupListItems = document.getElementsByClassName("nav-link");
	expect(groupListItems[0].innerHTML).toBe("Home");
	expect(groupListItems[1].innerHTML).toBe("Login");
});

it("Render Login Component and check Login Form", () => {
	act(() => {
		ReactDOM.createRoot(container).render(<Router><LoginUser /></Router>);
	});
	const groupList = document.querySelectorAll("label");
	expect(groupList.length).toBe(3);
	expect(groupList[0].innerHTML).toBe("Username");
	expect(groupList[1].innerHTML).toBe("Email");
	expect(groupList[2].innerHTML).toBe("Password");
});
