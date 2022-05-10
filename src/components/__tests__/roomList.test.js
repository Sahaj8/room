import React from 'react';
import ReactDOM from 'react-dom/client';
import { act, isDOMComponent } from 'react-dom/test-utils';
let container;

import RoomList from "../roomList";

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
      ReactDOM.createRoot(container).render(<RoomList />);
    })
    console.log(container.outerHTML);
    const editRoomComponent = document.querySelector(".container");
    console.log(editRoomComponent)
    
})
