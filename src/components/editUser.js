import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../config";
import { NavBar } from "./navBar";
import { Nav } from "react-bootstrap";
const url = getApiUrl();

const EditUser = () => {
	const { id } = useParams("");
	const [user, editUser] = useState([]);
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
							axios.get(`${url}/users/edit/${id}`)
								.then((res) => {
									editUser(res.data);
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
					console.log(err);
				});
		}
		else  navigate("/login");
	},[]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = user;
		axios.patch(`${url}/users/update/${id}`, newUser)
			.then(res => {
				console.log(res.data);
				if(res.status === 401){
					alert(res.data);
				}
				else navigate("/user/list");
			})
			.catch(err => {
				console.log(err);
				alert("User already exist");
			});
        
	};
	return (
		<>
			<NavBar />
			<div className="container">
				{
					loading?
						<>
							<h2>Edit User</h2>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="inputUserName" className="form-label">Username</label>
									<textarea 
										className="form-control" id="inputUserName" placeholder="Username"
										value={user.username}
										onChange={(e) => editUser({...user, username: e.target.value})}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label" htmlFor="inputEmail">Email</label>
									<input 
										type="email" 
										className="form-control" id="inputEmail" placeholder="Email"
										value={user.usermail}
										onChange={(e) => editUser({...user, usermail: e.target.value})}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="inputDescription" className="form-label">Description</label>
									<textarea 
										className="form-control" id="inputDescription" placeholder="Description"
										value={user.description}
										onChange={(e) => editUser({...user, description: e.target.value})}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="inputPassword" className="form-label">Password</label>
									<input 
										type='password' className="form-control" id="inputPassword" placeholder="Password"
										onChange={(e) => editUser({...user, password: e.target.value})}
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

export default EditUser;