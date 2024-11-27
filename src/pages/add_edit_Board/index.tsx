import React, {useEffect, useState} from "react";
import {Card, Form, Input, Select, Radio, Row, Col, Button, message} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

const {Option} = Select;
import styles from './addeditboard.module.css';
import {redColor, teal} from "../../const/colors.ts";
import {addBoard, deleteBoard, updateBoard} from "../../services/boardService.ts";
import {useContextGlobal} from "../../context/GlobalContext.tsx";
import {UserData} from "../../const/entity.ts";
import {fetchAllUsers} from "../../services/userService.ts";
const readandWriteData = [
    {id:"",name:"전체"},
    {id:"1",name:"일반회원-회원에 가입을 하면 level 1 입니다."},
    {id:"8",name:"Level.8"},
    {id:"9",name:"super admin"}
]

const AddorEditBoardPage: React.FC = () => {
    const navigate = useNavigate();
    const {getBoards} = useContextGlobal();
    const location = useLocation();
    const [isPrefaceEnabled, setIsPrefaceEnabled] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [form] = Form.useForm();
    const {mode, data} = location.state || {mode: 'create', data: null};
    console.log("data board",data)

    useEffect(() => {
        if (mode === "edit" && data) {
            const formattedData = {
                ...data,
                read: data.read ?? "",
                write: data.write ?? "",
            };
            form.setFieldsValue(formattedData);
            setIsPrefaceEnabled(data.preface);
        }
    }, [mode, data, form]);

    const getAllUsers = async () => {
        try {
            const response = await fetchAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error getAllUsers", error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const handlePrefaceChange = (e: any) => {
        const value = e.target.value;
        setIsPrefaceEnabled(value === 1);
        if (value === 0) {
            form.setFieldsValue({ prefaceText: "" });
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values before sending:", values);
            if (mode === 'create') {
                await addBoard(values);
                message.success("Board added successfully!");
                await getBoards();
            } else {
                await updateBoard(data!.id, values);
                message.success("Board updated successfully!");
               await getBoards();
            }
            navigate("/module/boards");
        } catch (error) {
            message.error("Failed to add board!");
            console.error(error);
        }
    };

    const handleDelete = async (id:number) => {
        try {
            await deleteBoard(id);
            message.success("Board deleted successfully!");
            await getBoards();
            navigate("/module/boards");
        } catch (error) {
            message.error("Failed to delete the board!");
            console.error(error);
        }
    }

    console.log("all users",users);
    return (
        <div className={styles.container}>
            <h1>멀티 게시판 관리</h1>
            <Card>
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={ mode === "create"
                        ? {
                            type: "1",
                            preface: 0,
                            prefaceText: "",
                            manager_id: "",
                            read: "",
                            write: "",
                            membership_system: 1,
                            status: "1",
                        }
                        : {
                            ...data,
                            preface: data.preface ? 1 : 0,
                        }}
                >
                    <Form.Item label="게시판 타입" name="type" rules={[{required: true}]}>
                        <Select style={{width: "100%"}}>
                            <Option value="1">리스트형</Option>
                            <Option value="2">격자형</Option>
                            <Option value="3">뉴스형</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="게시판 ID" name="boardId" rules={[{required: true, message: "게시판 ID를 입력하세요"}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="게시판명" name="name" rules={[{required: true, message: "게시판명을 입력하세요"}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="말머리" name="preface">
                        <Radio.Group onChange={handlePrefaceChange}>
                            <Radio value={1}>사용사용</Radio>
                            <Radio value={0}>미사용</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"prefaceText"} rules={[{ required: isPrefaceEnabled, message: "텍스트를 입력하세요." }]}>
                        <Input
                            placeholder="'구분은 ', '로 합니다'."
                            disabled={!isPrefaceEnabled}
                        />
                    </Form.Item>
                    <Form.Item label="관리자" name="managerId" rules={[{required: true, message: "관리자를 선택하세요"}]}>
                        <Select style={{width: "100%"}} showSearch optionFilterProp="children" notFoundContent="사용자가 없습니다">
                            {users.length > 0
                                ? users.map((user) => (
                                    <Option key={user.id} value={user.id}>
                                        {user.name}
                                    </Option>
                                ))
                                : null}
                        </Select>
                    </Form.Item>

                    <Form.Item label="읽기권한" name="read">
                        <Select style={{width: "100%"}} optionFilterProp="children">
                            {readandWriteData.map((item) => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="쓰기권한" name="write">
                        <Select style={{width: "100%"}} optionFilterProp="children">
                            {readandWriteData.map((item) => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="회원제" name="membershipSystem">
                        <Radio.Group>
                            <Radio value={1}>사용</Radio>
                            <Radio value={0}>미사용</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="상태" name="status">
                        <Select style={{width: "100%"}}>
                            <Option value="1">정상</Option>
                            <Option value="2">비공개</Option>
                            <Option value="3">보관</Option>
                        </Select>
                    </Form.Item>
                </Form>

                <Row gutter={8} justify={"space-between"}>
                    <Col>
                        <Button
                            type="primary"
                            style={{height: 40, backgroundColor: redColor, display: mode === 'edit' ? 'block' : 'none'}}
                            onClick={() => handleDelete(data!.id)}
                        >
                            삭제
                        </Button>
                    </Col>
                    <Row gutter={8}>
                        <Col>
                            <Button
                                style={{backgroundColor: teal, height: 40}}
                                type={"primary"}
                                onClick={() => navigate("/module/boards")}
                            >
                                목록
                            </Button>
                        </Col>
                        <Col>
                            <Button style={{height: 40}} type={"primary"} htmlType={"submit"} onClick={handleSubmit}>
                                추가하기
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Card>
        </div>
    );
};

export default AddorEditBoardPage;
