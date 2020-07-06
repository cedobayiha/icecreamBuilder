import React, { Component } from 'react'
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import styles from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elemType: 'input',
        elemConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elemType: 'input',
        elemConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }


  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  verified(value, rules) {
    let isValid = true;
    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  // inputChangedHandler = (event, controlName) => {
  //   const updatedControls = {
  //     ...this.state.controls,
  //     [controlName]: {
  //       ...this.state.contols[controlName],
  //       value: event.target.value,
  //       valid: this.verified(event.target.value,         this.state.controls[controlName].validation),
  //       touched: true
  //     }
  //   };
  //   this.setState({ controls: updatedControls })
  // }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.verified(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    });
  }

  render() {
    const formsArr = [];
    for (let key in this.state.controls) {
      formsArr.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formsArr.map(formEl => (
      <Input
        key={formEl.id}
        invalid={!formEl.config.valid}
        label={formEl.id}
        elemConfig={formEl.config.elemConfig}
        elemtype={formEl.config.elemType}
        placeholder={formEl.config.elemConfig.placeholder}
        value={formEl.config.value}
        touched={formEl.config.touched}
        shouldValidate={formEl.config.validation}
        change={(event) => (this.inputChangedHandler(event, formEl.id))}
      />
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.error.message}</p>)
    }
    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirect} />
    }
    return (
      <div className={styles.Auth}>
        {authRedirect}
        {errorMessage}
        <form action="" onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            SUBMIT
           </Button>
        </form>

        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.icecreamBuilder.building,
    authRedirect: state.auth.authRedirectPath

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(authActions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
