import { Button, Input, Form, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styles from './find_id.module.css';
import axios from 'axios';

const { Title, Text } = Typography;

interface FormValues {
    name: string;
    email: string;
}

function FindId() {
    const navigate = useNavigate();

    const goToFindPassword = () => {
        navigate('/module/forgotpassword');
    };
    const goToLogin = () => {
        // Chuyển hướng về trang đăng nhập
        navigate('/module/login');
    };

    // Hàm xử lý khi form được submit
    const onSubmit = async (values: FormValues) => {
        const { name, email } = values;

        try {
            // Gửi request đến API để tìm kiếm user_id theo name và email
            const response = await axios.post('http://localhost:8080/api/avansoft/module/auth/find-id', { name, email });

            if (response.data.status === 'success') {
                // Nếu thành công, thông báo và yêu cầu người dùng kiểm tra email
                message.success('User ID đã được gửi đến email của bạn.');
                goToLogin();
            } else {
                // Nếu không tìm thấy, hiển thị thông báo lỗi
                message.error('Không tìm thấy tài khoản với thông tin này.');
            }
        } catch {
            // Nếu có lỗi xảy ra khi gọi API
            message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
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
                <Form layout="vertical" style={{ textAlign: 'left' }} onFinish={onSubmit}>
                    <Form.Item label="이름" name="name" style={{ marginBottom: '16px' }} rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="이름을 입력해주세요" size="large" />
                    </Form.Item>
                    <Form.Item label="이메일 주소" name="email" style={{ marginBottom: '16px' }} rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
                        <Input type="email" placeholder="회원가입시 등록한 이메일 주소를 입력해 주세요." size="large" />
                    </Form.Item>
                    <Button type="primary" size="large" block htmlType="submit">
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
