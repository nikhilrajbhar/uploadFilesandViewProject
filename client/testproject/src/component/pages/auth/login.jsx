import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login_details } from '../../../redux/actions/userAction';

export default function Login() {

    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [check, setcheck] = useState(false);
    const dispatch = useDispatch();

    const logindata = useSelector((state) => state.user);

    useEffect(() => {
        const errorLogin = logindata?.errorLogin;
        console.log(errorLogin);
        if (errorLogin) {
            alert("login error")
        }
    },[check])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !password) return;
        console.log(name, password);
        const user = {
            name,
            password: password.trim(),
        }
        dispatch(login_details(user));
        setTimeout(() => {
            setcheck(state => !state);
            
        }, 100);
    }

    return (
        <div className="center">
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">username</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)} id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" value={password} onChange={(e) => setpassword(e.target.value)} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
