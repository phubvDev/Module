import React from "react";
import { Input, Radio, Button, Breadcrumb, Form } from "antd";
import Sidebar from "../sidebar";
import styles from "./level.module.css";

interface LevelFormValues {
    [key: string]: string | number;
}

const { Item: FormItem } = Form;

const Level: React.FC = () => {
    const levels = Array.from({ length: 10 }, (_, index) => index); // Tạo danh sách level từ 0-9

    const handleSubmit = (values: LevelFormValues): void => {
        console.log("Submitted values:", values);
    };

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <Sidebar />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Level 설정</h1>
                    </div>
                    <Breadcrumb className={styles.breadcrumb}>
                        <Breadcrumb.Item>
                            <a href="./">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="javascript:;">회원관리</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Level 설정</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/* Form */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Level 설정</h3>
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        className={styles.form}
                    >
                        <table className={styles.table}>
                            <tbody>
                            {levels.map((item) => (
                                <tr key={item}>
                                    <th className={styles.tableHeader}>
                                        Level.{item}
                                    </th>
                                    <td className={styles.tableRow}>
                                        <div className={styles.inputs}>
                                            <FormItem
                                                name={`level_name_${item}`}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `Level.${item} 이름을 입력하세요`,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={`Level.${item} 이름`}
                                                    className={styles.input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                name={`level_description_${item}`}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `Level.${item} 설명을 입력하세요`,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={`Level.${item} 설명`}
                                                    className={styles.input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div>
                                            <Radio.Group
                                                defaultValue={
                                                    item === 9 ? "1" : "0"
                                                }
                                                name={`level_use_${item}`}
                                            >
                                                <Radio value="1">
                                                    사용함
                                                </Radio>
                                                {item !== 9 && (
                                                    <Radio value="0">
                                                        사용안함
                                                    </Radio>
                                                )}
                                            </Radio.Group>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className={styles.actions}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.button}
                            >
                                수정하기
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Level;
