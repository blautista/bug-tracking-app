import React from 'react'
import styles from './Dropdown.module.scss'

const DropdownRow = (props) => {

  const sendClickedData = () => {
    props.onClick(props.text);
  }
  
  return (
    <div onClick={sendClickedData} className={styles.dropdownRow}>
      {props.text}
    </div>
  )
}

export default DropdownRow
