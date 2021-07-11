import axios from "axios";
import React, { useState } from "react";

function Login({ loginHandler }) {
	const [inputId, setId] = useState('');
	const [inputEmail, setEmail] = useState('');
	const [inputPassword, setPassword] = useState('');
	const [isSignUp, setSignUp] = useState(false);
	
	const inputIdHandler = (e) => {
		setId(e.target.value);
	}

	const inputEmailHandler = (e) => {
		setEmail(e.target.value);
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

	const signUpRequestHandler = async () => {
		await axios.post("https://localhost:4000/signup",
			{ userId: inputId, password: inputPassword, email: inputEmail }, 
			{ headers: { "Content-Type": "application/json" }, withCredentials: true }
		).then((res) => {
			if (res.data.message === "already used ID") alert(res.data.message);
			else {
				alert(res.data.message);
				setSignUp(!isSignUp);
			}
		}).catch((err) => console.log(err));
	}
	
	const isSignUpHandler = () => {
		setSignUp(!isSignUp);
	}

	return (
		<div className='Login'>
			{isSignUp ? (
				<div className='signUpContainer'>
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
						<div>email</div>
						<input
							name='email'
							onChange={(e) => inputEmailHandler(e)}
							value={inputEmail}
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
					<div className='signUpBtnContainer'>
						<button onClick={signUpRequestHandler} className='signUpBtn'>
							JWT SignUp
						</button>
					</div>
				</div>
			) : (
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
			)}
			<button onClick={isSignUpHandler} className='isSignUpBtn'>
				button
			</button>
		</div>
	)
}

export default Login;