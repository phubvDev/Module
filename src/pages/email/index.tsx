import React, { useState } from "react";
import { Form, Input, Radio, Button, Card } from "antd";
import { RadioChangeEvent } from "antd";
import Sidebar from "../sidebar"; // Import Sidebar component
import styles from "./email.module.css";

const { TextArea } = Input;

const EmailManagement: React.FC = () => {
    const [emailUse, setEmailUse] = useState<string>("1");
    const [emailTo, setEmailTo] = useState<string>("");
    const [emailTitle, setEmailTitle] = useState<string>("");
    const [emailContent, setEmailContent] = useState<string>("");

    const handleRadioChange = (e: RadioChangeEvent) => {
        setEmailUse(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Email Use:", emailUse);
        console.log("Email To:", emailTo);
        console.log("Email Title:", emailTitle);
        console.log("Email Content:", emailContent);
        alert("메일이 발송되었습니다!");
    };

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className={styles.container}>
                <section className={styles.header}>
                    <h1>Email</h1>
                </section>

                <section className={styles.content}>
                    <Card title="검색정보" className={styles.card}>
                        <Form layout="vertical">
                            {/* Người gửi */}
                            <Form.Item label="보내는사람">
                                <div>
                                    <span>Admin &lt;admin@example.com&gt;</span>
                                </div>
                            </Form.Item>

                            {/* Radio 선택 구분 */}
                            <Form.Item label="구분">
                                <Radio.Group value={emailUse} onChange={handleRadioChange}>
                                    <Radio value="1">전체</Radio>
                                    <Radio value="2">지정</Radio>
                                </Radio.Group>
                            </Form.Item>

                            {/* Người nhận */}
                            {emailUse === "2" && (
                                <Form.Item label="받는사람">
                                    <TextArea
                                        rows={5}
                                        value={emailTo}
                                        onChange={(e) => setEmailTo(e.target.value)}
                                        placeholder="수신자 이메일을 입력하세요"
                                    />
                                </Form.Item>
                            )}

                            {/* Tiêu đề Email */}
                            <Form.Item label="제목">
                                <Input
                                    value={emailTitle}
                                    onChange={(e) => setEmailTitle(e.target.value)}
                                    placeholder="이메일 제목을 입력하세요"
                                />
                            </Form.Item>

                            {/* Nội dung Email */}
                            <Form.Item label="내용">
                                <TextArea
                                    rows={10}
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    placeholder="이메일 내용을 입력하세요"
                                />
                            </Form.Item>

                            {/* Submit */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    className={styles.submitButton}
                                >
                                    메일발송
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default EmailManagement;
