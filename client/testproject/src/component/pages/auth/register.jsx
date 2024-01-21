import React from 'react';
import { useState } from 'react';

export default function Register() {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password) return;
        console.log(name, email, password);
        const user = {
            name,
            email: email.toLowerCase().trim(),
            password: password.trim(),
        }

        try {
            let response = await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            response = await response.json();
            console.log(response);
            
        } catch (error) {
            alert("error");
        }
    }
    return (
        <div className="center">
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)} id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setpassword(e.target.value)} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
