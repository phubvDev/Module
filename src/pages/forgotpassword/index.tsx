import { Button, Input, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styles from './forgotpassword.module.css';

const { Title, Text } = Typography;

function ForgotPassword() {
    const navigate = useNavigate();


    const goToLogin = () => {
        navigate('/module/login');
    };
    const goToFindId = () =>{
        navigate('/module/findid');
    }

    return (
        <div className={styles.wrapper}>
            <a href="/" className={styles.logo}>
                <img src={Logo} alt="Logo" style={{maxWidth: '250px'}}/>
            </a>
            <Title level={1} className={styles.title}>비밀번호 찾기</Title>
            <Text type="secondary" className={styles.lead}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <div className={styles.formWrapper}>
                <Form layout="vertical" style={{textAlign: 'left'}}>
                    <Form.Item label="아이디" style={{marginBottom: '16px'}}>
                        <Input
                            placeholder="가입하신 아이디를 입력 해 주세요."
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item label="이메일 주소" style={{ marginBottom: '16px' }}>
                        <div className={styles.inputEmail} style={{ display: 'flex', alignItems: 'center' }}>
                            <Input
                                type="email"
                                placeholder="이메일 주소를 입력 해 주세요."
                                size="large"
                                style={{ flex: 1, marginRight: '16px' }}
                            />
                            <Button
                                type="primary"
                                size="large"
                                style={{ whiteSpace: 'nowrap', width: '110px' }}
                            >
                                임시비번 발송
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item style={{marginBottom: '16px', marginTop: '32px'}}>
                        <div  className={styles.inputEmail}>
                            <Button type="default" size="large" block onClick={goToLogin} className={styles.actionButton}>
                                로그인
                            </Button>
                            <Button type="primary" size="large" block onClick={goToFindId} style={{whiteSpace: 'nowrap', marginLeft: '16px'}}>
                                아이디 찾기
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>

            <div className={styles.copyright}>
                <p>©Colla soft. All rights reserved.</p>
            </div>
        </div>
    );
}

export default ForgotPassword;
