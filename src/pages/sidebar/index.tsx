import React, {useEffect, useState} from "react";
import styles from './sidebar.module.css'
import Sider from "antd/es/layout/Sider";
import {MenuProps, Menu, Row, Col, Image} from 'antd'
import {FaClipboardList, FaListUl, FaRegCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import {fetchBoards} from "../../services/boardService.ts";
import imageAdmin from '../../assets/images/AdminLogo.png'

type MenuItems = Required<MenuProps>['items'][number]


const Sidebar: React.FC = () => {
    const [items, setItems] = useState<MenuItems[]>([
        {
            key: '1',
            icon: <FaListUl className={styles.menuItemIcon}/>,
            label: "멀티 게시판 목록",
            children: [] // Sẽ cập nhật khi có dữ liệu boards
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
    ]);
    const [boards, setBoards] = useState<any[]>([]);


    useEffect(() => {
        const getBoards = async () => {
            const data = await fetchBoards();
            setBoards(data);

            //tạo mảng children từ boards
            const boardChildren = data.map((board: any) => ({
                key: board.boardID,
                icon: <FaRegCircle/>,
                label: board.name
            })) as MenuItems;

            // Cập nhật items với children mới cho mục key '1'
            setItems((prevItems) =>
                prevItems.map((item) => {
                        if (item && item.key === '1') {
                            return {...item, children: boardChildren};
                        }
                        return item;
                    }
                ) as MenuItems[]
            );
        }
        getBoards();
    }, []);

    console.log("boards", boards);

    return (
        <Sider className={styles.container} width={250}>
            <Row align={"middle"} gutter={16} className={styles.row} style={{marginRight: -12}}
                 onClick={() => console.log("Click Module")}>
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