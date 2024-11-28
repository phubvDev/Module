import React, { useEffect } from "react";
import styles from './sidebar.module.css';
import Sider from "antd/es/layout/Sider";
import { MenuProps, Menu, Row, Col, Image } from 'antd';
import { FaClipboardList, FaListUl, FaRegCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import imageAdmin from '../../assets/images/AdminLogo.png';
import { useContextGlobal } from "../../context/GlobalContext.tsx";

// Định nghĩa kiểu cho board
interface Board {
    boardId: string;
    name: string;
}

const Sidebar: React.FC = () => {
    const { boards = [], getBoards, } = useContextGlobal(); // Giả sử boards là mảng rỗng nếu chưa có dữ liệu
    const navigate = useNavigate();

    // Menu items
    const items: MenuProps['items'] = [
        {
            key: 'member-management',
            icon: <UserOutlined className={styles.menuItemIcon} />,
            label: "회원관리",
            style: { width: "250px" },
            children: [
                { key: 'member-management-1', icon: <FaRegCircle />, label: <Link to="/module/users">회원관리</Link> },
                { key: 'sms-management', icon: <FaRegCircle />, label: <Link to="/module/sms">SMS발송</Link> },
                { key: 'email', icon: <FaRegCircle />, label: <Link to="/module/email">메일발송</Link> },
                { key: 'access-history', icon: <FaRegCircle />, label: <Link to="/module/access-history">개인정보접속기록</Link> },
                { key: 'level-change-history', icon: <FaRegCircle />, label: <Link to="/module/level-change-history">운영자관리권한기록</Link> },
                { key: 'privacy', icon: <FaRegCircle />, label: <Link to="/module/privacy">개인정보처리방침</Link> },
                { key: 'policy', icon: <FaRegCircle />, label: <Link to="/module/policy">약관/개인정보</Link> },
                { key: 'sns-login-settings', icon: <FaRegCircle />, label: <Link to="/module/sns-setting">SNS 로그인 설정</Link> },
                { key: 'level', icon: <FaRegCircle />, label: <Link to="/module/level">LEVEL SETTING</Link> },
                { key: 'mail-sms-settings', icon: <FaRegCircle />, label: <Link to="/module/mail-sms-setting">Mail/SMS 사용설정</Link> },
            ],
        },
        {
            key: '1',
            icon: <FaListUl className={styles.menuItemIcon} />,
            label: "멀티 게시판 목록",
            style: { width: "250px" },
            children: boards.length > 0 ? boards.map((board: Board) => ({
                key: board.boardId,
                icon: <FaRegCircle />,
                label: <Link to={`/module/posts?boardId=${board.boardId}`}>{board.name}</Link>
            })) : [{ key: 'loading', icon: <FaRegCircle />, label: "Loading..." }] // Hiển thị thông báo khi chưa có boards
        },
        {
            key: '2',
            icon: <FaClipboardList className={styles.menuItemIcon} />,
            label: "멀티 게시판 관리",
            style: { width: "250px" },
            children: [
                { key: 'avan1', icon: <FaRegCircle />, label: <Link to="/module/boards">게시판 관리</Link> },
                { key: 'avan2', icon: <FaRegCircle />, label: <Link to="/">코멘트 통합관리</Link> },
                { key: 'avan3', icon: <FaRegCircle />, label: <Link to="/">코멘트 통합관리</Link> },
                { key: 'avan4', icon: <FaRegCircle />, label: <Link to="/">게시판 통계</Link> },
            ],
        }
    ];

    // Fetch boards khi component mount
    useEffect(() => {
        getBoards();
    }, [getBoards]);

    return (
        <Sider className={styles.container} width={250}>
            {/* Logo and title */}
            <Row
                align="middle"
                gutter={16}
                className={styles.row}
                style={{ marginRight: -12 }}
                onClick={() => navigate('/module')}
            >
                <Col>
                    <Image preview={false} src={imageAdmin} width={33} />
                </Col>
                <Col>
                    <span className={styles.text}>Module</span>
                </Col>
            </Row>

            {/* Sidebar menu */}
            <Menu
                defaultSelectedKeys={["avan1"]}
                defaultOpenKeys={['2']}
                mode="inline"
                theme="dark"
                items={items}
                style={{ fontSize: 16 }}
            />
        </Sider>
    );
};

export default Sidebar;
