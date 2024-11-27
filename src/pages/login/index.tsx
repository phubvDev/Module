import { Button, Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import {loginService} from "../../services/loginService.ts";
import {useContextGlobal} from "../../context/GlobalContext.tsx";

function Login() {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const {setUserId} = useContextGlobal();
    console.log("api url", import.meta.env.VITE_API_URL);


    const handleLogin = async () => {
        const userId = (document.getElementById('exampleInputEmail1') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;

        if (!userId || !password) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await loginService(userId,password);

            if (response.status === 200) {
                alert('로그인 성공!');
                // Lưu token vào localStorage để sử dụng sau này
                console.log('token',response.data.token)
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userId',userId);
                setUserId(userId);
                navigate('/module/boards');
            } else {
                alert('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="wrapper" style={{ padding: '16px', textAlign: 'center' }}>
            <a href="#" style={{ display: 'block', margin: '40px 0' }}>
                <img src={Logo} alt="Logo" style={{ maxWidth: '250px' }} />
            </a>
            <h1><b>로그인</b></h1>
            <p style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '16px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

            <div style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
                <Form layout="vertical" style={{ margin: '32px 0' }}>
                    <Form.Item label="아이디" style={{ marginBottom: '16px' }}>
                        <Input className="ant-input ant-input-lg" id="exampleInputEmail1" placeholder="아이디를 입력해주세요" />
                    </Form.Item>
                    <Form.Item label="비밀번호" style={{ marginBottom: '16px' }}>
                        <Input.Password
                            style={{ height: 40 }}
                            id="password"
                            className="ant-input ant-input-lg"
                            placeholder="비밀번호를 입력해주세요"
                            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        style={{ width: '100%' }}
                        onClick={handleLogin}
                    >
                        로그인
                    </Button>
                    <div className="text-center" style={{ marginTop: '8px' }}>
                        <Link to="/module/findid" style={{ color: 'rgba(0, 0, 0, 0.45)', padding: '0 8px' }}>아이디 찾기</Link> |
                        <Link to="/module/forgotpassword" style={{ color: 'rgba(0, 0, 0, 0.45)', padding: '0 8px' }}>비밀번호 찾기</Link> |
                        <Link to="/module/register" style={{ color: 'rgba(0, 0, 0, 0.45)', padding: '0 8px' }}>회원가입</Link>
                    </div>
                </Form>

                <div className="social-login">
                    <h3 className="text-center">or</h3>
                    <Button type="primary" size="small" style={{ width: '100%', marginBottom: '8px' }}>Facebook</Button>
                    <Button type="primary" danger size="small" style={{ width: '100%', marginBottom: '8px' }}>Google</Button>
                    <Button type="default" size="small" style={{ width: '100%', marginBottom: '8px', backgroundColor: '#1ec800', color: '#fff' }}>Naver</Button>
                    <Button type="default" size="small" style={{ width: '100%', marginBottom: '8px', backgroundColor: '#fee500', color: '#000' }}>Kakao</Button>
                    <Button type="default" size="small" style={{ width: '100%', marginBottom: '8px', backgroundColor: '#6c757d', color: '#fff'}}>Apple</Button>
                </div>

                <div className="copyright" style={{ marginTop: '16px' }}>
                    <p className="text-center">©Colla soft. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
