import React, {useEffect, useState} from "react";
import styles from './postdetail.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Form, Input, message, Row, Skeleton, Typography} from 'antd'
import {FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";
import {grayColor, primaryColor, secondaryColor} from "../../const/colors.ts";
import {fetchBoardById} from "../../services/boardService.ts";
import {BoardData, CommentData, LikeData, UserData} from "../../const/entity.ts";
import {downloadFile} from "../../utils";
import {fetchUserByUserId} from "../../services/userService.ts";
import {fetchLikeByUserIdAndPostId, toggleLike} from "../../services/likeService.ts";
import CommentComponent from "../../components/comment";
import {addComment, fetchAllCommentsByPostId} from "../../services/commentService.ts";

const {Title, Text} = Typography;

const PostDetailPage: React.FC = () => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isDisliked, setIsDisliked] = useState<boolean>(false);
    const [likeData, setLikeData] = useState<LikeData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserData>();
    const location = useLocation();
    const navigate = useNavigate();
    const [board, setBoard] = useState<BoardData>();
    const [commentData, setCommentData] = useState<CommentData[]>([]);
    const [form] = Form.useForm();
    const {data} = location.state || {data: null};
    const userId = localStorage.getItem("userId");
    console.log("data post detail", data);

    const getBoard = async () => {
        const response = await fetchBoardById(data.boardId);
        setBoard(response);
    }

    const getUserByUserId = async (userId: string) => {
        const response = await fetchUserByUserId(userId);
        setUser(response);
    }

    const getLikeByUserIdAndPostId = async (userId: number, postId: number) => {
        setIsLoading(true);
        try {
            const response = await fetchLikeByUserIdAndPostId(userId, postId);
            setLikeData(response);
        } catch (error) {
            console.error("Error fetching like data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCommentsByPostId = async (postId : number) => {
        try {
            const response = await fetchAllCommentsByPostId(postId);
            const commentsTree = buildCommentTree(response.map((comment:any) => ({ ...comment, replies: [] })));
            setCommentData(commentsTree);
        } catch (error) {
            console.error("Error fetching like data:", error);
        }
    }

    //hàm xây dựng cây comment từ mảng flat
    const buildCommentTree = (comments: CommentData[]) => {
        const map: { [key: number]: CommentData } = {};
        const roots: CommentData[] = [];

        comments.forEach(comment => {
            //khởi tạo mảng replies nếu chưa có
            map[comment.id!] = { ...comment, replies: comment.replies || [] }; //nếu chưa có replies, khởi tạo mảng rỗng
        });

        comments.forEach(comment => {
            if (comment.parentId && map[comment.parentId]) {
                //nếu có parentId và parentId tồn tại trong map, đưa comment vào children của comment cha
                map[comment.parentId]?.replies?.push(comment);
            } else {
                //nếu không có parentId, comment này là root
                roots.push(comment);
            }
        });

        return roots;
    };

    const renderComment = (comment: CommentData, level: number = 0) => {
        return (
            <div key={comment.id} style={{ marginLeft: level * 20 }}>
                <CommentComponent commentData={comment} key={comment.id} onAddComment={handleAddCommentReply}/>
                {comment.replies && comment.replies.length > 0 && (
                    <div style={{ marginLeft: 20 }}>
                        {comment.replies.map(childComment => renderComment(childComment, level + 1))}
                    </div>
                )}
            </div>
        );
    }
    useEffect(() => {
        getBoard();
    }, [])

    useEffect(() => {
        if (userId) {
            getUserByUserId(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (user?.id && data.id) {
            getLikeByUserIdAndPostId(user.id, data.id);
        }
    }, [user?.id, data.id]);

    useEffect(() => {
        if (likeData?.liked !== undefined) {
            setIsLiked(likeData.liked);
            setIsDisliked(!likeData.liked);
        }
    }, [likeData?.liked]);

    useEffect(() => {
        if (data.id) {
            getCommentsByPostId(data.id)
        }
    }, [data.id]);

    console.log("user", user);
    console.log("board", board);
    console.log("comment", commentData);

    const handleToggleLikeDisLike = async (liked: boolean) => {
        if (!user || !data) {
            alert("Login Again, please!");
            return;
        }

        const likeData: LikeData = {
            postId: data.id,
            userId: user.id,
            liked: liked,
        };

        try {
            await toggleLike(likeData);
            if (liked) {
                setIsLiked(true);
                setIsDisliked(false);
            } else {
                setIsLiked(false);
                setIsDisliked(true);
            }
        } catch (error) {
            console.error("Lỗi khi gửi trạng thái like/dislike:", error);
        }
    }

    const handleAddCommentReply = (postId:number) => {
        getCommentsByPostId(postId);
    }

    const handleToggleSubmit = async () => {

        if (!user || !data) {
            alert("Login Again, please!");
            return;
        }

        try {
            const content = await form.validateFields();
            const commentData: CommentData = {
                postId: data.id,
                userId: user.id,
                content: content.content,
            }
            await addComment(commentData);
            message.success("Comment successfully added!");
            getCommentsByPostId(data.id);
            form.resetFields();
        } catch (error) {
            message.error("Comment error added!");
            console.error("Lỗi khi submit comment:", error);
        }
    }

    return (
        <Skeleton loading={isLoading} active>
            <div className={styles.container}>
                <Title>{data.title}</Title>
                <Divider style={{marginTop: 0}}/>
                <Row align={"middle"} gutter={8}>
                    <Col>
                        <Row gutter={8}>
                            <Col><Text style={{fontSize: 16}}>작성자 :</Text></Col>
                            <Col><Text style={{fontSize: 16, fontWeight: "bold"}}>{data.writerName}</Text></Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row gutter={8}>
                            <Col><Text style={{fontSize: 16}}>작성일 :</Text></Col>
                            <Col><Text style={{fontSize: 16, fontWeight: "bold"}}>{data.date}</Text></Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row gutter={8}>
                            <Col><Text style={{fontSize: 16}}>조회수 :</Text></Col>
                            <Col><Text style={{fontSize: 16, fontWeight: "bold"}}>{data.totalView}</Text></Col>
                        </Row>
                    </Col>
                </Row>
                <Divider/>
                <Text style={{width: '100%', fontSize: 16}}>세부 사항 : {data.detail}</Text>
                <Row align={"middle"} gutter={16}>
                    <Col>
                        <Button
                            icon={<FaRegThumbsUp/>}
                            style={{
                                backgroundColor: isLiked ? primaryColor : undefined,
                                color: isLiked ? '#fff' : undefined,
                            }}
                            onClick={() => handleToggleLikeDisLike(true)}
                        >
                        </Button>
                    </Col>
                    <Col>
                        <Button icon={<FaRegThumbsDown/>}
                                style={{
                                    backgroundColor: isDisliked ? primaryColor : undefined,
                                    color: isDisliked ? '#fff' : undefined,
                                }}
                                onClick={() => handleToggleLikeDisLike(false)}
                        >
                        </Button>
                    </Col>
                </Row>
                <Divider/>
                <Row align={"middle"} style={{width: '100%'}} gutter={8}>
                    <Col><Text style={{fontSize: 16}}>첨부파일 :</Text></Col>
                    {data.attachment1 && (
                        <Col>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: primaryColor, cursor: "pointer"}}
                                onClick={() => downloadFile(data.attachment1)}
                            >
                                첨부파일 #1
                            </Text>
                        </Col>
                    )}
                    {data.attachment2 && (
                        <Col>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: primaryColor, cursor: "pointer"}}
                                onClick={() => downloadFile(data.attachment2)}
                            >
                                첨부파일 #2
                            </Text>
                        </Col>
                    )}
                    {data.attachment3 && (
                        <Col>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: primaryColor, cursor: "pointer"}}
                                onClick={() => downloadFile(data.attachment3)}
                            >
                                첨부파일 #3
                            </Text>
                        </Col>
                    )}
                </Row>

                <Divider/>

                <Card title={"댓글"} headStyle={{backgroundColor: primaryColor, color: "#fff"}} className={styles.card}>
                    <Form layout={"vertical"} form={form}>
                        <Form.Item label={userId} name={"content"} required={true}>
                            <Input.TextArea maxLength={500} rows={3} showCount/>
                        </Form.Item>
                    </Form>
                    <Row justify={"end"} style={{width: '100%'}}>
                        <Button type={"primary"} onClick={handleToggleSubmit}>글쓰기</Button>
                    </Row>
                    {Array.isArray(commentData) && commentData.length > 0 ? (
                        commentData.map((comment) => (
                           renderComment(comment)
                        ))
                    ) : null}
                </Card>
                <Row gutter={16} style={{marginTop: 16, marginBottom: 16}}>
                    <Col>
                        <Button type={"primary"} style={{height: 40}} onClick={() => navigate(-1)}>목록</Button>
                    </Col>
                    <Col>
                        <Button
                            style={{height: 40, backgroundColor: grayColor, color: secondaryColor}}
                            onClick={() => navigate(`/module/posts/edit?boardId=${board?.boardId}`, {
                                state: {
                                    mode: "edit",
                                    data: data
                                }
                            })}
                        >
                            리스트
                        </Button>
                    </Col>
                </Row>
            </div>
        </Skeleton>
    )
}

export default PostDetailPage;