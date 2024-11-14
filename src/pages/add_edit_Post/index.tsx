import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Form, Input, Row, Select, Upload, Typography, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./addeditpost.module.css";
import {grayColor, teal} from "../../const/colors.ts";
const {Title,Text} = Typography;
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {addPost} from "../../services/postService.tsx";
import {BoardData} from "../../const/entity.ts";
import {fetchBoardByBoardId} from "../../services/boardService.ts";

const { Option } = Select;

const AddOrEditPostPage: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [searchParams] = useSearchParams();
    const boardId = searchParams.get("boardId");
    const [boardData, setBoardData] = useState<BoardData>();

    const getBoardByBoardId = async (boardId: string) => {
        try {
            const data = await fetchBoardByBoardId(boardId);
            setBoardData(data);
        } catch (error) {
            console.error("Error getBoardByBoardId", error);
            return null;
        }
    }
    useEffect(() => {
        if (boardId) {
            getBoardByBoardId(boardId);
        }
    }, [boardId])
    console.log("BoardData", boardData?.id);
    const prefaceText = boardData?.prefaceText?.split(",");

    const handleSubmit = async () => {
        try {
            if (!boardData || !boardData.id) {
                message.error("Board data is not available yet!");
                return;
            }
            const values = await form.validateFields();
            const postData = {boardId: boardData.id,...values}
            console.log("postData", postData);
            await addPost(postData);
            message.success("Post added successfully!");
            navigate(`/module/posts?boardId=${boardId}`);
        } catch (error) {
            message.error("Failed to add board!");
            console.error(error);
        }
    }
    return (
        <div className={styles.container}>
            <Row align={"middle"} justify={"space-between"}>
                <Col><Title>게시글 작성</Title></Col>
                <Col>
                   <Row gutter={8} align={'middle'}>
                        <Col><Link to={""} style={{fontSize:16}}>Home</Link></Col>
                        <Col>/</Col>
                        <Col><Link to={""} style={{fontSize:16}}>멀티 게시판 목록</Link></Col>
                        <Col>/</Col>
                        <Col><Text style={{color:grayColor,fontSize:16}}>리스트형</Text></Col>
                   </Row>
                </Col>
            </Row>
            <Card className={styles.card}>
                <Form layout="vertical" className={styles.form} form={form} >
                    <Form.Item
                        label="말머리"
                        name="prefaceText"
                        className={styles.formItem}
                    >
                        <Select placeholder="말머리선택" style={{ width: "100%" }}>
                            {prefaceText?.map((item) =>
                                <Option value={item} key={item}>{item}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="제목"
                        name="title"
                        className={styles.formItem}
                        rules={[{ required: true, message: '제목을 입력하세요' }]}
                    >
                        <Input placeholder="제목이 들어가는 공간" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="글쓴이"
                                name="writerName"
                                className={styles.formItem}
                                rules={[{ required: true, message: '글쓴이를 입력하세요' }]}
                            >
                                <Input placeholder="글쓴이 이름" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="날짜"
                                name="date"
                                className={styles.formItem}
                                rules={[{ required: true, message: '날짜를 선택하세요' }]}
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="내용"
                        name="detail"
                        className={styles.formItem}
                        rules={[{ required: true, message: '내용을 입력하세요' }]}
                    >
                        <Input.TextArea rows={8} placeholder="내용을 입력하세요" />
                    </Form.Item>

                    <Form.Item label="첨부파일 #1" name="attachment1" className={styles.formItem}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="첨부파일 #2" name="attachment2" className={styles.formItem}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="첨부파일 #3" name="attachment3" className={styles.formItem}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Multi images" name="images" className={styles.formItem}>
                        <Upload multiple>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="유투브 URL" name="youtubeURL" className={styles.formItem}>
                        <Input placeholder="Please, enter <iframe> to get the url." />
                    </Form.Item>

                    <Form.Item label="썸네일" name="thumbnail" className={styles.formItem}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>

                    <Divider />
                    <Row justify="end" gutter={16}>
                        <Col>
                            <Button type="primary" style={{backgroundColor:teal,height:40}} onClick={() => navigate(`/module/posts?boardId=${boardId}`)}>
                                목록
                            </Button>
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" style={{height:40}} onClick={handleSubmit}>
                                수정하기
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default AddOrEditPostPage;
