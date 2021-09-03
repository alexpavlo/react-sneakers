import React from 'react';

const Drawer = ({onClose, shoes = []}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className='mb-30 d-flex justify-between'>Корзина <img onClick={onClose} className='cu-p'
                                                                          src="./img/btn-remove.svg"
                                                                          alt="close"/></h2>
                <div className="items">
                    {shoes.map((obj) => (
                        <div className="cartItem d-flex align-center mb-20">
                            <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg">
                            </div>
                            <div className='mr-20'>
                                <p className='mb-5'>{obj.title}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img className='removeBtn' src="./img/btn-remove.svg" alt="remove"/>
                        </div>
                        ))}
                </div>

                {/*<div className="cartItem d-flex align-center mb-20">*/}

                {/*    <div style={{backgroundImage: 'url(./img/sneakers/1.jpg)'}} className="cartItemImg">*/}

                {/*    </div>*/}
                {/*    <div className='mr-20'>*/}
                {/*        <p className='mb-5'>Мужские Кроссовки Nike Air Max 270</p>*/}
                {/*        <b>12 999 руб.</b>*/}
                {/*    </div>*/}
                {/*    <img className='removeBtn' src="./img/btn-remove.svg" alt="remove"/>*/}
                {/*</div>*/}

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
        </div>
    );
};

export default Drawer;