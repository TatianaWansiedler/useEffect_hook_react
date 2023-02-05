import React, { useEffect, useState } from 'react';
import ProdCard from '../ProdCard';
import s from './style.module.css'

const Container = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        (async ()=>{
            const resp = await fetch('https://dummyjson.com/products')
            const data = await resp.json()
            const newArr = data.products.map(({id, title, price, discountPercentage, images, stock}) => 
            ({id, title, price, discountPercentage, images, stock} ))
            setProducts(newArr)
        })()
    },[])

   const delProduct = async (id) => {
        const resp = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
        })
        const data = await resp.json()
        console.log(data);   //It will simulate a DELETE request and will return deleted product with "isDeleted" & "deletedOn" keys
        setProducts(products.filter(product => product.id !== data.id))
   }

   const totalCount = products.reduce((sum,{stock}) => sum + stock, 0)
   const totalPrice = products.reduce((sum,{stock,price}) => sum + price * stock, 0)
   const totalPriceDiscount = products.reduce((sum,{stock,price,discountPercentage}) => 
        sum + (price - price * discountPercentage / 100) * stock, 0)
  
    return (
        <div >
            <div className={s.container}>
                {
                    products.map(product => 
                        <ProdCard 
                            key={product.id} 
                            {...product} 
                            delProduct={delProduct}
                        />)
                }
            </div>
            <div className={s.amount}>
                <p>Total count of items: {totalCount}</p>
                <p>Total amount (without the discount): {totalPrice} $</p>
                <p>Total amount (with the discount): {totalPriceDiscount.toFixed(1)} $</p>
            </div>
        </div>
    );
};

export default Container;