import React from 'react';
import { enquireScreen } from 'enquire-js';
import {
  Typography, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import Nav0 from '../Home/Nav0';

import {
  Nav00DataSource
} from '../Home/data.source';

import LayoutBreadcrumb from './layoutBreadcrumb'

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class App extends React.Component {
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
    const { children } = this.props;
    console.log(this.props);
    console.log(children);
    //const { getFieldDecorator } = this.props.form;
    const childrenContent = (
      <Layout >
        <Header className="header"  >
          {/* <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu> */}

          <Nav0
            id="Nav0_0"
            key="Nav0_0"
            dataSource={Nav00DataSource}
            isMobile={this.state.isMobile}
            chickloginstatus='true'
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ overflow: 'scroll', height: '100vh', background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1', 'sub2', 'sub3']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
                <Menu.Item key="13">option12</Menu.Item>
                <Menu.Item key="14">option12</Menu.Item>
                <Menu.Item key="15">option12</Menu.Item>
                <Menu.Item key="16">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <LayoutBreadcrumb  
            key="Breadcrumb0_0"
            />
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              {
                children
              }


            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/' || this.props.location.pathname === '/regist') {
      return <>{this.props.children}</>
    }


    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && childrenContent}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }

}