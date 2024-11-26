import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, message, Row, Typography} from "antd";
import {commentColor, grayColor, redColor, secondaryColor} from "../../const/colors.ts";
import styles from './comment.module.css';
import {FaReply} from "react-icons/fa";
import {CommentData, UserData} from "../../const/entity.ts";
import {fetchUserByUserId} from "../../services/userService.ts";
import {addComment, deletesoftComment, updateComment} from "../../services/commentService.ts";

const {Text, Title} = Typography;

interface CommentProps {
    commentData: CommentData;
    onAddComment: (postId: number) => void;
}

const CommentComponent: React.FC<CommentProps> = ({commentData, onAddComment}) => {
    const userId = localStorage.getItem("userId");
    const [isReply, setIsReply] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [user, setUser] = useState<UserData>();
    const [form] = Form.useForm();

    const getUser = async (userId: string) => {
        try {
            const response = await fetchUserByUserId(userId);
            setUser(response);
        } catch (error) {
            console.error("Error getUserByUserId", error);
        }
    }

    const toggleReply = () => {
        setIsReply(!isReply);
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit);
        if (!isEdit) {
            form.setFieldsValue({content: commentData.content});
        }
    }

    useEffect(() => {
        if (userId) {
            getUser(userId);
        }
    }, [userId]);

    const handleToggleReply = async () => {
        try {
            const values = await form.validateFields();

            if (!commentData.postId || !user?.id) {
                throw new Error("Invalid postId or userId");
            }
            console.log("parent Id: ", commentData.id)
            const data: CommentData = {
                postId: commentData.postId,
                userId: user?.id,
                content: values.content,
                parentId: commentData.id,
            }

            const response = await addComment(data);
            form.resetFields();
            message.success("Comment successfully added!");
            console.log("response", response);
            onAddComment(data.postId);
            setIsReply(false);
        } catch (error) {
            console.error(error);
            message.error("Error adding comment!");
        }
    }

    const handleToggleEdit = async (id: number) => {
        try {
            const values = await form.validateFields();
            const data = {
                content: values.content,
            }
            await updateComment(id, data);
            form.resetFields();
            message.success("Comment successfully updated!");
            onAddComment(commentData.postId);
            setIsEdit(false);
        } catch (error) {
            console.error(error);
        }
    }


    const handleToggleDelete = async (id: number) => {
        try {
            await deletesoftComment(id);
            message.success("Comment successfully deleted!");
            onAddComment(commentData.postId);
            setIsEdit(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleToggleHidden = async (id: number) => {
        try {
            const data = {
                hidden: true
            }

            await updateComment(id, data);
            onAddComment(commentData.postId);
            setIsEdit(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={styles.container}
                 style={{
                     borderBottom: commentData.parentId ? "1px solid #ddd" : 0,
                     backgroundColor: commentData.parentId ? commentColor : "",
                 }}
            >
                <Row gutter={8} align={"bottom"}>
                    <Col style={{display: commentData.parentId ? "block" : "none"}}>
                        <FaReply size={16} style={{transform: 'rotate(180deg)'}}/>
                    </Col>
                    <Col>
                        <Title level={4}>{userId}</Title>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 12, color: grayColor}}>{commentData.createdAt}</Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 12, color: grayColor}}>[수정됨]</Text>
                    </Col>
                </Row>
                {!commentData.deletedAt ? (
                    !commentData.hidden ?
                        (!isEdit ? (
                                <>
                                    <Row>
                                        <Text style={{fontSize: 16, color: grayColor}}>{commentData.content}</Text>
                                    </Row>
                                    <Row gutter={8} justify={"end"} align={"middle"} style={{marginBottom: 16}}>
                                        <Col>
                                            <Text style={{fontSize: 16, cursor: "pointer"}}
                                                  onClick={() => toggleReply()}
                                            >
                                                답글 작성
                                            </Text>
                                        </Col>
                                        <Col style={{fontSize: 16}}>
                                            <Text style={{fontSize: 16}}>|</Text>
                                        </Col>
                                        <Col style={{fontSize: 16}}>
                                            <Text style={{fontSize: 16, cursor: "pointer"}}
                                                  onClick={() => {
                                                      toggleEdit()
                                                  }}
                                            >
                                                수정
                                            </Text>
                                        </Col>
                                        <Col style={{fontSize: 16}}>
                                            <Text style={{fontSize: 16}}>|</Text>
                                        </Col>
                                        <Col style={{fontSize: 16}}>
                                            <Text
                                                style={{fontSize: 16, cursor: "pointer"}}
                                                onClick={() => handleToggleHidden(commentData.id!)}
                                            >
                                                블라인드
                                            </Text>
                                        </Col>
                                    </Row>
                                </>
                            ) :
                            (
                                <>
                                    <Form layout={"vertical"} style={{marginTop: 8}} form={form}>
                                        <Form.Item name={"content"}>
                                            <Input.TextArea maxLength={500} rows={3} showCount/>
                                        </Form.Item>
                                    </Form>
                                    <Row justify={"space-between"} style={{width: '100%', marginBottom: 16}}>
                                        <Col>
                                            <Button type={"primary"}
                                                    style={{
                                                        backgroundColor: redColor,
                                                        color: secondaryColor,
                                                        height: 25,
                                                        borderRadius: 12
                                                    }}
                                                    onClick={() => handleToggleDelete(commentData.id!)}
                                            >
                                                삭제
                                            </Button>
                                        </Col>
                                        <Row gutter={8}>
                                            <Col>
                                                <Button type={"primary"}
                                                        style={{
                                                            backgroundColor: redColor,
                                                            color: secondaryColor,
                                                            height: 25,
                                                            borderRadius: 12
                                                        }}
                                                        onClick={() => toggleEdit()}
                                                >Cancel</Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    type={"primary"}
                                                    style={{
                                                        backgroundColor: grayColor,
                                                        color: secondaryColor,
                                                        height: 25,
                                                        borderRadius: 12
                                                    }}
                                                    onClick={() => {
                                                        if (commentData.id) {
                                                            handleToggleEdit(commentData.id);
                                                        } else {
                                                            message.error("Comment ID is missing!");
                                                        }
                                                    }}
                                                >
                                                    답글등록
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </>
                            )) : (
                            <Row>
                                <Text style={{fontSize: 16, color: grayColor}}>게시자에 의해 게시글이 삭제되었습니다.</Text>
                            </Row>
                        )

                ) : (
                    <Row>
                        <Text style={{fontSize: 16, color: grayColor}}>게시자에 의해 게시글이 삭제되었습니다.</Text>
                    </Row>
                )}

            </div>
            {isReply && (
                <>
                    <Form layout={"vertical"} style={{marginTop: 8}} form={form}>
                        <Form.Item name={"content"}>
                            <Input.TextArea maxLength={500} rows={3} showCount/>
                        </Form.Item>
                    </Form>
                    <Row justify={"end"} style={{width: '100%', marginBottom: 16}} gutter={8}>
                        <Col>
                            <Button type={"primary"}
                                    style={{
                                        backgroundColor: redColor,
                                        color: secondaryColor,
                                        height: 25,
                                        borderRadius: 12
                                    }}
                                    onClick={() => toggleReply()}
                            >Cancel</Button>
                        </Col>
                        <Col>
                            <Button
                                type={"primary"}
                                style={{
                                    backgroundColor: grayColor,
                                    color: secondaryColor,
                                    height: 25,
                                    borderRadius: 12
                                }}
                                onClick={handleToggleReply}
                            >답글등록</Button>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default CommentComponent;