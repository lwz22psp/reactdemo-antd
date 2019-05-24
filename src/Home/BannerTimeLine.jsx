import { Timeline } from 'antd';

const appendZero = n=>n.toLocaleString({},{minimumIntegerDigits:2});

class BannerTimeLine extends React.Component {
  state = {
    reverse: false,
    time: 0,
  };
  componentDidMount(){
    var myDate=new Date();
    myDate.setFullYear(2019,4,10);
    myDate.setHours(0,0,0,0);

    var now = Date.now();

    var timespan =now-myDate.getTime();
    this.state.time=timespan;
    this.timer = setInterval(() => {
      this.setState({time: Date.now()-myDate.getTime()})
  }, 100)
  }
  
  
  render() {
    
var timedate = new Date(this.state.time);
    var sec = timedate.getSeconds();
    var min = timedate.getMinutes();
    var hour = timedate.getHours();
    var day = appendZero(Number.parseInt(this.state.time/3600000/24));
    return (
      <div>
          <Timeline pending={"距离阿鸡答应给需求已过去 "+day+'天'+hour+'小时'+min+'分'+sec+'秒'} reverse={this.state.reverse}>
          <Timeline.Item>哈皮牛买了服务器 2019-03-21</Timeline.Item>
          <Timeline.Item>服务器扩容 2019-04-29</Timeline.Item>
          <Timeline.Item>注册登陆完成 2019-05-05</Timeline.Item>
          <Timeline.Item>首页弹幕初版完成 2019-05-15</Timeline.Item>
        </Timeline>
      </div>
    );
  }
}

export default BannerTimeLine;