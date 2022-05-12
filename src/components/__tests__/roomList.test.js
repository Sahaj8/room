import React from "react";
import ReactDOM from "react-dom/client";
import { act, isDOMComponent } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
let container;

import RoomList from "../roomList";

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});


it("Render Room List Component", () => {
	act(() => {
		ReactDOM.createRoot(container).render(<Router><RoomList /></Router>);
	});
	isDOMComponent(container.outerHTML);
});
