import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import { getApiUrl } from "../config";
const url = getApiUrl();

const AddActivity = () => {
    const [activityData, setActivityData] = useState({
        applicant: '',
        activity: '',
        roomNumber: '',
    });
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [roomList, setRoomList] = useState( [1,2,3] );

    useEffect(() => {
        const getRoomList = async () => {
            const response = await axios.get(`${url}/rooms`);
            const roomList = await response.data;
            setRoomList(roomList);
        };
        getRoomList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(activityData);
        const newActivity = {
            applicant: activityData.applicant,
            activity: activityData.activity,
            roomNumber: activityData.roomNumber, 
            status: "Pending",
            createdAt: new Date(),
            startDateTime: startDateTime,
            endDateTime: endDateTime
        }
        axios.post(`${url}/activity/add`, newActivity)
            .then(res => console.log(res.data))
            .catch(error => console.log(error)); 
    };
    return (
        <div className="container">
            <h2>Request Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Applicant" className="form-label">Applicant</label>
                    <textarea 
                        className="form-control" id="Applicant" placeholder=""
                        onChange = {(e) => setActivityData({...activityData, applicant: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Activity" className="form-label">Activity</label>
                    <textarea 
                        className="form-control" id="Activity" placeholder=""
                        onChange = {(e) => setActivityData({...activityData, activity: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Room Number" className="form-label">Room Number</label>
                    <select className="form-control" name="country" value={activityData.roomNumber} 
                        onChange={(e) => setActivityData({...activityData, roomNumber:e.target.value})}>  
                        {roomList.map((e, key) => {  
                            return <option key={key} value={e.roomNumber}>{e.roomNumber}</option>;  
                        })}  
                    </select> 
                </div>
                <div className="mb-3"> 
                <label htmlFor="Room Number" className="form-label">From</label>
                    <DateTimePicker onChange={setStartDateTime} value={startDateTime} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Room Number" className="form-label">To</label>
                    <DateTimePicker onChange={setEndDateTime} value={endDateTime} />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddActivity;