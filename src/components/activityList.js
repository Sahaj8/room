import React, { useState, useEffect } from "react";
import axios from "axios";
import Activity from "./activity";
import { Button, Card, Container } from 'react-bootstrap';

const ActivityList = () => {
    const [activityList, setActivityList] = useState( [] );
    const [filterOption, setFilterOption] = useState( ["Pending", "Approved", "My Requests", "All"] );
    const [currentFilter, setCurrentFilter] = useState("");

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getActivityList = async () => {
            const response = await axios.get("/activity");
            const activityData = await response.data;
            setActivityList(activityData);
            const token = localStorage.getItem('token');
            if(token) {
                const userDataresponse = await axios.get("/users/", {headers: { Authorization: token },})
                const userData = await userDataresponse.data.user;
                if(userData) {
                    setisAuthenticated(true);
                    setisAdmin(userData.isAdmin); 
                    setName(userData.username);
                    if(userData.isAdmin) {
                        setCurrentFilter("Pending")
                        setLoading(true);
                    }
                    else {
                        setCurrentFilter("Approved")
                        setLoading(true);
                    }
                }
                else {
                    setCurrentFilter("All")
                    setLoading(true);
                }
            }
            else {
                setCurrentFilter("All")
                setLoading(true);
            }
        };
        getActivityList();
    }, []);
    console.log(activityList, isAuthenticated, isAdmin);
    return (
        <>       
        <Container>
            <div className="mb-3">
                    <label htmlFor="Filter Requests" className="form-label">Filter Requests</label>
                    <select className="form-control" name="country" value={currentFilter} 
                        onChange={(e) => setCurrentFilter(e.target.value)}>  
                        {filterOption.map((e, key) => {  
                            return <option key={key} value={e}>{e}</option>;  
                        })}  
                    </select> 
                </div>
            {
                loading ? 
                <>
                    {
                        currentFilter == "My Requests" ?
                        activityList.filter(activity => (activity.applicant == name)).map(function(object, index) {
                            console.log("here", object.status, currentFilter)
                            return <Activity {...object} key={index} />
                        })
                        :
                        currentFilter == "All" ?
                            activityList.map(function(object, index){
                                if(object.status != "Declined")
                                    return <Activity {...object} key={index}/>
                            })
                            :
                            activityList.filter(activity => (activity.status == currentFilter)).map(function(object, index) {
                                console.log("here", object.status, currentFilter)
                                return <Activity {...object} key={index} />
                            })
                    }
                </>
                :
                <></>
                }      
            </Container>       
        </>
        
    );
}

export default ActivityList;