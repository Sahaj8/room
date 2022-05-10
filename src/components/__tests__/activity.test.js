import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import { act, isDOMComponent } from 'react-dom/test-utils';
import Activity from "../activity";
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it("Render Activity Components", () => {
    act(() => {
        ReactDOM.createRoot(container).render(<Router><Activity /></Router>);
    });
    console.log(container.outerHTML);
    const activityComponent = document.querySelector(".card");
    isDOMComponent(activityComponent);
    
})

it("Check display format of activity", () => {
    act(() => {
        ReactDOM.createRoot(container).render(<Router><Activity /></Router>);
    });
    const groupList = document.getElementsByClassName("list-group-item");
    expect(groupList.length).toBe(7);
    const expectedGroupList = ["Applicant:", "Room Number:", "Activity:", "Start Time:", 
                        "End Time:", "Requested At:", "Status:"];
    for(let i = 0; i < 7; i ++) {
        expect(groupList[i].querySelector("b").innerHTML.trim()).toBe(expectedGroupList[i])
    }
})
