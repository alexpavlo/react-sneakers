import React from 'react';

const Drawer = ({onClose, onRemove, shoes = []}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className='mb-30 d-flex justify-between'>Корзина <img onClick={onClose} className='cu-p'
                                                                          src="./img/btn-remove.svg" alt="close"/></h2>

                {shoes.length > 0 ? (
                    <div className='d-flex flex-column flex'>
                        <div className="items">
                            {shoes.map((obj) => (
                                <div className="cartItem d-flex align-center mb-20">
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
                                    <b>21 498 руб.</b>
                                </li>
                                <li className='d-flex'>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                                <button className='greenButton'>Оформить заказ <img src="./img/arrow.svg " alt="arrow"/>
                                </button>
                            </ul>
                        </div>
                    </div>
                ) : (

                        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
                            <img className='mb-20' width={120} height={120} src="./img/empty-cart.jpg" alt="Empty"/>
                            <h2>Корзина Пустая</h2>
                            <p className='opacity-6'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                            <button onClick={onClose} className='greenButton'>
                                <img src="./img/arrow.svg" alt="Arrow"/>
                                Вернуться назад
                            </button>
                        </div>

                )}
            </div>
        </div>
    );
};

export default Drawer;