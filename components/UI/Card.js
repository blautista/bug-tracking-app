import React from 'react'
import styles from './Card.module.scss'

const Card = (props) => {
  return (
    <div className={styles.card} style={{backgroundColor: props.bg || 'white'}}>
      {props.children}
    </div>
  )
}

export default Card
