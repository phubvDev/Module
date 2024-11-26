import React, { useState } from "react";
import { Table, Button, Pagination, Tag, Modal, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar";
import styles from "./users.module.css";

const { Option } = Select;

interface User {
    id: number;
    user_id: string;
    name: string;
    email: string;
    created_at: string;
    status: string;
    level: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            user_id: "user01",
            name: "John Doe",
            email: "johndoe@gmail.com",
            created_at: "2024-11-25",
            status: "Active",
            level: "Admin",
        },
        {
            id: 2,
            user_id: "user02",
            name: "Jane Smith",
            email: "janesmith@gmail.com",
            created_at: "2024-11-24",
            status: "Inactive",
            level: "User",
        },
    ]);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: users.length,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    const handleSearch = () => {
        const filteredUsers = users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(searchText.toLowerCase())
        );
        setPagination({ ...pagination, total: filteredUsers.length });
        setUsers(filteredUsers);
    };

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
            title: "아이디",
            dataIndex: "user_id",
            key: "user_id",
        },
        {
            title: "회원이름",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: User) => (
                <a
                    href="#!"
                    onClick={() => {
                        setSelectedUser(record);
                        setIsModalOpen(true);
                    }}
                >
                    {name}
                </a>
            ),
        },
        {
            title: "이메일",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "가입일",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "상태",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "회원 Level",
            dataIndex: "level",
            key: "level",
        },
        {
            title: "상세보기",
            key: "actions",
            render: (_: unknown, record: User) => (
                <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => {
                        console.log("Edit user", record.id);
                    }}
                />
            ),
        },
    ];

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({ ...pagination, current: page, pageSize });
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <Sidebar />
            </div>

            {/* Nội dung chính */}
            <div className={styles.bodyContent}>
                {/* Form điều khiển ở đầu bảng */}
                <div className={styles.tableHeader}>
                    <Select
                        defaultValue=""
                        className={styles.select}
                        style={{ width: 150 }}
                    >
                        <Option value="">선택</Option>
                        <Option value="Admin">Admin</Option>
                        <Option value="User">User</Option>
                    </Select>
                    <Input
                        placeholder="검색어 입력"
                        className={styles.input}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        검색
                    </Button>
                </div>

                {/* Bảng */}
                <div className={styles.tableScroll}>
                    <Table
                        columns={columns}
                        dataSource={users}
                        pagination={false}
                        rowKey="id"
                        scroll={{ x: 1000 }}
                    />
                </div>

                {/* Phân trang */}
                <Pagination
                    className={styles.tablePagination}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onChange={handlePaginationChange}
                />

                {/* Modal */}
                <Modal
                    title="회원 정보"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={[
                        <Button key="close" onClick={() => setIsModalOpen(false)}>
                            닫기
                        </Button>,
                    ]}
                >
                    {selectedUser ? (
                        <div className={styles.modalContent}>
                            <p>아이디: {selectedUser.user_id}</p>
                            <p>회원이름: {selectedUser.name}</p>
                            <p>이메일: {selectedUser.email}</p>
                            <p>가입일: {selectedUser.created_at}</p>
                            <p>상태: {selectedUser.status}</p>
                            <p>회원 Level: {selectedUser.level}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default UserManagement;
