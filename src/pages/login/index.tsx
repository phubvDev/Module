
import { Button, Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/logo.png';

function Login() {
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
                            id="password"
                            className="ant-input ant-input-lg"
                            placeholder="비밀번호를 입력해주세요"
                            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Button type="primary" size="large" style={{ width: '100%' }}>
                        로그인
                    </Button>
                    <div className="text-center" style={{ marginTop: '8px' }}>
                        <a href="./find-id.html" style={{ color: 'rgba(0, 0, 0, 0.45)', padding: '0 8px' }}>아이디 찾기</a> |
                        <a href="./find-password.html" style={{ color: 'rgba(0, 0, 0, 0.45)', padding: '0 8px' }}>비밀번호 찾기</a> |
                        <a href="./register.html" style={{ color: 'rgba(0, 0, 0, 0.45)', padding: '0 8px' }}>회원가입</a>
                    </div>
                </Form>

                <div className="social-login">
                    <h3 className="text-center">or</h3>
                    <Button type="primary" size="small" style={{ width: '100%', marginBottom: '8px' }}>Facebook</Button>
                    <Button type="primary" danger size="small" style={{ width: '100%', marginBottom: '8px' }}>Google</Button>
                    <Button type="default" size="small" style={{ width: '100%', marginBottom: '8px', backgroundColor: '#1ec800', color: '#fff' }}>Naver</Button>
                    <Button type="default" size="small" style={{ width: '100%', marginBottom: '8px', backgroundColor: '#fee500', color: '#000' }}>Kakao</Button>
                    <Button type="default" size="small" style={{ width: '100%', marginBottom: '8px' }}>Apple</Button>
                </div>

                <div className="copyright" style={{ marginTop: '16px' }}>
                    <p className="text-center">©Colla soft. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
