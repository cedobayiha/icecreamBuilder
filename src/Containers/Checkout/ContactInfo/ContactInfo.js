import React, { Component } from 'react';
import Input from '../../../Components/UI/Input/Input';
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
        value: ""
      },
      address: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your address',
          type: 'text'
        },
        value: ""
      },
      zipCode: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your postal code',
          type: 'text'
        },
        value: ""
      },
      city: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your City',
          type: 'text'
        },
        value: ""
      },
      province: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your Province',
          type: 'text'
        },
        value: ""
      },
      email: {
        elemType: 'input',
        elemConfig: {
          placeholder: 'Your Province',
          type: 'email'
        },
        value: ""
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
        value: ""
      }
    },
    formIsValid: false,
    ordered: false
  }

  onSubmit = (e) => {
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

  onChange = (e, inputId) => {
    const orderedForm = this.state.orderForm;
    const targeted = orderedForm[inputId];
    targeted.value = e.target.value

    this.setState()
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
      <form onSubmit={this.onSubmit}>
        {formsArr.map(input => {
          return <Input
            key={input.id}
            label={input.id}
            elemConfig={input.config.elemConfig}
            elemtype={input.config.elemType}
            value={input.config.value}
            change={(e) => (this.onChange(e, input.id))}
          />
        })}

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