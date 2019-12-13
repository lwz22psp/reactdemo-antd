import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import cookie from 'react-cookies'
import {axiosPost} from '../utils/axiosUtil'

const Item = Menu.Item;
const requestModel = {
  header:{
    
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
      selectedkey: '0',
      userId:0,
      userNickname:"",
      chickloginstatus:false
    };
    this.menu = React.createRef();
    


  }

  /*
  componentDidMount() {
    // 如果是 react 16.3 以下版本请使用 findDOMNode;
    this.menuDom = findDOMNode(this.menu);
  }
  */

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? this.menu.current.dom.scrollHeight : 0,
    });
  };

  logoutClick = () => {
    cookie.remove("token");
    location.reload();
  };

 componentWillMount=()=>{
  const token= cookie.load("token");
  const url = "/api/user/verifyToken";
  var _this=this;
  if(token==undefined||token==""){
    if(_this.props.chickloginstatus){
      location.href='/';
    }
  }else{
    
    
    axiosPost(url, requestModel, (data) => {
      _this.setState({
        userId:data.data.userId,
        userNickname:data.data.nickName
      });
      _this.render();
    });

    
  }
 }

  render() {
    
    const { ...props } = this.props;
    const { dataSource, isMobile, selectedKey } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { menuHeight, phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    Menu.selectedKey = selectedKey;
     var navChildren = Object.keys(navData).map((key, i) => (
      <Item key={i.toString()} {...navData[key]}>
        <a
          {...navData[key].a}
          href={navData[key].a.href}
          target={navData[key].a.target}
        >
          {navData[key].a.children}
        </a>
      </Item>
    ));
     
    if (this.state.userId > 0) {
      navChildren = [
        <Item key="1">
          <a
            href='/application'
          >
            {this.state.userNickname}
          </a>
        </Item>,
        <Item key="2">
          <a
            onClick={() => {
              this.logoutClick();
            }}
          >
            注销
      </a>
        </Item>
      ];
    }
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <a href='/' >
              <img width="20%" src={dataSource.logo.children} alt="img" /></a>
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            ref={this.menu} // {(c) => { this.menu = c; }}
            style={isMobile ? { height: menuHeight } : null}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={[selectedKey]}
              theme={isMobile ? 'dark' : 'default'}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
