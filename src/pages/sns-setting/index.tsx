import React, { useState } from "react";
import { Radio, Input, Button, Form, Breadcrumb } from "antd";
import Sidebar from "../sidebar"; // Import Sidebar component
import styles from "./sns-setting.module.css";

const SnsSetting: React.FC = () => {
    const [snsUse, setSnsUse] = useState(1);
    const [facebookUse, setFacebookUse] = useState(1);
    const [naverUse, setNaverUse] = useState(1);
    const [kakaoUse, setKakaoUse] = useState(1);
    const [googleUse, setGoogleUse] = useState(1);
    const [appleUse, setAppleUse] = useState(1);

    const handleSubmit = (values: any) => {
        console.log("Form Submitted:", values);
    };

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <Sidebar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1>SNS 로그인 설정</h1>
                    </div>
                    <Breadcrumb className={styles.breadcrumb}>
                        <Breadcrumb.Item>
                            <a href="./">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="javascript:;">회원관리</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>SNS 로그인 설정</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    className={styles.form}
                >
                    {/* SNS 사용 여부 */}
                    <div className={styles.sectionHeader}>SNS사용여부</div>
                    <Form.Item label="사용여부">
                        <Radio.Group
                            value={snsUse}
                            onChange={(e) => setSnsUse(e.target.value)}
                        >
                            <Radio value={1}>사용함</Radio>
                            <Radio value={0}>사용안함</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="콜백 URL" name="url_callback">
                        <Input placeholder="콜백 URL 입력" />
                    </Form.Item>

                    {/* Facebook */}
                    <div className={styles.sectionHeader}>Facebook</div>
                    <Form.Item label="사용여부">
                        <Radio.Group
                            value={facebookUse}
                            onChange={(e) => setFacebookUse(e.target.value)}
                        >
                            <Radio value={1}>사용함</Radio>
                            <Radio value={0}>사용안함</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Facebook App ID" name="facebook_id">
                        <Input placeholder="Facebook App ID 입력" />
                    </Form.Item>
                    <Form.Item label="Facebook App Secret" name="facebook_secret">
                        <Input placeholder="Facebook App Secret 입력" />
                    </Form.Item>

                    {/* Naver */}
                    <div className={styles.sectionHeader}>Naver</div>
                    <Form.Item label="사용여부">
                        <Radio.Group
                            value={naverUse}
                            onChange={(e) => setNaverUse(e.target.value)}
                        >
                            <Radio value={1}>사용함</Radio>
                            <Radio value={0}>사용안함</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Naver Client ID" name="naver_id">
                        <Input placeholder="Naver Client ID 입력" />
                    </Form.Item>
                    <Form.Item label="Naver Client Secret" name="naver_secret">
                        <Input placeholder="Naver Client Secret 입력" />
                    </Form.Item>

                    {/* Kakao */}
                    <div className={styles.sectionHeader}>Kakao</div>
                    <Form.Item label="사용여부">
                        <Radio.Group
                            value={kakaoUse}
                            onChange={(e) => setKakaoUse(e.target.value)}
                        >
                            <Radio value={1}>사용함</Radio>
                            <Radio value={0}>사용안함</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Kakao REST API Key" name="kakao_id">
                        <Input placeholder="Kakao REST API Key 입력" />
                    </Form.Item>
                    <Form.Item label="Kakao Client Secret" name="kakao_secret">
                        <Input placeholder="Kakao Client Secret 입력" />
                    </Form.Item>

                    {/* Google */}
                    <div className={styles.sectionHeader}>Google</div>
                    <Form.Item label="사용여부">
                        <Radio.Group
                            value={googleUse}
                            onChange={(e) => setGoogleUse(e.target.value)}
                        >
                            <Radio value={1}>사용함</Radio>
                            <Radio value={0}>사용안함</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Google Client ID" name="google_id">
                        <Input placeholder="Google Client ID 입력" />
                    </Form.Item>
                    <Form.Item label="Google Client Secret" name="google_secret">
                        <Input placeholder="Google Client Secret 입력" />
                    </Form.Item>

                    {/* Apple */}
                    <div className={styles.sectionHeader}>Apple</div>
                    <Form.Item label="사용여부">
                        <Radio.Group
                            value={appleUse}
                            onChange={(e) => setAppleUse(e.target.value)}
                        >
                            <Radio value={1}>사용함</Radio>
                            <Radio value={0}>사용안함</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Apple Client ID" name="apple_id">
                        <Input placeholder="Apple Client ID 입력" />
                    </Form.Item>
                    <Form.Item label="Apple Client Secret" name="apple_secret">
                        <Input placeholder="Apple Client Secret 입력" />
                    </Form.Item>

                    <div className={styles.actions}>
                        <Button type="primary" htmlType="submit" className={styles.button}>
                            확인
                        </Button>
                        <Button htmlType="button" className={styles.button}>
                            취소
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SnsSetting;
