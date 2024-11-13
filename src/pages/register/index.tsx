import { useState } from 'react';
import { Form, Input, Button, Checkbox, Collapse, Typography, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import DaumPostcode from 'react-daum-postcode';
import { Link } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Logo from '../../assets/images/logo.png';

const { Title, Text } = Typography;
const { Panel } = Collapse;

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

        // Update "Tất cả đồng ý" khi tất cả điều khoản đã được chọn
        setAllChecked(Object.values({ ...checkedItems, [key]: checked }).every(Boolean));
    };

    const handleComplete = (data: { address: string; zonecode: string }) => {
        const addressInput = document.getElementById('address') as HTMLInputElement | null;
        const zipcodeInput = document.getElementById('zipcode') as HTMLInputElement | null;

        if (addressInput) addressInput.value = data.address;
        if (zipcodeInput) zipcodeInput.value = data.zonecode;

        setIsPostcodeOpen(false);
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: '2rem', textAlign: 'center' }}>
            <img src={Logo} alt="Logo" style={{ maxWidth: '250px', marginBottom: '1rem' }} />
            <Title level={2}>회원가입</Title>
            <Text type="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            <Form layout="vertical" style={{ marginTop: '2rem' }}>
                <Form.Item label={<><span style={{ color: 'red' }}>*</span> 아이디</>} required>
                    <Input.Group compact>
                        <Input placeholder="영문숫자 3자이상 입력해 주세요." style={{ width: '80%' }} />
                        <Button type="primary">중복확인</Button>
                    </Input.Group>
                </Form.Item>

                <Form.Item label={<><span style={{ color: 'red' }}>*</span> 비밀번호</>} required>
                    <Input.Password
                        placeholder="영문,숫자,특수문자 포함 8자 이상 입력해 주세요"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        visibilityToggle={false}
                        suffix={<Button onClick={togglePasswordVisibility} type="link">{showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}</Button>}
                        type={showPassword ? 'text' : 'password'}
                    />
                </Form.Item>

                <Form.Item label={<><span style={{ color: 'red' }}>*</span> 비밀번호 재입력</>} required>
                    <Input.Password
                        placeholder="비밀번호를 재입력해 주세요"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        visibilityToggle={false}
                        suffix={<Button onClick={toggleRePasswordVisibility} type="link">{showRePassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}</Button>}
                        type={showRePassword ? 'text' : 'password'}
                    />
                </Form.Item>

                <Form.Item label={<><span style={{ color: 'red' }}>*</span> 이름</>} required>
                    <Input placeholder="이름을 입력해 주세요." />
                </Form.Item>

                <Form.Item label="휴대폰 번호">
                    <Input placeholder="‘-‘자를 제외하고 입력해 주세요." />
                </Form.Item>

                <Form.Item label={<><span style={{ color: 'red' }}>*</span> 이메일 주소</>} required>
                    <Input.Group compact>
                        <Input type="email" placeholder="이메일 형식으로 입력해주세요." style={{ width: '80%' }} />
                        <Button type="primary">인증메일 발송</Button>
                    </Input.Group>
                    <Input.Group compact style={{ marginTop: '10px' }}>
                        <Input placeholder="인증코드 6자리를 입력해주세요.." style={{ width: '80%' }} />
                        <Button type="primary">인증코드 입력</Button>
                    </Input.Group>
                    <Text type="secondary">비밀번호 및 아이디 찾기, 기타 정보발송에 이메일 주소가 사용됩니다.</Text>
                </Form.Item>

                <Form.Item label="주소">
                    <Input.Group compact>
                        <Input placeholder="우편번호를 입력해 주세요." style={{ width: '80%' }} id="zipcode" readOnly />
                        <Button type="primary" onClick={() => setIsPostcodeOpen(true)}>주소찾기</Button>
                    </Input.Group>
                    <Input placeholder="주소를 입력해 주세요." style={{ marginTop: '10px' }} id="address" readOnly />
                    <Input placeholder="상세주소를 입력해 주세요." style={{ marginTop: '10px' }} id="address-detail" />
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

                <Form.Item label="추천인 ID">
                    <Input placeholder="추천인 ID는 나중에 변경 할 수 없습니다." />
                </Form.Item>

                <Form.Item>
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

                <Button type="primary" block style={{ marginTop: '20px' }}>동의하고 회원가입</Button>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Link to="/module/findid" style={{ marginRight: '10px' }}>아이디 찾기</Link> |
                    <Link to="/module/login" style={{ marginLeft: '10px' }}>로그인</Link>
                </div>
            </Form>

            <div style={{ marginTop: '20px', textAlign: 'center', color: '#888' }}>
                <p>©Colla soft. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Register;
