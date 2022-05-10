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
                    console.log(res.data.user);
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
                                        console.log(res.data);
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
                    // console.log(res.status);
                    alert("Internal Server Error");
                })
        }
        else  navigate("/login");
    },[])

    const deleteroom = async (id) => {
        console.log(id);
        const res2 = await axios.delete(`${url}/rooms/delete/${id}`);

        const deletedata = await res2.data;
        console.log(deletedata);

        if (res2.status === 401 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            // setDLTdata(deletedata)
            // getdata();
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
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <Link to="/room/add" className="btn btn-primary">Add Room</Link>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Room</th>
                                {/* <th scope="col">email</th> */}
                                {/* <th scope="col">Description</th> */}
                                {/* <th scope="col">isAdmin</th> */}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                roomList.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.roomNumber}</td>
                                                {/* <td>{element.usermail}</td> */}
                                                {/* <td>{element.description}</td> */}
                                                {/* <td>{element.isAdmin}</td> */}
                                                <td className="d-flex justify-content-between">
                                                    {/* <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink> */}
                                                    <Link to={`/room/edit/${element._id}`}>  <button className="btn btn-primary">Edit</button></Link>
                                                    {/* <button className="btn btn-primary">Edit</button> */}
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