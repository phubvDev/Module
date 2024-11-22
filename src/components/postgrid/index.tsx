import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import {FaRegThumbsUp} from "react-icons/fa";
import {grayColor} from "../../const/colors.ts";
import styles from './postgrid.module.css'
import { useNavigate} from "react-router-dom";
import {PostData} from "../../const/entity.ts";

const {Text} = Typography;

interface PostGridProps {
    postData: PostData;
}
const PostGridComponent: React.FC<PostGridProps> = ({postData}) => {
    const navigate = useNavigate();
    return (

            <Col md={6}>
                <Card className={styles.card}>
                    <Row align={"middle"} justify={"space-between"}>
                        <Col>
                            <Text onClick={() => navigate(`/module/posts/${postData.id}`,{state: {data: postData}})} style={{fontSize: 18, fontWeight: "bold", color: "#292929",cursor:"pointer"}}>{postData?.title}</Text>
                        </Col>
                        <Col>
                            <Button icon={<FaRegThumbsUp/>}>0</Button>
                        </Col>
                    </Row>
                    <Row align={"middle"} justify={"space-between"} style={{marginTop: 16}}>
                        <Row align={"middle"} gutter={8}>
                            <Col>
                                <Text style={{fontSize: 16, color: grayColor}}>{postData.date}</Text>
                            </Col>
                            <Col>
                                <Text style={{fontSize: 22, color: grayColor}}> I </Text>
                            </Col>
                            <Col>
                                <Text style={{fontSize: 16, color: grayColor}}>{postData.writerName}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Text style={{fontSize: 16, color: grayColor}}>{postData.totalView}</Text>
                        </Row>

                    </Row>
                </Card>
            </Col>
    )
}

export default PostGridComponent;