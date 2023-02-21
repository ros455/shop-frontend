import React from 'react'
import { Navbar,Container,Nav,NavDropdown, Form, Button, Modal } from 'react-bootstrap';
import {RiFilter3Line} from 'react-icons/ri'
import headerbottom from './headerbottom.css';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../../store/category.js';
import { searchProduct } from '../../store/product';
import { setCurrentPage } from '../../store/productOnPage';
import SigIn from '../SigIn/SigIn';
import SortPanel from '../SortPanel/SortPanel';
 function HeaderBottom() {

  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    dispatch(fetchCategory())
  },[])

  const search = (e) => {
    dispatch(searchProduct(e))
    dispatch(setCurrentPage(1))
  }

  return (
  <>
      <div className='header-bottom-wrapper'>
        <RiFilter3Line className='BsFillFilterSquareFill'
        onClick={handleShow}/>
          <Form className="header-bottom-form">
            <Form.Control
              type="search"
              placeholder="Пошук"
              className="me-2"
              aria-label="Search"
              onChange={(e) => search(e.target.value)}
            />
          </Form>
          <div className='sig-in-bottom-wrapper'>
          <SigIn/>
          </div>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Фільтри</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SortPanel/>
        </Modal.Body>
      </Modal>
  </>
  )
}

export default React.memo(HeaderBottom)
