import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../config";
import { NavBar } from "./navBar";
const url = getApiUrl();

const UserList = () => {
	const [userList, setUserList] = useState([]);
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
						else {
							axios.get(`${url}/users/list`)
								.then((res) => {
									if(res.status === 200){
										setUserList(res.data);
										setLoading(true);
									}
									else console.log("Server error!");
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

	const deleteuser = async (id) => {
		const res2 = await axios.delete(`${url}/users/delete/${id}`);

		const deletedata = await res2.data;

		if (res2.status === 401 || !deletedata) {
			console.log("error");
		} else {
			setUserList(userList.filter(ul => ul._id !== id));
		}

	};

	return (
		<>
			{
				loading?
					<>
						<NavBar/>
						<div className="mt-5">
							<div className="container">
								<div className="add_btn mt-2 mb-2">
									<Link to="/user/add" className="btn btn-primary">Add User</Link>
								</div>

								<table className="table">
									<thead>
										<tr className="table-dark">
											<th scope="col">id</th>
											<th scope="col">Username</th>
											<th scope="col">email</th>
											<th scope="col">Description</th>
											{/* <th scope="col">isAdmin</th> */}
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>

										{
											userList.map((element, id) => {
												return (
													<>
														<tr>
															<th scope="row">{id + 1}</th>
															<td>{element.username}</td>
															<td>{element.usermail}</td>
															<td>{element.description}</td>
															<td className="d-flex justify-content-between">
																<Link to={`/user/edit/${element._id}`}>  <button className="btn btn-primary">Edit</button></Link>
																<button className="btn btn-danger" onClick={() => deleteuser(element._id)}>Delete</button>
															</td>
														</tr>
													</>
												);
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
};

export default UserList;