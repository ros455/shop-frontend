import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchAuthMe, fetchAllUser, fetchIsAdmin } from '../../store/auth';
import { fetchAllProducts } from '../../store/product';

export default function FirstRequest() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe());
        dispatch(fetchIsAdmin());
        dispatch(fetchAllUser());
        dispatch(fetchAllProducts());
      }, []);
}
