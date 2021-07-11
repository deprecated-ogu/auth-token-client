import React, { useState, useEffect } from "react";
import axios from "axios";

function MyPage({ accessToken, issueAccessToken }) {
	const [userId, setId] = useState('');
	const [email, setEmail] = useState('');
	const [createdAt, setCreatedAt] = useState('');

	useEffect(() => {
		accessTokenRequest();
	}, [accessToken])

	const accessTokenRequest = async () => {
		await axios.get("https://localhost:4000/accesstokenrequest",
		{
			headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
			withCredentials: true,
		}
		).then((res) => {
			if (res.data.message !== "ok") {
				const message = "access token이 만료되어 불러올 수 없습니다. refresh token을 사용해주시기 바랍니다.";
				setEmail(message);
				setCreatedAt(message);
				return ;
			}
			const { createdAt, userId, email } = res.data.data.userInfo;
			setId(userId);
			setEmail(email);
			setCreatedAt(createdAt);
		});
	}

	const refreshTokenRequest = async () => {
    await axios.get("https://localhost:4000/refreshtokenrequest",
			{
        withCredentials: true,
      }
			).then((res) => {
        if (res.data.message !== "ok") {
          const message = "refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.";
					setEmail(message);
					setCreatedAt(message);
          return ;
        }
        const { createdAt, userId, email } = res.data.data.userInfo;
				setId(userId);
				setEmail(email);
				setCreatedAt(createdAt);
        issueAccessToken(res.data.data.accessToken);
      });
  }

	return (
		<div className='myPageContainer'>
			<div className='title'>MyPage</div>
			<hr />
			<br />
			<br />
			<div>
				안녕하세요. <span className='name'>{userId ? userId : "Guest"}</span>님! jwt 로그인이
				완료되었습니다.
			</div>
			<br />
			<br />
			<div className='item'>
				<span className='item'>나의 이메일: </span> {email}
			</div>
			<div className='item'>
				<span className='item'>나의 아이디 생성일: </span> {createdAt}
			</div>
			<br />
			<br />
			<div className='btnContainer'>
				<button className='tokenBtn red' onClick={accessTokenRequest}>
					access token request
				</button>
				<button className='tokenBtn navy' onClick={refreshTokenRequest}>
					refresh token request
				</button>
			</div>
      </div>
	)
}

export default MyPage;