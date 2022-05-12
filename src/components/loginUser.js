import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../config";
import { NavBar } from "./navBar";
const url = getApiUrl();

const LoginUser = () => {
	const [name, setName] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
    
	useEffect( () =>{
		const token = localStorage.getItem("token");
		if(token)
		{
			axios.get(`${url}/users/`, {
				headers: { Authorization: token },
			})
				.then((res) => {
					console.log(res.data.user);
					if(res.status===201)
					{
						navigate("/");
						alert("Already Logged In");
					}
					else
					{   
						alert("Token invalid!");
						setLoading(true);
					}
				})
				.catch((err) => {
					console.log(err);
					// console.log(res.status);
					alert("Internal Server Error");
				});
		}
		setLoading(true);
	},[]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUser = {
				username: name,
				usermail: mail,
				password: password,
			};
    
			console.log(newUser);
    
			const res = await axios.post(`${url}/users/login`, newUser);
			localStorage.setItem("token", res.data.token); 
			console.log(res.data);
			navigate("/");
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	return (
		<>
			<NavBar/>
			<div className="container" style={{paddingTop: "100px", border:"5px solid", backgroundColor: "#CAE6DF"}}>
				{
					loading?
						<>
							<h2 style={{textAlign: "center"}}>Login</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-group row">
									<label htmlFor="inputUserName" className="col-sm-2 col-form-label">Username</label>
									<div className="col-sm-5">
										<input 
											type='text' className="form-control" id="inputUserName" placeholder="Username"
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group row" style={{paddingTop: "10px"}}>
									<label htmlFor="inputUserName" className="col-sm-2 col-form-label">Email</label>
									<div className="col-sm-5">
										<input 
											type='email' className="form-control" id="inputEmail" placeholder="Email"
											onChange={(e) => setMail(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group row" style={{paddingTop: "10px"}}>
									<label htmlFor="inputUserName" className="col-sm-2 col-form-label">Password</label>
									<div className="col-sm-5">
										<input 
											type='password' className="form-control" id="inputPassword" placeholder="Password"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>
								<button type="submit" className="btn btn-primary">Login</button>
							</form>
						</>
						:
						<></>
				}
			</div>
		</>
	);
};

export default LoginUser;