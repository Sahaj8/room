import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRoom = () => {
    const [number, setNumber] = useState("");
    // const [size, setSize] = useState(0);
    // const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
        const token = localStorage.getItem('token');
        if(token)
        {
            axios.get("https://afb9-103-156-19-229.in.ngrok.io/users/", {
                headers: { Authorization: token },
              })
                .then((res) => {
                    console.log(res.data.user);
                    if(res.status===201)
                    {  
                        if(res.data.user.isAdmin === false){
                            window.location.href="/";
                            alert("Permision denied!")
                        }
                        else setLoading(true);
                    }
                    else
                    {   
                        alert("Token invalid!");
                        window.location.href="/login";
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // console.log(res.status);
                    alert("Internal Server Error");
                })
        }
        else  window.location.href="/login";
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRoom = {
            roomNumber: number,
            // size: size,
            // description: desc,
        };

        console.log(newRoom);

        axios.post('https://afb9-103-156-19-229.in.ngrok.io/rooms/add', newRoom)
        .then(res => {
            console.log("inside add")
            if(res.status === 401){
                alert(res.data);
            }
            else window.location.href="/room/list"
        })
        .catch(err => {
            console.log(err);
            alert("Room already exist");
        });
        
    };

    return (
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
                    {/* <div className="mb-3">
                        <label className="form-label" htmlFor="inputSize">Email</label>
                        <input 
                            // type="email" 
                            className="form-control" id="inputSize" placeholder="100"
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDescription" className="form-label">Description</label>
                        <textarea 
                            className="form-control" id="inputDescription" placeholder="Description"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div> */}
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
                </>
                :
                <></>
            }
        </div>
    );
}

export default AddRoom