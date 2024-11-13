import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/loginService.ts';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await loginService(username, password);
            console.log('Login successful:', response.data);
            navigate('/module');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <a href="/" className={`${styles.logo} my-5 d-block`}>
                <img src="/assets/logo.png" alt="Colla DEV Logo" style={{ maxWidth: '250px' }} />
            </a>
            <h1 className={styles.title}><b>로그인</b></h1>
            <p className={`${styles.subtitle} text-muted lead`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className={styles.formWrapper}>
                <form className={`${styles.form} text-left my-4`} onSubmit={handleLogin}>
                    <div className={`${styles.formGroup} form-group mb-4`}>
                        <label htmlFor="exampleInputEmail1">아이디</label>
                        <input
                            type="text"
                            className="form-control form-control-lg rounded-0"
                            id="exampleInputEmail1"
                            placeholder="아이디를 입력해주세요"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={`${styles.formGroup} form-group mb-4`}>
                        <label htmlFor="exampleInputPassword1">비밀번호</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                className="form-control form-control-lg rounded-0"
                                placeholder="비밀번호를 입력해주세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={`${styles.togglePassword} btn btn-default btn-lg bg-transparent border-0`}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-block btn-dark btn-flat btn-lg">로그인</button>
                    <div className={`${styles.links} text-center mt-2`}>
                        <a href="/find-id" className="text-muted px-2">아이디 찾기</a> |
                        <a href="/find-password" className="text-muted px-2">비밀번호 찾기</a> |
                        <a href="/register" className="text-muted px-2">회원가입</a>
                    </div>
                </form>

                <div className={styles.socialLogin}>
                    <h3 className="text-center">or</h3>
                    <button type="button" className="btn btn-block btn-primary btn-sm btn-flat">Facebook</button>
                    <button type="button" className="btn btn-block btn-danger btn-sm btn-flat">Google</button>
                    <button type="button" className="btn btn-block btn-success btn-sm btn-flat">Naver</button>
                    <button type="button" className="btn btn-block btn-warning btn-sm btn-flat">Kakao</button>
                    <button type="button" className="btn btn-block btn-secondary btn-sm btn-flat">Apple</button>
                </div>

                <div className={styles.copyright}>
                    <p className="text-center">&copy; Colla soft. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
