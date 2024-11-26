import React, { useState } from "react";
import { Table, Button, DatePicker, Input, Card, Pagination } from "antd";
import Sidebar from "../sidebar"; // Import Sidebar component
import styles from "./level.module.css"; // Import CSS module

const { RangePicker } = DatePicker;

interface LevelChangeHistory {
    id: number;
    task: string;
    oldLevel: string;
    newLevel: string;
    memberId: string;
    adminId: string;
    ip: string;
    accessTime: string;
}

const LevelChangeHistory: React.FC = () => {
    const [data] = useState<LevelChangeHistory[]>([
        {
            id: 1,
            task: "변경",
            oldLevel: "User",
            newLevel: "Admin",
            memberId: "user01",
            adminId: "admin01",
            ip: "192.168.1.1",
            accessTime: "2024-11-25 14:32:45",
        },
        {
            id: 2,
            task: "변경",
            oldLevel: "Guest",
            newLevel: "User",
            memberId: "user02",
            adminId: "admin02",
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
            render: (_: unknown, __: unknown, index: number) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
            width: 50,
        },
        {
            title: "수행업무",
            dataIndex: "task",
            key: "task",
        },
        {
            title: "이전권한",
            dataIndex: "oldLevel",
            key: "oldLevel",
        },
        {
            title: "변경권한",
            dataIndex: "newLevel",
            key: "newLevel",
        },
        {
            title: "회원ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "관리자ID",
            dataIndex: "adminId",
            key: "adminId",
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
                    <h1>운영자관리권한기록 조회</h1>
                </section>

                <section className={styles.content}>
                    <Card title="검색정보" className={styles.card}>
                        <form className={styles.form}>
                            {/* 운영자 아이디 */}
                            <div className={styles.formGroup}>
                                <label>운영자 아이디</label>
                                <Input placeholder="운영자 아이디 입력" />
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
                        <Table<LevelChangeHistory>
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

export default LevelChangeHistory;
