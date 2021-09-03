import React, {useState, useEffect} from 'react';
import styles from './Card.module.scss'

const Card = ({onFavorite, imageUrl, title, price, onPlus}) => {
    const [isAdded, setIsAdded] = useState(false);

    const handlerPlus = () => {
        onPlus({title, imageUrl, price});
        setIsAdded(!isAdded);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src='./img/unliked.svg' alt='unliked'/>
            </div>
            <img width={133} height={112} src={imageUrl} alt='Sneakers'/>
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                    <img
                        className={styles.plus}
                        onClick={handlerPlus}
                        src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
                        alt='Plus'/>
            </div>
        </div>
    );
};

export default Card;