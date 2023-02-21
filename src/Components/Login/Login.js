import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../../store/auth';
import {useForm} from 'react-hook-form';
 function Login({handleShowLogin,handleCloseLogin}) {
  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if(!data.payload) {
      return alert("Не удалось авторизоваться")
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  return (
    <Modal show={handleShowLogin} onHide={handleCloseLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Вхід</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Емайл</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@email.com"
              autoFocus
              {...register("email", 
              { required: true,
                 })}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Пароль"
              autoFocus
              {...register("password", 
              { required: true,
                minLength: {
                  value: 3,
                }})}/>
          </Form.Group>
          <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseLogin}>
          Вийти
        </Button>
        <Button type='submit' variant="primary" onClick={handleCloseLogin}>
          Увійти
        </Button>
      </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default React.memo(Login)