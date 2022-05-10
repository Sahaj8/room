// import {render, screen, cleanup} from "@testing-library/react";
// import ActivityList from "../activityList";
import '@testing-library/jest-dom'

// test("Testing activityList component", () => {
//     render (<ActivityList />)
//     const activityList = screen.getByTestId('activity-list-testid');
//     expect(activityList).toBeInTheDocument();
// });

import React from 'react';
import ReactDOM from 'react-dom/client';
import { act, isDOMComponent } from 'react-dom/test-utils';
import ActivityList from "../activityList";
import {render, screen, cleanup} from "@testing-library/react";
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it("Render Activity List Component", () => {
    act(() => {
      ReactDOM.createRoot(container).render(<ActivityList />);
    })
    console.log(container.outerHTML);
    const activityList = document.getElementById('activity-list-testid');
    isDOMComponent(activityList);
    expect(document.querySelector(".form-label").innerHTML).toBe("Filter Requests");
    expect(document.querySelector(".form-control").length).toBe(4);
})