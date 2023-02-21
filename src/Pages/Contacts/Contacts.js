import React from 'react'
import contact from './contacts.css'
export default function Contacts() {
  return (
    <div className='contacts-wrapper'>
      <br/>
      <h3>Контакти</h3>

      <br />
      <br />

      <p className='contacts-paragraph'>
        Сайт www.bambook.ua приймає замовлення цілодобово. Будь-який товар (якщо
        він є в наявності на складі) буде доставлений максимально швидко. Для
        оформлення замовлення ви можете скористатися послугами кол-центру
        BamBook за тел. (044) 333-8530 або 0-800-335-425 (безкоштовно по
        Україні). Наші оператори дадуть відповіді на запитання і допоможуть
        вирішити будь-яку проблему.
      </p>

      <p className='contacts-paragraph'><span className='contacts-paragraph-span'>E-mail:</span> BamBook@gamil.com</p>

      <br/>

      
      <p className='contacts-paragraph'><span className='contacts-paragraph-span'>Телефон:</span> (044) 333-8530</p>

      <p className='contacts-paragraph'><span className='contacts-paragraph-span'>Телефон:</span> 0-800-335-425</p>

      <br/>

      <p className='contacts-paragraph'><span className='contacts-paragraph-span'>Графік роботи</span> Кол-центр BamBook працює щодня з 08:00 до 21:00.</p>
    </div>
  );
}
