import React from 'react';
import { enquireScreen } from 'enquire-js';
import {
  Layout
} from 'antd';
import Nav0 from '../Home/Nav0';

import {
  Nav00DataSource
} from '../Home/data.source';

import LayoutBreadcrumb from './layoutBreadcrumb'
import MenuSlider from './menuSlider'

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;
const { Header, Content } = Layout;

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

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { children } = this.props;
    console.log(this.props);
    console.log(children);
    //const { getFieldDecorator } = this.props.form;
    const childrenContent = (
      <Layout >
        <Header className="header"  >
          <Nav0
            id="Nav0_0"
            key="Nav0_0"
            dataSource={Nav00DataSource}
            isMobile={this.state.isMobile}
            chickloginstatus='true'
          />
        </Header>
        <Layout>
          <MenuSlider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <LayoutBreadcrumb  
            key="Breadcrumb0_0"
            />
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