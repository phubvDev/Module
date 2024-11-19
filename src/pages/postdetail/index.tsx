import React, {useCallback, useEffect, useState} from "react";
import styles from './postdetail.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Form, Input, Row, Typography} from 'antd'
import { FaRegThumbsUp,FaRegThumbsDown } from "react-icons/fa";
import {grayColor, primaryColor, secondaryColor} from "../../const/colors.ts";
import { fetchBoardById} from "../../services/boardService.ts";
import {BoardData} from "../../const/entity.ts";

const {Title, Text} = Typography;

const PostDetailPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [board, setBoard] = useState<BoardData>();
    const [countLike,setCountLike] = useState<number>(0)
    const [countDisLike,setCountDisLike] = useState<number>(0)
    const toggleLike = useCallback(() => {
        setCountLike(prevCount => prevCount + 1);
    }, []);

    const toggleDisLike = useCallback(() => {
        setCountDisLike(prevCount => prevCount + 1);
    }, []);
    const {data} = location.state || {data: null};
    console.log("data post detail", data);

    const getBoard = async () => {
        const response = await fetchBoardById(data.boardId);
        setBoard(response);
    }
    useEffect(() => {
        getBoard();
    },[])

    console.log("board", board)
    return (
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
            <Text style={{width:'100%', fontSize:16}}>세부 사항 : {data.detail}</Text>
            <Row align={"middle"} gutter={16} >
                <Col>
                    <Button icon={<FaRegThumbsUp/>} onClick={toggleLike}>{countLike}</Button>
                </Col>
                <Col>
                    <Button icon={<FaRegThumbsDown/>} onClick={toggleDisLike}>{countDisLike}</Button>
                </Col>
            </Row>
            <Divider/>
            <Row align={"middle"} style={{width:'100%'}} gutter={8}>
                <Col><Text style={{ fontSize:16}}>첨부파일 :</Text></Col>
                <Col><Text style={{fontSize:16,fontWeight:"bold",color:primaryColor}}> {data.attachment1 ? "첨부파일 #1" : null}</Text></Col>
                <Col><Text style={{fontSize:16,fontWeight:"bold",color:primaryColor}}> {data.attachment2 ? "첨부파일 #2" : null}</Text></Col>
                <Col><Text style={{fontSize:16,fontWeight:"bold",color:primaryColor}}> {data.attachment3 ? "첨부파일 #3" : null}</Text></Col>
            </Row>

            <Divider/>

            <Card title={"댓글"} headStyle={{backgroundColor:primaryColor,color:"#fff"}} className={styles.card}>
               <Form layout={"vertical"}>
                   <Form.Item label={"Admin"}>
                        <Input.TextArea maxLength={500} rows={3} showCount/>
                   </Form.Item>
               </Form>
                <Row justify={"end"} style={{width:'100%'}}>
                    <Button type={"primary"}>글쓰기</Button>
                </Row>
            </Card>
            <Row gutter={16} style={{marginTop:16,marginBottom:16}}>
                <Col>
                    <Button type={"primary"} style={{height:40}} onClick={() => navigate(-1)}>리스트</Button>
                </Col>
                <Col>
                    <Button
                        style={{height:40,backgroundColor:grayColor,color:secondaryColor}}
                        onClick={() => navigate(`/module/posts/edit?boardId=${board?.boardId}`,{state:{mode: "edit",data: data}})}
                    >
                        리스트
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default PostDetailPage;