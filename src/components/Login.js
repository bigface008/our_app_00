import React from 'react';
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

class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
    }
    state = {
        isShowingModal: false,
        username:'',
        password:''
    }
    handleClick = () => this.setState({isShowingModal: true});
    handleClose = () => this.setState({isShowingModal: false});
    handleUsernameChange(e){
        this.setState({username: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleClickLogin(){
        const name = this.state.username;
        let isMatched = false;
        USERS.forEach(element => {
            if(element.user == name){
                if(element.password == this.state.password){
                    this.props.onUserChange(this.state.username);
                    this.setState({isShowingModal: false});
                    isMatched = true;
                }
            }
        });
        if(!isMatched){
            alert('Wrong password or no such user');
        }
    }
    render() {
    return <div>
        <button onClick={this.handleClick}>Change User</button>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog>
                <h3>Change user</h3>
                <label>
                    Username:
                    <input type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="text" value={this.state.value} onChange={this.handlePasswordChange} />
                </label>
                <br/>
                <button onClick={this.handleClickLogin}>Login</button>
              </ModalDialog>
            </ModalContainer>
          }
        </div>;
    }
}

export default Login;