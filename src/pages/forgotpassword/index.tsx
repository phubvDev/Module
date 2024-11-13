import { Button, Input, Form, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styles from './forgotpassword.module.css';

const { Title, Text } = Typography;

function ForgotPassword() {
    const navigate = useNavigate();

    // Hàm điều hướng đến trang đăng nhập
    const goToLogin = () => {
        navigate('/module/login');
    };

    return (
        <div className={styles.wrapper}>
            <a href="/" className={styles.logo}>
                <img src={Logo} alt="Logo" />
            </a>
            <Title level={1} className={styles.title}>비밀번호 찾기</Title>
            <Text type="secondary" className={styles.lead}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <div className={styles.formWrapper}>
                <Form layout="vertical" style={{ textAlign: 'left' }}>
                    <Form.Item label="아이디" style={{ marginBottom: '16px' }}>
                        <Input
                            placeholder="가입하신 아이디를 입력 해 주세요."
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item label="이메일 주소" style={{ marginBottom: '16px' }}>
                        <Input.Group compact>
                            <Input
                                type="email"
                                placeholder="이메일 주소를 입력 해 주세요."
                                size="large"
                                style={{ width: '80%' }}
                            />
                            <Button type="primary" style={{ whiteSpace: 'nowrap' }}>
                                임시비번 발송
                            </Button>
                        </Input.Group>
                    </Form.Item>

                    <div className={styles.actions}>
                        {/* Sử dụng sự kiện nhấn nút để điều hướng */}
                        <Button type="default" size="large" block onClick={goToLogin} className={styles.actionButton}>
                            로그인
                        </Button>
                        <Link to="/find-id" className={styles.actionButton} style={{ marginLeft: '16px' }}>
                            <Button type="primary" size="large" block>
                                아이디 찾기
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>

            <div className={styles.copyright}>
                <p>©Colla soft. All rights reserved.</p>
            </div>
        </div>
    );
}

export default ForgotPassword;
