import React from 'react';

const users = [
    {
        user:'admin',
        password:'123'
    }
];

class Login extends React.Component{
    constructor(props){
        super(props);
    };

    handleLogin(e){
        // Match input with user data,
        // if matched send username to AppComponent
    }

    render(){
        return (
            <div>
                
        );
    }
}

export default Login;