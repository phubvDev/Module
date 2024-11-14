import React, {useEffect, useState} from "react";
import styles from './board.module.css'
import {useNavigate} from 'react-router-dom';
import {Button, Card, Col, Input, Row, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';
import {BoardData} from "../../const/entity.ts";
import {fetchBoards} from "../../services/boardService.ts";

const BoardPage: React.FC = () => {
    const [data, setData] = useState<BoardData[]>([]);
    const navigate = useNavigate();

    const titleCard = () => {
        return (
            <Row gutter={8} justify={"end"} style={{marginTop: 16}}>
                <Col>
                    <Input style={{height: 40, marginBottom: 16}}/>
                </Col>
                <Col>
                    <Button type={"primary"} style={{height: 40}}>검색</Button>
                </Col>
            </Row>
        )
    }

    useEffect(() => {
        const getBoards = async () => {
            const response = await fetchBoards();
            setData(response.map((board: any) => ({
                id: board.id,
                boardId: board.boardId,
                type: board.type,
                name: board.name,
                createdAt: board.createdAt,
                updatedAt: board.updatedAt,
                preface: board.preface,
                prefaceText: board.prefaceText,
                managerId: board.managerId,
                read: board.read,
                write: board.write,
                membershipSystem: board.membershipSystem,
                status: board.status,
            })));
        };
        getBoards();
    }, []);

    console.log("boards data", data);

    const columns: ColumnsType<BoardData> = [
        {
            title: '번호',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => data.length - index,
        },
        {
            title: '게시판타입',
            dataIndex: 'type',
            key: 'type',
            render: (type: number) => {
                switch (type) {
                    case 1:
                        return '리스트형';
                    case 2:
                        return '격자형';
                    case 3:
                        return '뉴스형';
                    default:
                        return '기타';
                }
            },
        },
        {
            title: '게시판 ID',
            dataIndex: 'boardId',
            key: 'boardId',
        },
        {
            title: '게시판명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '말머리',
            dataIndex: 'preface',
            key: 'preface',
            render: (preface: boolean) => (preface ? 'O' : 'X'),
        },
        // Các cột cố định
        {
            title: '관리자',
            dataIndex: 'manager',
            key: 'manager',
            render: () => '홍길동',
        },
        {
            title: '읽기',
            dataIndex: 'readPermission',
            key: 'readPermission',
            render: () => 'ALL',
        },
        {
            title: '쓰기',
            dataIndex: 'writePermission',
            key: 'writePermission',
            render: () => '일반회원',
        },
        {
            title: '회원제',
            dataIndex: 'membership',
            key: 'membership',
            render: (membershipSystem: boolean) => (membershipSystem ? 'O' : 'X'),
        },
        {
            title: '작성자',
            dataIndex: 'author',
            key: 'author',
            render: () => '홍길동',
        },
        {
            title: '개설일',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: () => "2024-04-27",
        },
        {
            title: '상태',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => <span style={{color: 'blue'}}>{status === 1 ? '정상' : '비활성화'}</span>,
        },
    ]

    const onRowClick = (record: BoardData) => {
        navigate("/module/boards/addboard", {state: {mode: 'edit', data: record}});
    }

    return (
        <div className={styles.container}>
            <h1>게시판 목록</h1>
            <Card title={titleCard()}>
                <Table columns={columns}
                       dataSource={data}
                       bordered={true}
                       rowKey="id"
                       rowClassName={styles.row}
                       scroll={{x: "max-content"}}
                       onRow={(record) => ({onClick: () => onRowClick(record)})}
                />
            </Card>
            <Row style={{justifyContent: 'end', marginTop: 16}}>
                <Button
                    type={"primary"}
                    style={{height: 40}}
                    onClick={() => navigate("/module/boards/addboard", {state: {mode: 'create'}})}
                >
                    게시판 추가
                </Button>
            </Row>

        </div>
    )
}

export default BoardPage;