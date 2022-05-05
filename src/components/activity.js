import React, { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Card } from 'react-bootstrap';

const Activity = (activity) => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [name, setName] = useState("");

    useEffect( ()=>{
        const token = localStorage.getItem('token');
        if(token)
        {
            axios.get("/users/", {
                headers: { Authorization: token },
              })
                .then((res) => {
                    if(res.data.user){
                        setisAuthenticated(true);
                        setisAdmin(res.data.user.isAdmin);
                    }
                    else setisAuthenticated(false);
                })
                .catch((err) => {
                    console.log(err);
                    // console.log(res.status);
                    alert("Internal Server Error");
                })
        }
        else{
            setisAuthenticated(false);
        }
    },[])

    const handleApprove = () => {
        const newActivity = {...activity};
        newActivity.status = "Approved";
        console.log("handle");
        console.log(newActivity);
        axios.patch(`/activity/update/${newActivity._id}`, newActivity)
            .then(res => {
                console.log(res.data)
                if(res.status === 401){
                    alert(res.data);
                }
                else window.location.href="/"
            })
            .catch(err => {
                console.log(err);
                alert("Activity error");
            });
    }

    const handleDecline = () => {
        const newActivity = {...activity};
        newActivity.status = "Declined";
        axios.patch(`/activity/update/${newActivity._id}`, newActivity)
            .then(res => {
                console.log(res.data)
                if(res.status === 401){
                    alert(res.data);
                }
                else window.location.href="/"
            })
            .catch(err => {
                console.log(err);
                alert("Activity error");
            });
    }

    const handleDelete = () => {
        axios.delete(`/activity/delete/${activity._id}`)
            .then(res => {
                console.log(res.data)
                if(res.status === 401){
                    alert(res.data);
                }
                else window.location.href="/"
            })
            .catch(err => {
                console.log(err);
                alert("Activity error");
            });
    }

    
    console.log(activity);
    return (
        <>     
            <Card style={{ width: '100%', display:'flex', flexDirection: 'row', backgroundColor: "rgb(247,247,247)"}}>
            <Card.Body>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Applicant:</b> {activity.applicant}</li>
                    <li className="list-group-item"><b>Room Number:</b> {activity.roomNumber}</li>
                    <li className="list-group-item"><b>Activity:</b> {activity.activity}</li>
                    <li className="list-group-item"><b>Start Time:</b> {new Date(activity.startDateTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</li>
                    <li className="list-group-item"><b>End Time:</b> {new Date(activity.endDateTime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</li>
                    <li className="list-group-item"><b>Requested At:</b> {activity.createdAt}</li>
                    <li className="list-group-item"><b>Status:</b> {activity.status}</li>
                </ul>
                {
                    isAuthenticated && isAdmin && activity.status==="Pending" ?
                    <>
                        <Button variant="success" onClick={handleApprove}>Approve</Button>
                        <Button variant="danger" onClick={handleDecline}>Decline</Button>
                    </>
                    :
                    isAuthenticated && activity.status==="Declined"?
                    <>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </>
                    :
                    <></>
                }
                
            </Card.Body>
            </Card>
        </>
    );
}
export default Activity;