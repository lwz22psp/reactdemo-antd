import React from 'react';
import { enquireScreen } from 'enquire-js';
import Nav0 from '../../Home/Nav0';
import { Flex, Box } from '@rebass/grid';
import NormalLoginForm from './NormalLoginForm';
import {
    Typography,Form
} from 'antd';

import {
    Nav00DataSource
} from '../../Home/data.source';

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

const { location } = window;
const { Title } = Typography;


export default class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            isMobile,
            show: !location.port, // 如果不是 dva 2.0 请删除
        };
    }


    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({ isMobile: !!b });
        });
        // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
        /* 如果不是 dva 2.0 请删除 start */
        if (location.port) {
            // 样式 build 时间在 200-300ms 之间;
            setTimeout(() => {
                this.setState({
                    show: true,
                });
            }, 500);
        }
        /* 如果不是 dva 2.0 请删除 end */
    }

    render() {
        const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  
        //const { getFieldDecorator } = this.props.form;
        const children = [
            <Nav0
                id="Nav0_0"
                key="Nav0_0"
                dataSource={Nav00DataSource}
                isMobile={this.state.isMobile}
                selectedKey='1'
            />,
            <Flex key="Flex_0" >
                <Box mx='auto' mt={30}>
                    <Title>登陆</Title>
                </Box>
            </Flex>
            ,
            <Flex key="Flex_1" >

                <Box width={1 / 3}  >
                </Box>
                <Box width={1 / 5} m='auto' >
                <WrappedNormalLoginForm />
                </Box>
                <Box width={1 / 3}  >
                </Box>

            </Flex>

        ]
        return (
            <div
                className="templates-wrapper"
                ref={(d) => {
                    this.dom = d;
                }}
            >
                {/* 如果不是 dva 2.0 替换成 {children} start */}
                {this.state.show && children}
                {/* 如果不是 dva 2.0 替换成 {children} end */}
            </div>
        );
    }

}