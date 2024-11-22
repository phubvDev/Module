import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {BoardData, PostData} from "../../const/entity.ts";
import {fetchBoardByBoardId} from "../../services/boardService.ts";
import {Button, Card, Col, Divider, Pagination, Row, Table, Typography} from 'antd'
import styles from './post.module.css'
import {successColor, thirstColor} from "../../const/colors.ts";
import {FaCog} from 'react-icons/fa'
import {fetchPostsByBoardId} from "../../services/postService.ts";
import PostGridComponent from "../../components/postgrid";
import PostCardComponent from "../../components/postcard";
import type {ColumnsType} from "antd/es/table";
import {fetchLikeByPostId} from "../../services/likeService.ts";

const {Title, Text} = Typography;
const PostPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const boardId = searchParams.get("boardId");
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const [boardData, setBoardData] = useState<BoardData>();
    const [postData, setPostData] = useState<PostData[]>([]);
    const [totalLikes, setTotalLikes] = useState<Record<number, number>>({});

    const getBoardByBoardId = async (boardId: string) => {
        try {
            const data = await fetchBoardByBoardId(boardId);
            setBoardData(data);
        } catch (error) {
            console.error("Error getBoardByBoardId", error);
            return null;
        }
    }

    const getPostByBoardId = async (boardId: number,page:number) => {
        try {
            const data = await fetchPostsByBoardId(boardId,page-1,pageSize);
            console.log("post data:",data);
            setPostData(data.data);
            setTotalItems(data.totalItems);
        } catch (error) {
            console.error("Error getPostByBoardId", error);
            return null;
        }
    }

    useEffect(() => {
        if (boardId) {
            getBoardByBoardId(boardId);
        }
    }, [boardId])

    useEffect(() => {
        if (boardData?.id !== undefined) {
            getPostByBoardId(boardData.id,currentPage);
            console.log("BoardID", boardData.id);

        }
    }, [boardData,currentPage]);
    const prefaceText = boardData?.prefaceText?.split(",");
    const handleClickPrefaceText = (prefaceText: string) => {
        console.log("Click Preface Text", prefaceText);
    }
    console.log("Post data", postData);
    console.log("totalItems", totalItems);

    useEffect(() => {
        const fetchLikesData = async () => {
            const newLikeDataMap: Record<number, number> = {};
            for (const post of postData) {
                try {
                    const [totalLike, totalDislike] = await fetchLikeByPostId(post.id);
                    newLikeDataMap[post.id] = totalLike - totalDislike;
                } catch (error) {
                    console.error(`Error fetching like data for post ${post.id}:`, error);
                    newLikeDataMap[post.id] = 0;
                }
            }
            setTotalLikes(newLikeDataMap);
        };

        if (postData.length > 0) {
            fetchLikesData();
        }
    }, [postData]);
    const columns: ColumnsType<PostData> = [
        {
            title: 'NO',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => postData.length - index,
        },
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            render: (text,record) => (
                <Row gutter={8}>
                    <Col><Text>[{record.date}]</Text></Col>
                    <Col><Text>{text}</Text></Col>
                    <Col><Text>(0)</Text></Col>
                    <Col><Text type={"danger"}>HOT</Text></Col>
                </Row>
            )
        },
        {
            title: '작성자',
            dataIndex: 'writerName',
            key: 'writerName',
        },
        {
            title: '조회수',
            dataIndex: 'totalView',
            key: 'totalView',
        },
        {
            title: '추천',
            dataIndex: 'totalLike',
            key: 'totalLike',
            render: (_, record) => totalLikes[record.id] ?? 0,
        },
    ]
    const onRowClick = (record: PostData) => {
        navigate("/module/posts/" + record.id , {state: {data: record}});
    }
    const titleCard = () => {
        return (
            <Row justify={"space-between"} style={{marginTop: 8}}>
                <Row gutter={8} align={"middle"}>
                    <Col><Text style={{fontSize: 18, fontWeight: "bold"}}>말머리 :</Text></Col>
                    <Col>
                        {prefaceText?.map((item, index) => (
                            <span key={index}>
                                <span style={{cursor: "pointer", fontWeight: 500}}
                                      onClick={() => handleClickPrefaceText(item)}>{item}</span>
                                {index < prefaceText.length - 1 && (
                                    <span style={{margin: "0 8px"}}>|</span>
                                )}
                            </span>
                        ))}
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col><Text style={{fontSize: 18, fontWeight: "normal"}}>BEST</Text></Col>
                    <Col><Text style={{fontSize: 16, fontWeight: "normal"}}>|</Text></Col>
                    <Col><Text style={{fontSize: 18, fontWeight: "normal"}}>HOT</Text></Col>
                    <Col><Text style={{fontSize: 16, fontWeight: "normal"}}>|</Text></Col>
                    <Col><Text style={{fontSize: 18}}>NEW</Text></Col>
                </Row>
            </Row>
        )
    }
    return (
        <div className={styles.container}>
            <Title level={2} style={{marginBottom: 0, fontWeight: "bold"}}>{boardData?.name}</Title>
            <Text type={"secondary"}>게시판에 설명이 필요한 경우 게시판관리메뉴에서 설명을 입력하면 이곳에 보여집니다.</Text>
            <Divider style={{borderColor: thirstColor}}/>
            <Row align={"middle"} justify={"space-between"}>
                <Col>
                    {boardData?.membershipSystem ?
                        (
                            <Row align={"middle"} gutter={8}>
                                <Col>
                                    <Row align={"middle"} gutter={8}>
                                        <Col><Text style={{fontSize: 18, fontWeight: "bold"}}>모임장:</Text></Col>
                                        <Col><Text>유저아이디.</Text></Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row align={"middle"} gutter={8}>
                                        <Col><Text style={{fontSize: 18, fontWeight: "bold"}}>개설일:</Text></Col>
                                        <Col><Text>2020-01-01.</Text></Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row align={"middle"} gutter={8}>
                                        <Col><Text style={{fontSize: 18, fontWeight: "bold"}}>회원수:</Text></Col>
                                        <Col><Text>1007.</Text></Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <FaCog/>
                                </Col>
                            </Row>
                        ) :
                        (
                            <Text>총게시물 0 개 현재페이지 : 1 / 1</Text>
                        )
                    }
                </Col>
                <Col>
                    <Button
                        type={"primary"}
                        style={{backgroundColor: successColor}}
                        onClick={() => navigate(`/module/posts/create?boardId=${boardId}`,{state:{mode: "create"}})}
                    >
                        글쓰기
                    </Button>
                </Col>
            </Row>
            <Card title={titleCard()} style={{marginTop: 16}}>
                {boardData?.type === 1 ?
                    (
                        <Table
                            columns={columns}
                            dataSource={postData}
                            bordered
                            pagination={false}
                            rowKey="id"
                            rowClassName={styles.row}
                            scroll={{ x: "max-content" }}
                            onRow={(record) => ({onClick: () => onRowClick(record)})}
                        />
                    ) : boardData?.type === 2 ? (
                        <Row gutter={[16,16]}>
                            {postData.map((post,index) =>
                                <PostGridComponent  key={index} postData={post}/>
                            )}
                        </Row>

                    ) : (
                        postData.map((post,index) =>
                        <PostCardComponent key={index} postData={post}/>
                        )
                    )
                }
            </Card>
            {totalItems > 10 && (
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ marginTop: 16,textAlign: "center" }}
                />
            )}
        </div>
    )
}

export default PostPage;