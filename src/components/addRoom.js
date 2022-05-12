import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getApiUrl } from "../config";
import { NavBar } from "./navBar";

const url = getApiUrl();

const AddRoom = () => {
    const [number, setNumber] = useState("");
    // const [size, setSize] = useState(0);
    // const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect( ()=>{
        const token = localStorage.getItem('token');
        if(token)
        {
            axios.get(`${url}/users/`, {
                headers: { Authorization: token },
              })
                .then((res) => {
                    if(res.status===201)
                    {  
                        if(res.data.user.isAdmin === false){
                            navigate("/");
                            alert("Permision denied!")
                        }
                        else setLoading(true);
                    }
                    else
                    {   
                        alert("Token invalid!");
                        navigate("/login");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else  navigate("/login");
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRoom = {
            roomNumber: number,
            // size: size,
            // description: desc,
        };
        axios.post(`${url}/rooms/add`, newRoom)
        .then(res => {
            if(res.status === 401){
                alert(res.data);
            }
            else navigate("/room/list");
        })
        .catch(err => {
            console.log(err);
        });
        
    };

    return (
        <>
        <NavBar/>
        <div className="container">
            {
                loading?
                <>
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputRoomNumber" className="form-label">Room Number</label>
                        <textarea 
                            className="form-control" id="inputRoomNumber" placeholder="A-101"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                </>
                :
                <></>
            }
        </div>
        </>
    );
}

export default AddRoom