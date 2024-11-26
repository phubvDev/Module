import React, { useState } from "react";
import { Form, Input, Radio, Button, Card, RadioChangeEvent } from "antd";
import Sidebar from "../sidebar";
import styles from "./sms.module.css"; // Import CSS module

const SmsManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [smsUse, setSmsUse] = useState<string>("1");
    const [smsTitle, setSmsTitle] = useState<string>("");
    const [smsContent, setSmsContent] = useState<string>("");

    const handleRadioChange = (e: RadioChangeEvent) => {
        setSmsUse(e.target.value);
    };

    const handleFormSubmit = () => {
        const values = form.getFieldsValue();
        console.log("Form values:", values);
        alert("SMS 설정이 저장되었습니다!");
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <Sidebar />
            </div>

            {/* Nội dung chính */}
            <div className={styles.bodyContent}>
                {/* Header */}
                <section className="content-header">
                    <div>
                        <h1 className="m-0">SMS</h1>
                    </div>
                </section>

                {/* Main Content */}
                <section className="content">
                    <div>
                        <Card title="검색정보" className={styles["card-primary"]}>
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    sms_use: smsUse,
                                    sms_title: smsTitle,
                                    sms_content: smsContent,
                                }}
                            >
                                {/* Radio chọn 구분 */}
                                <Form.Item label="구분" name="sms_use">
                                    <Radio.Group
                                        value={smsUse}
                                        onChange={handleRadioChange}
                                        className={styles["radio-group"]}
                                    >
                                        <Radio value="1">전체</Radio>
                                        <Radio value="2">지정</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                {/* Input cho Tiêu đề SMS */}
                                <Form.Item
                                    label="SMS 제목"
                                    name="sms_title"
                                    rules={[{ required: true, message: "제목을 입력해주세요!" }]}
                                >
                                    <Input
                                        placeholder="SMS 제목을 입력해주세요"
                                        value={smsTitle}
                                        onChange={(e) => setSmsTitle(e.target.value)}
                                    />
                                </Form.Item>

                                {/* Nội dung SMS */}
                                <Form.Item
                                    label="내용"
                                    name="sms_content"
                                    rules={[{ required: true, message: "내용을 입력해주세요!" }]}
                                >
                                    <Input.TextArea
                                        placeholder="내용을 입력해주세요"
                                        value={smsContent}
                                        onChange={(e) => setSmsContent(e.target.value)}
                                        rows={4}
                                    />
                                </Form.Item>

                                {/* Button */}
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={handleFormSubmit}
                                        className={styles["btn-primary"]}
                                    >
                                        작성하기
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SmsManagement;
