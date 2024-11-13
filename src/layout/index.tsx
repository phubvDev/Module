import React from "react";

import {Layout} from "antd";
import Sidebar from "../pages/sidebar";
import HeaderPage from "../pages/header";
import FooterPage from "../pages/footer";

const {Content} = Layout;

interface LayoutProps {
    children : React.ReactNode;
}

const Index: React.FC<LayoutProps> = ({children} : LayoutProps) => {
    return(
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar/>
            <Layout style={{ marginInlineStart: 250,display: "flex", flexDirection: "column" }}>
                <HeaderPage/>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial',flex:1}}>
                    {children}
                </Content>
                <FooterPage/>
            </Layout>
        </Layout>
    )
}

export default Index;