import React from 'react';

import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

import {ModalContainer, ModalDialog} from 'react-modal-dialog';

const USERS = [
    {
        user:'admin',
        password:'123'
    },
    {
        user:'red',
        password:'000'
    }
];

const tooltip = (
    <Tooltip id="login-tooltip">点击以切换用户。</Tooltip>
  );

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowingModal: false,
            username:props.defaultUser,
            btn_username:props.defaultUser,
            password:''
        }
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
    }
    handleClick = () => this.setState({isShowingModal: true});
    handleClose = () => this.setState({isShowingModal: false});
    handleUsernameChange(e){
        this.setState({username: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleClickLogin(event){
        const name = this.state.username;
        let isMatched = false;
        USERS.forEach(element => {
            if(element.user == name){
                if(element.password == this.state.password){
                    this.props.onUserChange(this.state.username);
                    this.setState({isShowingModal: false,btn_username:name});
                    isMatched = true;
                }
            }
        });
        if(!isMatched){
            alert('Wrong password or no such user');
        }
        event.preventDefault();
    }
    render() {
    return <div>
            <OverlayTrigger placement="right" overlay={tooltip}>
                <Button className="btn-change-user" onClick={this.handleClick}>User: {this.state.btn_username}</Button>
            </OverlayTrigger>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog>
                <form onSubmit={this.handleClickLogin}>
                <h3>Change user</h3>
                <FormGroup>
                    <FormControl placeholder="Username" type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                    <FormControl placeholder="Password" type="text" value={this.state.value} onChange={this.handlePasswordChange} />
                </FormGroup>
                <Button type="submit" >Login</Button>
                </form>
              </ModalDialog>
            </ModalContainer>
          }
        </div>;
    }
}

export default Login;