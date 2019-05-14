import React from 'react';
import { Button, Icon,Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Barrage from './Barrage0';
import Websocket from 'react-websocket';

class Banner extends React.PureComponent {
  state = { visible: false ,
    barrage:new Barrage('canvas')
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
 

  componentDidMount(){
    const canvas = this.refs.canvas;
    this.state.barrage.init(canvas);
  }

  handleData(data) {
    //let result = JSON.parse(data);
    if(data!="连接成功"){
      this.state.barrage.shoot(data);
      this.state.barrage.draw();
    }
    //this.setState({count: this.state.count + result.movement});
  }


  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const url = 'ws://47.102.218.92:8080/websocket/'+Math.random() * 10+'/';
    return (
      <div {...currentProps} {...dataSource.wrapper}>
      <Websocket url={url}
              onMessage={this.handleData.bind(this)}/>
      <canvas id="canvas" ref="canvas"  style={{position:"absolute",top:0,left:0,width:'100%'}}>
        您的浏览器不支持canvas标签。
      </canvas>
        <QueueAnim
          key="QueueAnim"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          <div key="title" {...dataSource.title}>
          <img src={require('../source/pegin.png')} width="55%" alt="img" />
          </div>
            <div key="content" {...dataSource.content}>
            {dataSource.content.children}
          </div>
          <Button ghost key="button" onClick={this.showModal} {...dataSource.button}>
            {dataSource.button.children}
          </Button>
          <Modal
          title={dataSource.button.children}
          visible={this.state.visible}
          onOk={this.handleOk}
          
        >
          <p>点你妹啊，阿鸡</p>
          <p>快出需求</p>
        </Modal>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="banner0-icon"
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </div>
    );
  }
}
export default Banner;
