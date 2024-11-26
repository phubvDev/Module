import React, { useState } from "react";
import { Table, Button, Radio, Pagination, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar";
import styles from "./privacy.module.css";

interface Privacy {
    id: number;
    startDate: string;
    endDate: string;
    isShow: boolean;
}

const PrivacyHistory: React.FC = () => {
    const [data, setData] = useState<Privacy[]>([
        {
            id: 1,
            startDate: "2023-01-01",
            endDate: "2023-12-31",
            isShow: true,
        },
        {
            id: 2,
            startDate: "2022-01-01",
            endDate: "2022-12-31",
            isShow: false,
        },
    ]);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: data.length,
    });

    const handleShowChange = (id: number) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, isShow: true } : { ...item, isShow: false }
            )
        );
    };

    const handleDelete = (id: number) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({ ...pagination, current: page, pageSize });
    };

    const columns = [
        {
            title: "번호",
            dataIndex: "id",
            key: "id",
            render: (_: unknown, __: unknown, index: number) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: "적용시작",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "적용종료",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "노출",
            key: "isShow",
            render: (_: unknown, record: Privacy) => (
                <Radio
                    checked={record.isShow}
                    onChange={() => handleShowChange(record.id)}
                >
                    노출
                </Radio>
            ),
            align: "center" as const, // Sửa lỗi kiểu align
        },
        {
            title: "관리",
            key: "actions",
            render: (_: unknown, record: Privacy) => (
                <div className={styles.actionButtons}>
                    <Tooltip title="수정">
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => console.log("Edit", record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="삭제">
                        <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </div>
            ),
            align: "center" as const, // Sửa lỗi kiểu align
        },
    ];

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <div className={styles.container}>
                <section className={styles.header}>
                    <h1>개인정보처리방침 개정이력</h1>
                </section>

                <section className={styles.content}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={false}
                        className={styles.table}
                    />

                    <Pagination
                        className={styles.pagination}
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handlePaginationChange}
                    />

                    <Button
                        type="primary"
                        className={styles.addButton}
                        onClick={() => console.log("Add New Privacy Policy")}
                    >
                        작성하기
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default PrivacyHistory;
