import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

import { UserLoginModel, UserLogin } from '../../controller/UserController'
export default class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const form = this.props.form;
                UserLoginModel.userName = form.getFieldValue('username');
                UserLoginModel.userPwd = form.getFieldValue('password');
                UserLogin(UserLoginModel);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名，手机，邮箱，艺名都阔以" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>咕咕咕</Checkbox>
                    )}
                    {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                   
                    
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                </Form.Item>
               
            </Form>
        );
    }
}
