import React, { Component } from 'react';
import Input from '../../../Components/UI/Input/Input';
import Button from '../../../Components/UI/Button/Button';
import axios from 'axios';
import styles from './ContactInfo.module.css';

class ContactInfo extends Component {
  state = {
    orderForm: {
      name: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your name',
          type: 'text'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your address',
          type: 'text'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your postal code (in this format ---> K5T 1R3)',
          type: 'text'
        },
        value: "",
        validation: {
          required: true,
          minLength: 7,
          maxLength: 7
        },
        valid: false,
        touched: false
      },
      city: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your City',
          type: 'text'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      province: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your Province',
          type: 'text'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your Province',
          type: 'email'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMode: {
        elemType: 'select',
        elemConfig: {
          options: [
            { value: '', displayVal: 'please select a delivery method' },
            { value: 'fastest', displayVal: 'Fastest' },
            { value: 'basic', displayVal: 'Basic' }
          ]
        },
        value: "",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    ordered: false
  }

  verified = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '';
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.setState({ ordered: true })
    const formInfo = {}

    for (let formId in this.state.orderForm) {
      formInfo[formId] = this.state.orderForm[formId].value
    }

    const orderForm = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderInfo: formInfo
    }

    if (orderForm.price === 0) {
      this.props.history.push('/')
    }

    if (orderForm.price > 2) {
      axios.post('https://icecream-3aa92.firebaseio.com/orders', orderForm)
        .then(res => {
          this.setState({ ordered: false })
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({ ordered: false })
        })
    }
  }

  inputChangeHandler = (e, inputId) => {
    const orderedForm = this.state.orderForm;
    const targeted = orderedForm[inputId];

    targeted.value = e.target.value;

    targeted.valid = this.verified(targeted.value, targeted.validation);

    targeted.touched = true;

    let formIsValid = true;

    for (let iptSel in orderedForm) {
      formIsValid = orderedForm[iptSel].valid && formIsValid
    }

    this.setState({ orderForm: orderedForm, formIsValid: formIsValid })
  }


  render() {
    let formsArr = [];
    for (let key in this.state.orderForm) {
      formsArr.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formsArr.map(input => {
          return <Input
            key={input.id}
            invalid={!input.config.valid}
            label={input.id}
            elemConfig={input.config.elemConfig}
            elemtype={input.config.elemType}
            placeholder={input.config.elemConfig.placeholder}
            value={input.config.value}
            touched={input.config.touched}
            shouldValidate={input.config.validation}
            change={(e) => (this.inputChangeHandler(e, input.id))}
          />
        })}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    )
    return (
      <div className={styles.ContactInfo}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    )
  }

}

export default ContactInfo;