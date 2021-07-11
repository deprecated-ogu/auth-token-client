import axios from "axios";
import React, { useState } from "react";

function Login({ loginHandler }) {
	const [inputId, setId] = useState('');
	const [inputPassword, setPassword] = useState('');
	const inputIdHandler = (e) => {
		setId(e.target.value);
	}

	const inputPasswordHandler = (e) => {
		setPassword(e.target.value);
	}

	const loginRequestHandler = async () => {
		await axios.post("https://localhost:4000/login",
			{ userId: inputId, password: inputPassword }, 
			{ headers: { "Content-Type": "application/json" }, withCredentials: true }
		).then((res) => {
			loginHandler(res.data);
		}).catch((err) => console.log(err));
	}

	return (
		<div className='loginContainer'>
			<div className='inputField'>
				<div>Username</div>
				<input
					name='userId'
					onChange={(e) => inputIdHandler(e)}
					value={inputId}
					type='text'
				/>
			</div>
			<div className='inputField'>
				<div>Password</div>
				<input
					name='password'
					onChange={(e) => inputPasswordHandler(e)}
					value={inputPassword}
					type='password'
				/>
			</div>
			<div className='loginBtnContainer'>
				<button onClick={loginRequestHandler} className='loginBtn'>
					JWT Login
				</button>
			</div>
		</div>
	)
}

export default Login;