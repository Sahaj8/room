import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";

const EditUser = () => {
    const { id } = useParams("");
    const [user, editUser] = useState([]);
    // const [mail, setMail] = useState("");
    // const [desc, setDesc] = useState("");
    // const [user, edituser] = useState({
    //     name:"",
    //     mail:"",
    //     pass:"",
    //     desc:"",
    //     admin:false
    // });
    const [loading, setLoading] = useState(false);

    // const setdata = async (data) => {
    //     edituser({...user, name:data.username});
    //     edituser({...user, mail:data.usermail});
    //     edituser({...user, pass:data.password});
    //     edituser({...user, desc:data.description});
    //     edituser({...user, admin:data.isAdmin});
    //     console.log(data.username);
    // }

    useEffect( ()=>{
        const token = localStorage.getItem('token');
        if(token)
        {
            axios.get("/users/", {
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
                        else{
                            axios.get(`/users/edit/${id}`)
                                .then((res) => {
                                    editUser(res.data);
                                    // setdata(res.data);
                                    // edituser({...user, name:res.data.username});
                                    // edituser({...user, mail:res.data.usermail});
                                    // edituser({...user, pass:res.data.password});
                                    // edituser({...user, desc:res.data.description});
                                    // edituser({...user, admin:res.data.isAdmin});
                                    console.log(user);
                                    setLoading(true);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    // console.log(res.status);
                                    alert("Internal Server Error");
                                })
                        }
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
        // const newUser = {
        //     username: user.name,
        //     usermail: user.mail,
        //     password: user.pass,
        //     description: user.desc,
        //     isAdmin: user.admin
        // };
        const newUser = user;

        console.log(newUser);

        axios.patch(`/users/update/${id}`, newUser)
            .then(res => {
                console.log(res.data)
                if(res.status === 401){
                    alert(res.data);
                }
                else window.location.href="/user/list"
            })
            .catch(err => {
                console.log(err);
                alert("User already exist");
            });
        
    };

    return (
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
    );
}

export default EditUser;