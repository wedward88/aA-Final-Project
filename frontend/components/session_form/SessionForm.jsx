import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoCredentials = this.demoCredentials.bind(this);
    }

    demoCredentials (){
        return (e) => {
            this.setState({ email:'testuser@gmail.com', password:'testpassword'}, ()=>{
                return this.props.login(this.state);
            })
        }
    }

    handleChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.verified){
            if (this.props.formType === 'login'){
                this.props.login(this.state);
                this.setState({ password: ''});
                this.props.clearErrors();
            } else {
                this.props.signup(this.state);
                this.setState({ email: '', password: ''})
                this.props.clearErrors();
            }
        } else {
            this.props.checkEmail({ email: this.state.email });
            document.getElementById('password-field').focus();
            this.props.clearErrors();
        }
    }

    render() {
        // debugger
        let redirectMessage;
        let linkPath;
        let linkText;
        let passwordClass;
        let allErrors;
        

        if (this.props.errors.session.errors) {
            allErrors = this.props.errors.session.errors.map((error, idx) => {
                return <li key={idx} >{error}</li>
            });
        } 

        if (this.props.formType === 'login'){
            redirectMessage = "Don't have an account?";
            linkPath = '/signup';
            linkText = 'Create account';
            passwordClass = 'password-field-hidden';
        } else {
            redirectMessage = "Already have an account?";
            linkPath = '/login';
            linkText = 'Sign In';
            passwordClass = 'password-field-show';
        }
        
        if (this.props.verified){
            passwordClass = 'password-field-show';
        }

        return (
            <div className="login-signup-form-container">
                    <form onSubmit={this.handleSubmit} className="login-signup-form">

                        <div id="form-title">
                        <Link to='/'><img src={window.endeavornoteIcon} /></Link>
                            <h1>Endeavornote</h1>
                            <h2>Remember everything for your next Endeavor.</h2>
                        </div>
                        
                        

                        <div id="form-input">
                            <button type="button" id="demo-login-button" onClick={this.demoCredentials()}>Continue with Demo User</button>
                            <div id="stupid-line">
                                <p><span>or</span></p>
                            </div>
                            <input 
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            placeholder='Email address'
                            />

                            <input 
                            type="password"
                            className={passwordClass}
                            id="password-field"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            placeholder='Password'
                            />

                            <ul>
                                {allErrors}
                            </ul>

                            <button id="form-submit-button" type="submit">Continue</button>

                            
                        </div>


                        <div id="form-redirect-info">
                            
                            <span>{redirectMessage}</span>
                            <Link onClick={this.props.clearErrors} to={linkPath}>{linkText}</Link>
                        </div>

                    </form>
            </div>
        )
    }
}

export default SessionForm;