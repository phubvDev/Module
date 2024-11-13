import React from "react";
import {Header} from "antd/es/layout/layout";
import {Col, Row, theme} from "antd";
import {FaSearch, FaIdBadge, FaSignOutAlt, FaExpandArrowsAlt} from "react-icons/fa";
import styles from './header.module.css'

const HeaderPage: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Header style={{padding: 0, background: colorBgContainer, borderBottom: "1px solid #dee2e6"}}>
            <Row gutter={24} justify={"end"} style={{marginRight: 16}}>
                <Col><FaSearch className={styles.icons} onClick={() => console.log("Search")}/></Col>
                <Col><FaIdBadge className={styles.icons} onClick={() => console.log("Badge")}/></Col>
                <Col><FaSignOutAlt className={styles.icons} onClick={() => console.log("Badge")}/></Col>
                <Col><FaExpandArrowsAlt className={styles.icons} onClick={() => console.log("Expand")}/></Col>
            </Row>
        </Header>

    )
}

export default HeaderPage;