import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Css/Community.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import darkLogo from "../Logo/darkLogo.png";

function Community() {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://localhost:4000/posts')
			.then((response) => {
				setPosts(response.data);
			})

			.catch((err) => console.error(err));
	}, []);

	return (
    <div className={styles.body}>
      <nav className={styles.upBar} id={styles.hd}>
        <img
          onClick={() => {
            navigate("/");
          }}
          src={darkLogo}
        />
        <div className={styles.user}>
          <h3 onClick={() => {navigate("/login");}}>로그인/회원가입</h3>
        </div>
      </nav>
      <div className={styles.board}>
        <div className={styles.container}>
          <h2 className={styles.title}>NOMADGRAM</h2>
          <button
            className={styles.uploadBtn}
            onClick={() => navigate("/post")}
          >
            게시글 작성
          </button>
          <div className={styles.postList}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <h3 onClick={() => navigate(`/posts/${post.id}`)}>
                  {post.title}
                </h3>
                <div className={styles.postDetails}>
                  <span>아이디: {post.username}</span>
                  <span>❤️  {post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Community;
