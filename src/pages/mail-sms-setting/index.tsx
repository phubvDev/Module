import React from "react";
import { Form, Input, Radio, Button, Breadcrumb } from "antd";
import Sidebar from "../sidebar";
import styles from "./mail-sms-setting.module.css";

// Định nghĩa kiểu dữ liệu cho giá trị Form
interface MailSmsFormValues {
    mail_use: string;
    mail_username: string;
    mail_password: string;
    mail_from_name: string;
    sms_use: string;
    sms_sent_id: string;
    sms_sent_access_key_id: string;
    sms_sent_secret_key: string;
    sms_delivery_phone: string;
}

const MailSmsSetting: React.FC = () => {
    const [form] = Form.useForm<MailSmsFormValues>();

    const handleSubmit = (values: MailSmsFormValues) => {
        console.log("Submitted Values:", values);
        // Thực hiện xử lý logic gửi dữ liệu
    };

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <Sidebar />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Mail/SMS 사용설정</h1>
                    </div>
                    <Breadcrumb className={styles.breadcrumb}>
                        <Breadcrumb.Item>
                            <a href="./">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="javascript:;">회원관리</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Mail/SMS 사용설정</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/* Form */}
                <div className={styles.card}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className={styles.form}
                    >
                        {/* Mail Settings */}
                        <div className={styles.section}>
                            <h6 className={styles.sectionTitle}>Mail 사용여부</h6>
                            <Form.Item
                                name="mail_use"
                                label="사용여부"
                                initialValue="1"
                            >
                                <Radio.Group>
                                    <Radio value="1">사용함</Radio>
                                    <Radio value="0">사용안함</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="mail_username"
                                label="GMAIL ADDRESS"
                                rules={[
                                    {
                                        required: true,
                                        message: "GMAIL 주소를 입력하세요.",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter GMAIL Address" />
                            </Form.Item>
                            <Form.Item
                                name="mail_password"
                                label="GMAIL APP PASSWORD"
                                rules={[
                                    {
                                        required: true,
                                        message: "GMAIL 비밀번호를 입력하세요.",
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Enter GMAIL App Password" />
                            </Form.Item>
                            <Form.Item
                                name="mail_from_name"
                                label="GMAIL FROM NAME"
                                rules={[
                                    {
                                        required: true,
                                        message: "발송자 이름을 입력하세요.",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter Sender Name" />
                            </Form.Item>
                        </div>

                        {/* SMS Settings */}
                        <div className={styles.section}>
                            <h6 className={styles.sectionTitle}>SMS 사용여부</h6>
                            <Form.Item
                                name="sms_use"
                                label="사용여부"
                                initialValue="1"
                            >
                                <Radio.Group>
                                    <Radio value="1">사용함</Radio>
                                    <Radio value="0">사용안함</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="sms_sent_id"
                                label="SENT ID"
                                rules={[
                                    {
                                        required: true,
                                        message: "SENT ID를 입력하세요.",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter SENT ID" />
                            </Form.Item>
                            <Form.Item
                                name="sms_sent_access_key_id"
                                label="SENT Access Key ID"
                            >
                                <Input placeholder="Enter Access Key ID" />
                            </Form.Item>
                            <Form.Item
                                name="sms_sent_secret_key"
                                label="SENT Secret Key"
                            >
                                <Input placeholder="Enter Secret Key" />
                            </Form.Item>
                            <Form.Item
                                name="sms_delivery_phone"
                                label="발송 전화번호"
                            >
                                <Input placeholder="Enter Phone Number" />
                            </Form.Item>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.actions}>
                            <Button type="primary" htmlType="submit">
                                확인
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default MailSmsSetting;
