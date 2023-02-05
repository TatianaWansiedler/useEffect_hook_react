import React from 'react';
import s from './style.module.css'

const ProdCard = ({id, title, price, discountPercentage, images, delProduct}) => {

    const newPrice = price - (price * discountPercentage / 100)
    return (
        <div className={s.card}>
            <img className={s.img} src={images[0]}  alt="product_image"/>
            <h3 className={s.title}> {title} </h3>
            <div className={s.prices}>
                <p className={s.start_price}> {price} $ </p>
                <p className={s.discount_price}> {newPrice.toFixed(2)} $</p>
            </div>
            <button className={s.del_btn} onClick={() => delProduct(id)}> Delete </button>
        </div>
    );
};

export default ProdCard;