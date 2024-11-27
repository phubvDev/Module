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

interface CheckedItems {
    terms: boolean;
    privacy: boolean;
    delegation: boolean;
    thirdParty: boolean;
    marketing: boolean;
    emailConsent: boolean;
    smsConsent: boolean;
    appPushConsent: boolean;
}

const Register: React.FC = () => {
    const [allChecked, setAllChecked] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        terms: false,
        privacy: false,
        delegation: false,
        thirdParty: false,
        marketing: false,
        emailConsent: false,
        smsConsent: false,
        appPushConsent: false,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [showRePassword, setShowRePassword] = useState<boolean>(false);
    const [form] = Form.useForm();

    // Xử lý checkbox đồng ý tất cả
    const handleAllCheckChange = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setCheckedItems((prev) =>
            Object.keys(prev).reduce(
                (acc, key) => ({...acc, [key]: checked}),
                {} as CheckedItems
            )
        );
    };

    // Xử lý checkbox riêng lẻ
    const handleIndividualCheckChange = (key: keyof CheckedItems, checked: boolean) => {
        setCheckedItems((prev) => {
            const newCheckedItems = {...prev, [key]: checked};
            setAllChecked(Object.values(newCheckedItems).every(Boolean));
            return newCheckedItems;
        });
    };
    // Gửi mã xác minh
    const sendVerificationCode = async () => {
        const email = form.getFieldValue('email');
        if (!email) {
            message.warning('Vui lòng nhập email trước khi gửi mã xác minh');
            return;
        }

        try {
            await axios.post('http://13.124.14.236:8386/api/avansoft/module/email/create', {email});
            message.success('Mã xác minh đã được gửi đến email của bạn');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Lỗi từ Axios (phản hồi từ server)
                const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi không xác định.';
                message.error(errorMessage);
            } else {
                // Lỗi không phải của Axios
                message.error('Không thể gửi mã xác minh. Vui lòng thử lại sau');
            }
        }
    };

    // Xác minh mã xác thực
    const verifyCode = async () => {
        const email = form.getFieldValue('email');
        if (!email || !verificationCode) {
            message.warning('Vui lòng nhập email và mã xác minh.');
            return;
        }

        try {
            const response = await axios.post('http://13.124.14.236:8386/api/avansoft/module/verify-code', {
                email,
                code: verificationCode,
            });

            if (response.data.success) {
                message.success('Mã xác minh hợp lệ.');
                setIsVerified(true);
            } else {
                const errorMessage =
                    response.data.message.includes('not found')
                        ? 'Mã xác minh không tồn tại.'
                        : response.data.message.includes('expired')
                            ? 'Mã xác minh đã hết hạn.'
                            : 'Lỗi không xác định. Vui lòng thử lại.';
                message.error(errorMessage);
                setVerificationCode('');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi không xác định từ máy chủ.';
                message.error(errorMessage);
            } else {
                message.error('Lỗi hệ thống khi xác minh mã. Vui lòng thử lại sau.');
            }
            setVerificationCode('');
        }
    };

    // Kiểm tra xem đã đồng ý các điều khoản cần thiết chưa
    const hasRequiredAgreements = () => {
        const {terms, privacy, delegation, thirdParty} = checkedItems;
        return terms && privacy && delegation && thirdParty;
    };

    const handleUserIdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const userId = e.target.value;
        const userExists = await checkUserIdExists(userId);
        console.log('user', userId);
        if (userExists) {
            message.warning('UserId đã tồn tại. Vui lòng chọn một UserId khác.');
        } else {
            message.success('UserId hợp lệ.');
        }
    };

    const checkUserIdExists = async (userId: string) => {
        try {
            const response = await axios.post('http://13.124.14.236:8386/api/avansoft/module/users/check-username', { userId });
            return response.data.exists; // Kiểm tra nếu userId đã tồn tại
        } catch {
            message.error('Lỗi khi kiểm tra userId. Vui lòng thử lại.');
            return false;
        }
    };



    // Xử lý khi form được submit
    interface RegisterFormValues {
        userId: string;
        password: string;
        email: string;
        phone?: string;
        address?: string;

        [key: string]: unknown; // Để xử lý các trường bổ sung không xác định
    }

    const handleRegister = async (values: RegisterFormValues) => {
        if (!isVerified) {
            message.warning('Vui lòng xác minh mã trước khi đăng ký.');
            return;
        }

        if (!hasRequiredAgreements()) {
            message.warning('Vui lòng đồng ý với các điều khoản bắt buộc.');
            return;
        }

        try {
            // Kiểm tra xem userId có tồn tại không
            const userExists = await checkUserIdExists(values.userId);
            if (userExists) {
                message.warning('UserId đã tồn tại. Vui lòng chọn một UserId khác.');
                return;
            }

            // Gửi dữ liệu đăng ký lên backend
            await axios.post('http://13.124.14.236:8386/api/avansoft/module/users/register', values);
            message.success('Đăng ký thành công!');

            // Reset các trường trong form
            form.resetFields();
            setIsVerified(false);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi không xác định từ máy chủ.';
                message.error(errorMessage);
            } else {
                message.error('Đăng ký thất bại, vui lòng thử lại.');
            }
        }
    };


    return (
        <div className={styles.wrapper}>
            <a href="/" className={styles.logoLink}>
                <img src={Logo} alt="Logo" style={{maxWidth: '250px'}}/>
            </a>
            <Title level={1}>회원가입</Title>
            <Text type="secondary" className={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <div className={styles.formContainer}>
                <Form form={form} layout="vertical" style={{textAlign: 'left'}} onFinish={handleRegister}>
                    <Form.Item name="userId" label="아이디" required style={{marginBottom: '16px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Input
                                placeholder="영문숫자 3자이상 입력해 주세요."
                                style={{flex: 1, marginRight: '16px'}}
                                onBlur={handleUserIdChange}  // Gọi hàm kiểm tra khi mất focus
                            />
                            <Button type="primary" style={{whiteSpace: 'nowrap'}}>중복확인</Button>
                        </div>
                    </Form.Item>


                    <Form.Item name="password" label="비밀번호" required style={{marginBottom: '16px'}}>
                        <Input.Password
                            placeholder="영문,숫자,특수문자 포함 8자 이상 입력해 주세요"
                            type={showPassword ? 'text' : 'password'}
                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            suffix={
                                <Button
                                    onClick={() => setShowPassword(!showPassword)}
                                    type="link"
                                    style={{padding: 0}}
                                >
                                    {showPassword ? <EyeInvisibleOutlined/> : <EyeTwoTone/>}
                                </Button>
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="repassword"
                        label="비밀번호 재입력"
                        rules={[
                            {required: true, message: '비밀번호를 재입력해 주세요!'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                                },
                            }),
                        ]}
                        style={{marginBottom: '16px'}}
                    >
                        <Input.Password
                            placeholder="비밀번호를 재입력해 주세요"
                            type={showRePassword ? 'text' : 'password'}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                            }
                            suffix={
                                <Button
                                    onClick={() => setShowRePassword(!showRePassword)}
                                    type="link"
                                    style={{padding: 0}}
                                >
                                    {showRePassword ? <EyeInvisibleOutlined/> : <EyeTwoTone/>}
                                </Button>
                            }
                        />
                    </Form.Item>

                    <Form.Item name="name" label="이름" required style={{marginBottom: '16px'}}>
                        <Input placeholder="이름을 입력해 주세요."/>
                    </Form.Item>

                    <Form.Item name="phone" label="휴대폰 번호" style={{marginBottom: '16px'}}>
                        <Input placeholder="‘-‘자를 제외하고 입력해 주세요."/>
                    </Form.Item>

                    <Form.Item name="email" label="이메일 주소" style={{marginBottom: '16px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Input name="email" type="email" placeholder="이메일 형식으로 입력해주세요."
                                   style={{flex: 1, marginRight: '16px'}}/>
                            <Button type="primary" onClick={sendVerificationCode} style={{whiteSpace: 'nowrap'}}>인증메일
                                발송</Button>
                        </div>
                    </Form.Item>

                    <Form.Item name="verify" required style={{marginBottom: '16px'}}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>
                            <Input
                                type="text"
                                placeholder="인증코드 6자리를 입력해주세요."
                                style={{flex: 1, marginRight: '16px'}}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <Button type="primary" onClick={verifyCode} style={{whiteSpace: 'nowrap'}}>인증코드 입력</Button>
                        </div>
                        <Text type="secondary">비밀번호 및 아이디 찾기, 기타 정보발송에 이메일 주소가 사용됩니다.</Text>
                    </Form.Item>

                    <Form.Item label="주소" style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <Form.Item
                                name="zipcode"
                                style={{ flex: 1, marginRight: '16px', marginBottom: 0 }}
                                rules={[{ required: true, message: '우편번호를 입력해 주세요.' }]}
                            >
                                <Input placeholder="우편번호를 입력해 주세요." readOnly />
                            </Form.Item>
                            <Button type="primary" onClick={() => setIsPostcodeOpen(true)}>주소찾기</Button>
                        </div>
                        <Form.Item
                            name="address"
                            style={{ marginBottom: '10px' }}
                            rules={[{ required: true, message: '주소를 입력해 주세요.' }]}
                        >
                            <Input placeholder="주소를 입력해 주세요." readOnly />
                        </Form.Item>
                        <Form.Item
                            name="detail_address"
                            style={{ marginBottom: '10px' }}
                            rules={[{ required: true, message: '상세주소를 입력해 주세요.' }]}
                        >
                            <Input placeholder="상세주소를 입력해 주세요." />
                        </Form.Item>
                    </Form.Item>

                    {isPostcodeOpen && (
                        <Modal
                            visible={isPostcodeOpen}
                            onCancel={() => setIsPostcodeOpen(false)}
                            footer={null}
                            style={{ top: 20 }}
                        >
                            <DaumPostcode
                                onComplete={(data) => {
                                    // Cập nhật giá trị của zipcode và address
                                    form.setFieldsValue({
                                        zipcode: data.zonecode, // Gán mã bưu điện
                                        address: data.address, // Gán địa chỉ
                                    });
                                    setIsPostcodeOpen(false); // Đóng modal
                                }}
                            />
                        </Modal>
                    )}


                    <Form.Item name="referrer" label="추천인 ID" style={{marginBottom: '16px'}}>
                        <Input placeholder="추천인 ID는 나중에 변경 할 수 없습니다."/>
                    </Form.Item>

                    <Form.Item style={{marginBottom: '16px'}}>
                        <Checkbox checked={allChecked} onChange={handleAllCheckChange}>
                            <b>모두 동의</b> <Text type="secondary">(필수 및 선택 항목 동의 포함)</Text>
                        </Checkbox>
                    </Form.Item>

                    <Collapse>
                        <Panel header={<Checkbox checked={checkedItems.terms}
                                                 onChange={(e) => handleIndividualCheckChange('terms', e.target.checked)}>이용약관
                            동의 (필수)</Checkbox>} key="1">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.privacy}
                                                 onChange={(e) => handleIndividualCheckChange('privacy', e.target.checked)}>개인정보수집·이용
                            동의(필수)</Checkbox>} key="2">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.delegation}
                                                 onChange={(e) => handleIndividualCheckChange('delegation', e.target.checked)}>개인정보처리·위탁
                            동의(필수)</Checkbox>} key="3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.thirdParty}
                                                 onChange={(e) => handleIndividualCheckChange('thirdParty', e.target.checked)}>개인정보
                            제3자 제공 동의(필수)</Checkbox>} key="4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.marketing}
                                                 onChange={(e) => handleIndividualCheckChange('marketing', e.target.checked)}>마케팅
                            활용 동의 (선택)</Checkbox>} key="5">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.emailConsent}
                                                 onChange={(e) => handleIndividualCheckChange('emailConsent', e.target.checked)}>이메일
                            수신 동의(선택)</Checkbox>} key="6">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.smsConsent}
                                                 onChange={(e) => handleIndividualCheckChange('smsConsent', e.target.checked)}>SMS수신
                            동의(선택)</Checkbox>} key="7">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                        <Panel header={<Checkbox checked={checkedItems.appPushConsent}
                                                 onChange={(e) => handleIndividualCheckChange('appPushConsent', e.target.checked)}>앱
                            푸시 수신 동의(선택)</Checkbox>} key="8">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Panel>
                    </Collapse>

                    <Button type="primary" block style={{marginTop: '20px'}} htmlType="submit">동의하고 회원가입</Button>
                    <div style={{marginTop: '10px', textAlign: 'center'}}>
                        <Link to="/module/findid" style={{marginRight: '10px'}}>아이디 찾기</Link> |
                        <Link to="/module/login" style={{marginLeft: '10px'}}>로그인</Link>
                    </div>
                </Form>
            </div>

            <div className={styles.subtitle}>
                <p>©Colla soft. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Register