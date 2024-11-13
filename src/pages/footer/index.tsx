import React from "react";
import {secondaryColor} from "../../const/colors.ts";
import {Footer} from "antd/es/layout/layout";

const FooterPage:React.FC = () => {
    return(
        <Footer style={{ textAlign: 'center',borderTop:'1px solid #dee2e6',backgroundColor:secondaryColor}}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    )
}

export default FooterPage;