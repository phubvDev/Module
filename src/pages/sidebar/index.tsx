import React, {useEffect} from "react";
import styles from './sidebar.module.css'
import Sider from "antd/es/layout/Sider";
import {MenuProps, Menu, Row, Col, Image} from 'antd'
import {FaClipboardList, FaListUl, FaRegCircle} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import imageAdmin from '../../assets/images/AdminLogo.png'
import {useContextGlobal} from "../../context/GlobalContext.tsx";

type MenuItems = Required<MenuProps>['items'][number]


const Sidebar: React.FC = () => {
    const {boards, getBoards} = useContextGlobal();
    const navigate = useNavigate();
    const items: MenuItems[] = [
        {
            key: '1',
            icon: <FaListUl className={styles.menuItemIcon}/>,
            label: "멀티 게시판 목록",
            children: boards.map((board: any) => ({
                key: board.boardId,
                icon: <FaRegCircle/>,
                label: <Link to={`/module/posts?boardId=${board.boardId}`}>{board.name}</Link>
            })) as MenuItems[]
        },
        {
            key: '2',
            icon: <FaClipboardList className={styles.menuItemIcon}/>,
            label: "멀티 게시판 관리",
            children: [
                {key: 'avan1', icon: <FaRegCircle/>, label: <Link to="/module/boards">게시판 관리</Link>},
                {key: 'avan2', icon: <FaRegCircle/>, label: <Link to="/">코멘트 통합관리</Link>},
                {key: 'avan3', icon: <FaRegCircle/>, label: <Link to="/">코멘트 통합관리</Link>},
                {key: 'avan4', icon: <FaRegCircle/>, label: <Link to="/">게시판 통계</Link>},
            ]
        }
    ];

    useEffect(() => {
        getBoards();
    }, [getBoards]);


    return (
        <Sider className={styles.container} width={250}>
            <Row align={"middle"} gutter={16} className={styles.row} style={{marginRight: -12}}
                 onClick={() => navigate('/module')}>
                <Col>
                    <Image preview={false} src={imageAdmin} width={33}/>
                </Col>
                <Col>
                    <span className={styles.text}>Module</span>
                </Col>
            </Row>
            <Menu
                defaultSelectedKeys={["avan1"]}
                defaultOpenKeys={['2']}
                mode={'inline'}
                theme={"dark"}
                items={items}
                style={{fontSize: 16}}
            />
        </Sider>
    )
}

export default Sidebar;