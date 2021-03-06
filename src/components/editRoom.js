import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../config";
import { NavBar } from "./navBar";

const url = getApiUrl();

const EditRoom = () => {
	const { id } = useParams("");
	const [room, editRoom] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect( ()=>{
		const token = localStorage.getItem("token");
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
							alert("Permision denied!");
						}
						else{
							axios.get(`${url}/rooms/edit/${id}`)
								.then((res) => {
									editRoom(res.data);
									setLoading(true);
								})
								.catch((err) => {
									alert("Internal Server Error");
								});
						}
					}
					else
					{   
						alert("Token invalid!");
						navigate("/login");
					}
				})
				.catch((err) => {
					alert("Internal Server Error");
				});
		}
		else  navigate("/login");
	},[]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newRoom = room;


		axios.patch(`${url}/rooms/update/${id}`, newRoom)
			.then(res => {
				if(res.status === 401){
					alert(res.data);
				}
				else navigate("/room/list");
			})
			.catch(err => {
				alert("Room already exist");
			});
        
	};

	return (
		<>
			<NavBar/>
			<div className="container">
				{
					loading?
						<>
							<h2>Edit Room</h2>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="inputUserName" className="form-label">Room Number</label>
									<textarea 
										className="form-control" id="inputUserName" placeholder="RoomNumber"
										value={room.roomNumber}
										onChange={(e) => editRoom({...room, roomNumber: e.target.value})}
									/>
								</div>
								<button type="submit" className="btn btn-primary">Update</button>
							</form>
						</>
						:
						<></>
				}
			</div>
		</>
	);
};

export default EditRoom;