import React, { Component } from 'react';
import BackDrop from '../BackDrop/BackDrop';
import styles from './Modal.module.css';

import Aux from "../../../hoc/Aux/Aux";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show || nextProps.children !== this.props.children;
  }


  render() {
    return (
      <Aux>
        <BackDrop show={this.props.show} closed={this.props.modalClosed} />
        <div className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}>

          {this.props.children}
        </div>
      </Aux>
    )
  }

}

export default Modal;