import React, { useState } from "react";
import { Button, Tabs, Radio, Form, Input } from "antd";
import Sidebar from "../sidebar"; // Import Sidebar component
import styles from "./policy.module.css";

const { TabPane } = Tabs;
const { TextArea } = Input;

const Policy: React.FC = () => {
    const [termsUse, setTermsUse] = useState(1);
    const [policyUse2, setPolicyUse2] = useState(1);
    const [policyUse3, setPolicyUse3] = useState(1);
    const [policyUse4, setPolicyUse4] = useState(1);
    const [policyUse41, setPolicyUse41] = useState(1);
    const [policyUse42, setPolicyUse42] = useState(1);
    const [policyUse43, setPolicyUse43] = useState(1);
    const [oldUse, setOldUse] = useState(1);

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <Sidebar />

            <div className={styles.container}>
                <section className={styles.header}>
                    <h1>약관/개인정보</h1>
                </section>

                <section className={styles.content}>
                    <Tabs defaultActiveKey="1" type="card">
                        {/* Tab 1: 이용약관 */}
                        <TabPane tab="이용약관" key="1">
                            <h6 className={`${styles.title} ${styles.primary}`}>이용약관 내용</h6>
                            <Form layout="vertical" className={styles.form}>
                                <Form.Item label="구분">
                                    <Radio.Group value={termsUse} onChange={(e) => setTermsUse(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="약관내용">
                                    <TextArea rows={3} placeholder="약관내용 입력" />
                                </Form.Item>

                                <Button type="primary" className={styles.saveButton}>
                                    수정하기
                                </Button>
                            </Form>
                        </TabPane>

                        {/* Tab 2: 개인정보 동의항목 설정 */}
                        <TabPane tab="개인정보 동의항목 설정" key="2">
                            <h6 className={`${styles.title} ${styles.primary}`}>회원 대상 동의항목 설정</h6>

                            {/* 개인정보수집·이용 동의 */}
                            <Form layout="vertical" className={styles.form}>
                                <p className={styles.danger}>[필수] 개인정보수집·이용 동의</p>
                                <Form.Item label="내용입력">
                                    <TextArea rows={3} placeholder="내용입력" />
                                </Form.Item>

                                <p className={styles.danger}>[필수] 개인정보처리·위탁 동의</p>
                                <Form.Item label="사용여부">
                                    <Radio.Group value={policyUse2} onChange={(e) => setPolicyUse2(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="내용입력">
                                    <TextArea rows={3} placeholder="내용입력" />
                                </Form.Item>

                                <p className={styles.danger}>[필수] 개인정보 제3자 제공 동의</p>
                                <Form.Item label="사용여부">
                                    <Radio.Group value={policyUse3} onChange={(e) => setPolicyUse3(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="내용입력">
                                    <TextArea rows={3} placeholder="내용입력" />
                                </Form.Item>

                                <p className={styles.danger}>[선택] 마케팅 활용 동의</p>
                                <Form.Item label="사용여부">
                                    <Radio.Group value={policyUse4} onChange={(e) => setPolicyUse4(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="이메일 수신 동의(선택)">
                                    <Radio.Group value={policyUse41} onChange={(e) => setPolicyUse41(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="SMS수신 동의(선택)">
                                    <Radio.Group value={policyUse42} onChange={(e) => setPolicyUse42(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="앱 푸시 수신 동의(선택)">
                                    <Radio.Group value={policyUse43} onChange={(e) => setPolicyUse43(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="내용입력">
                                    <TextArea rows={3} placeholder="내용입력" />
                                </Form.Item>

                                <Button type="primary" className={styles.saveButton}>
                                    수정하기
                                </Button>
                            </Form>
                        </TabPane>

                        {/* Tab 3: 14세 미만 회원가입 설정 */}
                        <TabPane tab="14세 미만 회원가입 설정" key="3">
                            <h6 className={`${styles.title} ${styles.primary}`}>14세 미만 회원가입 설정</h6>
                            <Form layout="vertical" className={styles.form}>
                                <Form.Item label="사용여부">
                                    <Radio.Group value={oldUse} onChange={(e) => setOldUse(e.target.value)}>
                                        <Radio value={1}>사용함</Radio>
                                        <Radio value={2}>사용 안함</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Button type="primary" className={styles.saveButton}>
                                    수정하기
                                </Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </section>
            </div>
        </div>
    );
};

export default Policy;
