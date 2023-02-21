import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/auth';
import { allUsers } from '../../store/auth'
import {useForm} from 'react-hook-form';

 function Registration({showRegistration,handleCloseRegistration}) {

    const dispatch = useDispatch();

    const all = useSelector(allUsers)

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
          email: '',
          name: '',
          password: '',
        },
        mode: 'onChange'
      })

        const onSubmit = async (values) => {

        let data = {};
        let bool = true;

        all.map((el) => {
          if(el.email == values.email) {
            bool = false;
            return alert("email уже существует")
          }
        })

        if (bool) {
          data = await dispatch(fetchRegister(values));
        }

        if(!data.payload) {
          return alert("Не удалось зарегистрироваться")
        }
    
        if('token' in data.payload) {
          window.localStorage.setItem('token', data.payload.token)
        }
      }

  return (
    <Modal show={showRegistration} onHide={handleCloseRegistration}>
      <Modal.Header closeButton>
        <Modal.Title>Реєстрація</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Вкажіть ваше імя</Form.Label>
            <Form.Control
              placeholder="Імя"
              autoFocus
              {...register("name", 
              { required: true,
                minLength: {
                  value: 3,
                }
              })}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Вкажіть емайл</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@email.com"
              autoFocus
              {...register("email", 
              { required: true,
                 })}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Вкажіть пароль</Form.Label>
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
          <Button variant="secondary" onClick={handleCloseRegistration}>
          Вийти
        </Button>
        <Button type='submit' variant="primary" onClick={handleCloseRegistration}>
          Зареєструватися
        </Button>
      </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(Registration)
