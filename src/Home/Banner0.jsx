import React from 'react';
import { Button, Icon,Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Barrage from './Barrage0';
import Websocket from 'react-websocket';
import BannerTimeLine from './BannerTimeLine'

class Banner extends React.PureComponent {
  state = { visible: false ,
    barrage:new Barrage('canvas')
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
 

  componentDidMount(){
    const canvas = this.refs.canvas;
    this.state.barrage.init(canvas);
    this.state.barrage.draw();
  }

  handleData(data) {
    //let result = JSON.parse(data);
    if(data!="连接成功"){
      this.state.barrage.shoot(data);
    }
    //this.setState({count: this.state.count + result.movement});
  }


  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const url = 'wss://www.oldwestgate.com/websocket/'+Math.random() * 10+'/';
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
          onCancel={this.handleCancel}
          footer={null}
        >
         <BannerTimeLine />
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
