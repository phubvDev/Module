import { useState } from 'react';
import { Form, Input, Button, Checkbox, Collapse, Typography, Modal, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import DaumPostcode from 'react-daum-postcode';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styles from './register.module.css';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import axios from 'axios';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface UserData {
    username: string;
    password: string;
    email: string;
    [key: string]: string;
}

const Register: React.FC = () => {
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        privacy: false,
        delegation: false,
        thirdParty: false,
        marketing: false,
        emailConsent: false,
        smsConsent: false,
        appPushConsent: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [form] = Form.useForm();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword);

    const handleAllCheckChange = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setCheckedItems({
            terms: checked,
            privacy: checked,
            delegation: checked,
            thirdParty: checked,
            marketing: checked,
            emailConsent: checked,
            smsConsent: checked,
            appPushConsent: checked
        });
    };

    const handleIndividualCheckChange = (key: string, checked: boolean) => {
        setCheckedItems(prev => ({ ...prev, [key]: checked }));
        setAllChecked(Object.values({ ...checkedItems, [key]: checked }).every(Boolean));
    };

    const handleComplete = (data: { address: string; zonecode: string }) => {
        const addressInput = document.getElementById('address') as HTMLInputElement | null;
        const zipcodeInput = document.getElementById('zipcode') as HTMLInputElement | null;

        if (addressInput) addressInput.value = data.address;
        if (zipcodeInput) zipcodeInput.value = data.zonecode;

        setIsPostcodeOpen(false);
    };

    // Gửi mã xác minh đến email
    const sendVerificationCode = async () => {
        const email = form.getFieldValue('email');
        if (!email) {
            message.warning('Vui lòng nhập email trước khi gửi mã xác minh');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/auth/send-verification-code', { email });
            message.success('Mã xác minh đã được gửi đến email của bạn');
        } catch {
            message.error('Không thể gửi mã xác minh. Vui lòng thử lại sau');
        }
    };

    // Xác thực mã xác minh
    const verifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/verify-code', {
                email: form.getFieldValue('email'),
                code: verificationCode
            });

            if (response.data.success) {
                message.success('Xác minh thành công');
                setIsVerified(true);
            } else {
                message.error('Mã xác minh không đúng');
            }
        } catch {
            message.error('Lỗi xác minh. Vui lòng thử lại');
        }
    };

    // Kiểm tra các checkbox điều khoản bắt buộc đã được chọn chưa
    const hasRequiredAgreements = () => {
        const { terms, privacy, delegation, thirdParty } = checkedItems;
        return terms && privacy && delegation && thirdParty;
    };

    // Kiểm tra xem người dùng đã tồn tại trong CSDL chưa
    const checkUserExists = async (username: string, email: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/check-user-exists', { username, email });
            return response.data.exists;
        } catch {
            message.error("Lỗi khi kiểm tra người dùng. Vui lòng thử lại.");
            return false;
        }
    };

    // Gửi yêu cầu đăng ký
    const handleRegister = async (values: UserData) => {
        if (!isVerified) {
            message.warning('Vui lòng xác minh mã trước khi đăng ký');
            return;
        }

        if (!hasRequiredAgreements()) {
            message.warning('Vui lòng đồng ý với các điều khoản bắt buộc');
            return;
        }

        const userExists = await checkUserExists(values.username, values.email);
        if (userExists) {
            message.warning('Người dùng đã tồn tại. Vui lòng sử dụng tên đăng nhập hoặc email khác');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/auth/register', values);
            message.success("Đăng ký thành công!");
        } catch {
            message.error("Đăng ký thất bại, vui lòng thử lại.");
        }
    };

    return (
        <div className={styles.wrapper}>
            <a href="/" className={styles.logoLink}>
                <img src={Logo} alt="Logo" style={{ maxWidth: '250px' }} />
            </a>
            <Title level={1}>회원가입</Title>
            <Text type="secondary" className={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <div className={styles.formContainer}>
                <Form form={form} layout="vertical" style={{ textAlign: 'left' }} onFinish={handleRegister}>
                    <Form.Item name="username" label={<> 아이디</>} required style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input placeholder="영문숫자 3자이상 입력해 주세요." style={{ flex: 1, marginRight: '16px' }} />
                            <Button type="primary" style={{ whiteSpace: 'nowrap' }}>중복확인</Button>
                        </div>
                    </Form.Item>

                    <Form.Item name="password" label={<> 비밀번호</>} required style={{ marginBottom: '16px' }}>
                        <Input.Password
                            placeholder="영문,숫자,특수문자 포함 8자 이상 입력해 주세요"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            visibilityToggle={false}
                            suffix={<Button onClick={togglePasswordVisibility} type="link">{showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}</Button>}
                            type={showPassword ? 'text' : 'password'}
                        />
                    </Form.Item>

                    <Form.Item name="repassword" label={<> 비밀번호 재입력</>} required style={{ marginBottom: '16px' }}>
                        <Input.Password
                            placeholder="비밀번호를 재입력해 주세요"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            visibilityToggle={false}
                            suffix={<Button onClick={toggleRePasswordVisibility} type="link">{showRePassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}</Button>}
                            type={showRePassword ? 'text' : 'password'}
                        />
                    </Form.Item>

                    <Form.Item name="name" label={<> 이름</>} required style={{ marginBottom: '16px' }}>
                        <Input placeholder="이름을 입력해 주세요." />
                    </Form.Item>

                    <Form.Item name="phone" label="휴대폰 번호" style={{ marginBottom: '16px' }}>
                        <Input placeholder="‘-‘자를 제외하고 입력해 주세요." />
                    </Form.Item>

                    <Form.Item name="email" label={<> 이메일 주소</>} required style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input type="email" placeholder="이메일 형식으로 입력해주세요." style={{ flex: 1, marginRight: '16px' }} />
                            <Button type="primary" onClick={sendVerificationCode} style={{ whiteSpace: 'nowrap' }}>인증메일 발송</Button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px', marginBottom: '16px' }}>
                            <Input
                                type="text"
                                placeholder="인증코드 6자리를 입력해주세요.."
                                style={{ flex: 1, marginRight: '16px' }}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <Button type="primary" onClick={verifyCode} style={{ whiteSpace: 'nowrap' }}>인증코드 입력</Button>
                        </div>
                        <Text type="secondary">비밀번호 및 아이디 찾기, 기타 정보발송에 이메일 주소가 사용됩니다.</Text>
                    </Form.Item>

                    <Form.Item label="주소" style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Input placeholder="우편번호를 입력해 주세요." style={{ flex: 1, marginRight: '16px' }} id="zipcode" readOnly />
                            <Button type="primary" onClick={() => setIsPostcodeOpen(true)}>주소찾기</Button>
                        </div>
                        <Input placeholder="주소를 입력해 주세요." style={{ marginBottom: '10px' }} id="address" readOnly />
                        <Input placeholder="상세주소를 입력해 주세요." />
                    </Form.Item>

                    {isPostcodeOpen && (
                        <Modal
                            visible={isPostcodeOpen}
                            onCancel={() => setIsPostcodeOpen(false)}
                            footer={null}
                            style={{ top: 20 }}
                        >
                            <DaumPostcode onComplete={handleComplete} />
                        </Modal>
                    )}

                    <Form.Item name="referrer" label="추천인 ID" style={{ marginBottom: '16px' }}>
                        <Input placeholder="추천인 ID는 나중에 변경 할 수 없습니다." />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Checkbox checked={allChecked} onChange={handleAllCheckChange}>
                            <b>모두 동의</b> <Text type="secondary">(필수 및 선택 항목 동의 포함)</Text>
                        </Checkbox>
                    </Form.Item>

                    <Collapse>
                        <Panel header={<Checkbox checked={checkedItems.terms} onChange={(e) => handleIndividualCheckChange('terms', e.target.checked)}>이용약관 동의 (필수)</Checkbox>} key="1">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.privacy} onChange={(e) => handleIndividualCheckChange('privacy', e.target.checked)}>개인정보수집·이용 동의(필수)</Checkbox>} key="2">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.delegation} onChange={(e) => handleIndividualCheckChange('delegation', e.target.checked)}>개인정보처리·위탁 동의(필수)</Checkbox>} key="3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.thirdParty} onChange={(e) => handleIndividualCheckChange('thirdParty', e.target.checked)}>개인정보 제3자 제공 동의(필수)</Checkbox>} key="4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.marketing} onChange={(e) => handleIndividualCheckChange('marketing', e.target.checked)}>마케팅 활용 동의 (선택)</Checkbox>} key="5">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.emailConsent} onChange={(e) => handleIndividualCheckChange('emailConsent', e.target.checked)}>이메일 수신 동의(선택)</Checkbox>} key="6">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.smsConsent} onChange={(e) => handleIndividualCheckChange('smsConsent', e.target.checked)}>SMS수신 동의(선택)</Checkbox>} key="7">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.appPushConsent} onChange={(e) => handleIndividualCheckChange('appPushConsent', e.target.checked)}>앱 푸시 수신 동의(선택)</Checkbox>} key="8">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                    </Collapse>

                    <Button type="primary" block style={{ marginTop: '20px' }} htmlType="submit">동의하고 회원가입</Button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link to="/module/findid" style={{ marginRight: '10px' }}>아이디 찾기</Link> |
                        <Link to="/module/login" style={{ marginLeft: '10px' }}>로그인</Link>
                    </div>
                </Form>
            </div>

            <div className={styles.subtitle}>
                <p>©Colla soft. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Register;
