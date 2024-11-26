import React, { useState } from "react";
import { Table, Button, DatePicker, Input, Card, Pagination } from "antd";
import Sidebar from "../sidebar"; // Import Sidebar component
import styles from "./access-history.module.css"; // Import CSS module

const { RangePicker } = DatePicker;

interface AccessHistory {
    id: number;
    menu: string;
    adminId: string;
    adminName: string;
    ip: string;
    accessTime: string;
}

const AccessHistory: React.FC = () => {
    // Xóa setData nếu không dùng
    const [data] = useState<AccessHistory[]>([
        {
            id: 1,
            menu: "Dashboard > User Management (admin@example.com)",
            adminId: "admin01",
            adminName: "John Doe",
            ip: "192.168.1.1",
            accessTime: "2024-11-25 14:32:45",
        },
        {
            id: 2,
            menu: "Dashboard > Settings (user@example.com)",
            adminId: "user02",
            adminName: "Jane Smith",
            ip: "192.168.1.2",
            accessTime: "2024-11-24 16:21:10",
        },
    ]);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 2,
    });

    const columns = [
        {
            title: "번호",
            dataIndex: "id",
            key: "id",
            render: (_: unknown, __: AccessHistory, index: number) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
            width: 50,
        },
        {
            title: "접속메뉴",
            dataIndex: "menu",
            key: "menu",
        },
        {
            title: "관리자ID",
            dataIndex: "adminId",
            key: "adminId",
        },
        {
            title: "관리자성명",
            dataIndex: "adminName",
            key: "adminName",
        },
        {
            title: "접속IP",
            dataIndex: "ip",
            key: "ip",
        },
        {
            title: "접근일시",
            dataIndex: "accessTime",
            key: "accessTime",
        },
    ];

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({ ...pagination, current: page, pageSize });
    };

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <Sidebar />

            <div className={styles.container}>
                <section className={styles.header}>
                    <h1>개인정보접속기록</h1>
                </section>

                <section className={styles.content}>
                    <Card title="검색정보" className={styles.card}>
                        <form className={styles.form}>
                            {/* 회원 아이디 */}
                            <div className={styles.formGroup}>
                                <label>회원 아이디</label>
                                <Input placeholder="회원 아이디 입력" />
                            </div>

                            {/* 검색기간 */}
                            <div className={styles.formGroup}>
                                <label>검색기간</label>
                                <RangePicker />
                            </div>

                            {/* 검색 버튼 */}
                            <div className={styles.formGroup}>
                                <Button type="primary">검색</Button>
                            </div>
                        </form>
                    </Card>

                    {/* Table */}
                    <Card className={styles.card}>
                        <Table<AccessHistory> // Định nghĩa kiểu dữ liệu cho Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            rowKey="id"
                            scroll={{ x: 800 }}
                        />
                    </Card>

                    {/* Pagination */}
                    <Pagination
                        className={styles.pagination}
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handlePaginationChange}
                    />
                </section>
            </div>
        </div>
    );
};

export default AccessHistory;
