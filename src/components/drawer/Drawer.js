import React, {useState} from 'react';
import Info from "../info/info";
import axios from "axios";
import {useCart} from "../../hooks/useCart";



const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const Drawer = ({onClose, onRemove, shoes = [], opened}) => {
    const { cartShoes, setCartShoes, totalPrice} = useCart()
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/orders', {
                items: cartShoes,
            });
            setOrderId(data.id)
            setIsOrderCompleted(true);
            setCartShoes([]);

            for (let i = 0; i < cartShoes.length; i++) {
                const item = cartShoes[i];
                await axios.delete('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart' + item.id)
                await delay()
            }
        } catch (error) {
            alert('Не удалось создать заказ :С')
        }
        setIsLoading(false)
    }

    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className='mb-30 d-flex justify-between'>Корзина <img onClick={onClose} className='cu-p'
                                                                          src="./img/btn-remove.svg" alt="close"/></h2>

                {shoes.length > 0 ? (
                    <div className='d-flex flex-column flex'>
                        <div className="items">
                            {shoes.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg">
                                    </div>
                                    <div className='mr-20'>
                                        <p className='mb-5'>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className='removeBtn'
                                         src="./img/btn-remove.svg" alt="remove"/>
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className='d-flex'>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li className='d-flex'>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{(totalPrice / 100) * 5} руб.</b>
                                </li>
                                <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>Оформить
                                    заказ <img src="./img/arrow.svg " alt="arrow"/>
                                </button>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderCompleted ? "Заказ оформлен!" : "Корзина Пустая"}
                        description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        image={isOrderCompleted ? "./img/complete-order.jpg" : "./img/empty-cart.jpg"}/>

                )}
            </div>
        </div>
    );
};

export default Drawer;