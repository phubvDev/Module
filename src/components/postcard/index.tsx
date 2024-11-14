import React from "react";
import {Button, Card, Col, Row,Typography} from "antd";
import styles from "./postcard.module.css";
import {Link} from "react-router-dom";
import {FaRegThumbsUp} from "react-icons/fa";
import {grayColor} from "../../const/colors.ts";
const {Text} = Typography;

interface PostCardProps {
    title: string;
    totalLike: number;
    date: string;
    writerName: string;
    totalView: number;
}
const PostCardComponent:React.FC<PostCardProps> = ({title, totalLike, date, writerName, totalView}) => {
    return (
        <Card className={styles.card}>
            <Row align={"middle"} justify={"space-between"}>
                <Col>
                    <Link to={""} style={{fontSize: 18, fontWeight: "bold", color: "#292929"}}>{title}</Link>
                </Col>
                <Col>
                    <Button icon={<FaRegThumbsUp/>}>{totalLike}</Button>
                </Col>
            </Row>
            <Row align={"middle"} justify={"space-between"} style={{marginTop: 16}}>
                <Row align={"middle"} gutter={8}>
                    <Col>
                        <Text style={{fontSize: 16, color: grayColor}}>{date}</Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 22, color: grayColor}}> I </Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 16, color: grayColor}}>{writerName}</Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 22, color: grayColor}}> I </Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 16, color: grayColor}}>{totalView}</Text>
                    </Col>
                </Row>



            </Row>
        </Card>
    )
}

export default PostCardComponent;