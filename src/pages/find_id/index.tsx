import { Button, Input, Form, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styles from './find_id.module.css';

const { Title, Text } = Typography;

function FindId() {
    const navigate = useNavigate();

    const goToFindPassword = () => {
        navigate('/module/forgotpassword');
    };

    return (
        <div className={styles.wrapper}>
            <a href="/" className={styles.logo}>
                <img src={Logo} alt="Logo" style={{ maxWidth: '250px' }} />
            </a>
            <Title level={1} className={styles.title}>아이디 찾기</Title>
            <Text type="secondary" className={styles.lead}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <div className={styles.formWrapper}>
                <Form layout="vertical" style={{ textAlign: 'left' }}>
                    <Form.Item label="이름" style={{ marginBottom: '16px' }}>
                        <Input
                            placeholder="이름을 입력해주세요"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item label="이메일 주소" style={{ marginBottom: '16px' }}>
                        <Input
                            type="email"
                            placeholder="회원가입시 등록한 이메일 주소를 입력해 주세요."
                            size="large"
                        />
                    </Form.Item>
                    <Button type="primary" size="large" block>
                        아이디 찾기
                    </Button>

                    <div className="text-center mt-2" style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Button type="link" onClick={goToFindPassword} style={{ padding: '0 8px' }}>
                            비밀번호 찾기
                        </Button>
                        <Link to="/module/login" style={{ padding: '0 8px' }}>
                            로그인
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

export default FindId;
