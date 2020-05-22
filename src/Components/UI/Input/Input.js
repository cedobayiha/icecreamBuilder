import React from 'react';
import styles from './Input.module.css'

const input = (props) => {
  let inputVar = null;

  const inputStyles = [styles.InputEl]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid)
  }

  switch (props.elemtype) {
    case ('input'):
      inputVar = <input className={inputStyles.join(' ')}
        {...props.elemCofig}
        onChange={props.change}
        value={props.value} />;
      break;
    case ('select'):
      inputVar = <select
        className={inputStyles.join(' ')}{...props.elemConfig}
        value={props.value}
        onChange={props.change}
      >
        {props.elemConfig.options.map(option => {
          return <option key={option.value} value={option.value}>
            {option.displayVal}
          </option>
        })}
      </select>;
      break;
    case ('textarea'):
      inputVar = <textarea className={inputStyles.join(' ')}
        value={props.value} onChange={props.change} {...props.elemConfig}></textarea>
      break;
    default:
      inputVar = <input className={inputStyles.join(' ')}
        {...props.elemConfig}
        onChange={props.change}
        value={props.value} />
  }

  return (
    <div>
      <label className={styles.Label}>{props.label}</label>
      {inputVar}
    </div>
  )
}
export default input;