import React, {useEffect, useState} from 'react';
import Index from "../components/card";
import axios from "axios";
import {AppContext} from "../App";


const Orders = () => {
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        (async()=>{
            try {
                const { data } = await axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items],[]))
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })()
    },[])
    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>

            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(10)] : orders)
                    .map((obj, index)=>(
                    <Index
                        key={index}
                        {...obj}
                        loading={isLoading}

                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;