import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Container,Nav } from 'react-bootstrap';
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillTwitterSquare} from 'react-icons/ai'
import Basket from '../Basket/Basket';
import SigIn from '../SigIn/SigIn';
import header from './header.css'
 function HeaderTop ({cartLength}) {

    return (
        <>
    <Navbar bg="light" expand="lg" className='header-top-wrapper'>
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className='top-basket'>
        <Basket cartLength={cartLength}/>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link to="/">Головна</Link>
            <Link to="about-us">Про нас</Link>
            <Link to="pay-and-delivery">Оплата та доставка</Link>
            <Link to="exchange-and-return">Обмін та повернення</Link>
            <Link to="contacts">Контакти</Link>
          </Nav>
          <Nav className='social-wrapper'>
          <Nav.Link href="https://uk-ua.facebook.com/" className='social-wrapper_link'>
            <AiFillFacebook className='social'/>
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com/" className='social-wrapper_link'>
            <AiFillInstagram className='social'/>
          </Nav.Link>
          <Nav.Link href="https://twitter.com/" className='social-wrapper_link'>
            <AiFillTwitterSquare className='social'/>
          </Nav.Link>
          </Nav>
          <Nav className='sig-in-top-wrapper'>
          <SigIn/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
      );
}

export default React.memo(HeaderTop)