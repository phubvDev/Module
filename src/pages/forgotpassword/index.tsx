import { Button, Input, Form, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styles from './forgotpassword.module.css';
import axios from 'axios';

const { Title, Text } = Typography;

interface ForgotPasswordFormValues {
    userId: string;
    email: string;
}

function ForgotPassword() {
    const navigate = useNavigate();

    // Điều hướng về trang login
    const goToLogin = () => {
        navigate('/module/login');
    };

    // Điều hướng về trang tìm ID
    const goToFindId = () => {
        navigate('/module/findid');
    };

    // Hàm xử lý submit form
    const onSubmit = async (values: ForgotPasswordFormValues) => {
        const { userId, email } = values;

        try {
            // Gửi request kiểm tra userId và email
            const response = await axios.post('http://localhost:8080/api/avansoft/module/auth/forgot-password', { userId, email });

            if (response.data.status === 'success') {
                // Nếu thành công, thông báo cho người dùng và chuyển hướng
                message.success('Mật khẩu tạm thời đã được gửi qua email.');
                navigate('/module/login');
            } else {
                // Nếu thất bại, hiển thị lỗi
                message.error('Vui lòng kiểm tra ID và email');
            }
        } catch  {
            // Hiển thị lỗi khi gọi API thất bại
            message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <a href="/" className={styles.logo}>
                <img src={Logo} alt="Logo" style={{ maxWidth: '250px' }} />
            </a>
            <Title level={1} className={styles.title}>비밀번호 찾기</Title>
            <Text type="secondary" className={styles.lead}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <div className={styles.formWrapper}>
                {/* Form gửi mật khẩu tạm thời */}
                <Form layout="vertical" onFinish={onSubmit} style={{ textAlign: 'left' }}>
                    <Form.Item label="아이디" name="userId" style={{ marginBottom: '16px' }}>
                        <Input placeholder="가입하신 아이디를 입력 해 주세요." size="large" />
                    </Form.Item>

                    {/* Email input và nút gửi mật khẩu tạm thời, sử dụng Flex để căn chỉnh */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Form.Item name="email" style={{ flex: 1, marginBottom: 0 }}>
                            <Input
                                type="email"
                                placeholder="이메일 주소를 입력 해 주세요."
                                size="large"
                            />
                        </Form.Item>

                        {/* Nút bấm gửi mật khẩu tạm thời */}
                        <Form.Item style={{ marginLeft: '16px', marginBottom: 0 }}>
                            <Button
                                type="primary"
                                size="large"
                                style={{ whiteSpace: 'nowrap', width: '110px' }}
                                htmlType="submit" // Submit form khi bấm
                            >
                                임시비번 발송
                            </Button>
                        </Form.Item>
                    </div>

                    {/* Các nút điều hướng */}
                    <Form.Item style={{ marginBottom: '16px', marginTop: '32px' }}>
                        <div className={styles.inputEmail}>
                            <Button type="default" size="large" block onClick={goToLogin} className={styles.actionButton}>
                                로그인
                            </Button>
                            <Button type="primary" size="large" block onClick={goToFindId} style={{ whiteSpace: 'nowrap', marginLeft: '16px' }}>
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
