import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from "../config";
import { NavBar } from "./navBar";
const url = getApiUrl();

const RoomList = () => {
    const [roomList, setRoomList] = useState([]);
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
                        else {
                            axios.get(`${url}/rooms/list`)
                                .then((res) => {
                                    if(res.status === 201){
                                        setRoomList(res.data);
                                        setLoading(true);
                                    }
                                    else console.log("Server error!");
                                })
                        }
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

    const deleteroom = async (id) => {
        const res2 = await axios.delete(`${url}/rooms/delete/${id}`);

        const deletedata = await res2.data;

        if (res2.status === 401 || !deletedata) {
            console.log("error");
        } else {
            setRoomList(roomList.filter(rl => rl._id !== id))
        }

    }

    return (
        <>

        {
            loading?
            <>
            <NavBar/>
            <div className="mt-5">
                <div data-testid="container" className="container">
                    <div className="add_btn mt-2 mb-2">
                        <Link to="/room/add" className="btn btn-primary">Add Room</Link>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Room</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                roomList.map((element, id) => {
                                    return (
                                        <>
                                            <tr key={id}>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.roomNumber}</td>
                                                <td className="d-flex justify-content-between">
                                                    <Link to={`/room/edit/${element._id}`}>  <button className="btn btn-primary">Edit</button></Link>
                                                    <button className="btn btn-danger" onClick={() => deleteroom(element._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            :
            <></>
        }
        </>
    );
}

export default RoomList;