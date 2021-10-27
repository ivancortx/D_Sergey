import React, {useContext} from 'react'

import styles from './FooterPage.module.scss'
import {GetCashModalCloseContext} from "context/GetCashModalContext";

export const FooterPage: React.VFC = () => {
  const closeModal = useContext(GetCashModalCloseContext)

  return (
      <div onClick={closeModal} className={styles.container}>
        <div className={styles.contactsBlock}>
          <div className={styles.contactsItem}>
            <a href="mailto:test@gmail.com">test@gmail.com</a>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; Place
        </div>
      </div>
  )
}