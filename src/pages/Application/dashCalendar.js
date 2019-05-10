import { Calendar,Spin } from 'antd';
import React from 'react';

function onPanelChange(value, mode) {
    console.log(value, mode);
  }

export default class app extends React.Component{
     

    state = { loading: false }
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading}>
                    <Calendar onPanelChange={onPanelChange} />
                </Spin>
          </div>
        );
    }
}