import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import styles from "./postcard.module.css";
import {useNavigate} from "react-router-dom";
import {FaRegThumbsUp} from "react-icons/fa";
import {grayColor} from "../../const/colors.ts";
import {PostData} from "../../const/entity.ts";
import {fetchLikeByPostId} from "../../services/likeService.ts";
import {updateTotalView} from "../../services/postService.ts";

const {Text} = Typography;

interface PostCardProps {
    postData: PostData;
}

const PostCardComponent: React.FC<PostCardProps> = ({postData}) => {
    const [likeCount, setLikeCount] = useState<number>(0);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const [totalLike, totalDisLike] = await fetchLikeByPostId(postData.id);
                setLikeCount(totalLike - totalDisLike);
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    }, [postData.id]);
    const navigate = useNavigate();
    return (
        <Card className={styles.card}>
            <Row align={"middle"} justify={"space-between"}>
                <Col>
                    <Text
                        onClick={async () => {
                            try {
                                console.log("Post data id: ", postData.id);
                                await updateTotalView(postData.id);
                                navigate(`/module/posts/${postData.id}`, {state: {data: postData}});
                            } catch (error) {
                                console.error("Error updating total views:", error);
                            }
                        }}
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#292929",
                            cursor: "pointer"
                        }}
                    >
                        {postData?.title}</Text>
                </Col>
                <Col>
                    <Button icon={<FaRegThumbsUp/>}>{likeCount}</Button>
                </Col>
            </Row>
            <Row align={"middle"} justify={"space-between"} style={{marginTop: 16}}>
                <Row align={"middle"} gutter={8}>
                    <Col>
                        <Text style={{fontSize: 16, color: grayColor}}>{postData?.date}</Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 22, color: grayColor}}> I </Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 16, color: grayColor}}>{postData.writerName}</Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 22, color: grayColor}}> I </Text>
                    </Col>
                    <Col>
                        <Text style={{fontSize: 16, color: grayColor}}>{postData.totalView}</Text>
                    </Col>
                </Row>
            </Row>
        </Card>
    )
}

export default PostCardComponent;