import React from 'react'
import { Field, Form, Formik } from 'formik'
import {auth} from 'firebase/firebase'


import { validate } from './validate'


import styles from './LoginForm.module.scss'

export const LoginForm: React.VFC = () => {

  const addUser = async (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        addUser(values.email, values.password)
      }}>
      <div className={styles.container}>
        <Form className={styles.form}>
          <div className={styles.fieldName}>Введите email</div>
          <div className={styles.fieldInput}>
            <Field component="input" className="form-control" id="email" name="email" placeholder="Введіть логин"/>
          </div>
          <div className={styles.fieldName}>Введите пароль</div>
          <div className={styles.fieldInput}>
          <Field component="input" className="form-control" id="password" name="password" placeholder="Введіть пароль"/>
          </div>
          <button type='submit' className="btn btn-success">Войти</button>
        </Form>
      </div>
    </Formik>
  )
}