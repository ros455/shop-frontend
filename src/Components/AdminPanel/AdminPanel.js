import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import adminpanel from './adminpanel.css'
export default class AdminPanel extends Component {
  render() {
    return (
    <div className='admin-panel-wrapper'>
        <Link to='admin-orders'>Замовлення</Link>
        <Link to='admin-products'>Товари</Link>
        <Link to='admin-categories'>Категорії</Link>
        <Link to='admin-users'>Користувачі</Link>
    </div>
    )
  }
}
