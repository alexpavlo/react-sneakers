import React, {useState, useEffect} from 'react'
import axios from "axios"
import {Route} from "react-router-dom";
import Index from "./components/card";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";
;

function App() {
    const [shoes, setShoes] = useState([]);
    const [cartShoes, setCartShoes] = useState([]);
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(()=>{
        // fetch('https://61322bd7ab7b1e001799b3a2.mockapi.io/shoes')
        //     .then((res) => {
        //     return res.json()
        // }).then((json)=> {
        //     setShoes(json)
        // })
        axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/shoes').then((res)=> {
            setShoes(res.data);
        })
        axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart').then((res)=> {
            setCartShoes(res.data);
        })
    },[])


    const onAddToCart = (items) => {
        setCartShoes(prev => [...prev, items]);
        axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart', items)
    }

    const onRemoveCart = (id) => {
        setCartShoes(prev => prev.filter(items => items.id !== id));
        axios.delete(`https://61322bd7ab7b1e001799b3a2.mockapi.io/cart/${id}`)
    }

    const onAddToFavorite = (items) => {
        setFavorites(prev => [...prev, items]);
        axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites', items)
    }

    const inputHandler = (e) => {
        setSearchValue(e.target.value)
    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer shoes={cartShoes} onClose={()=>setCartOpened(false)} onRemove={onRemoveCart}/> }
            <Header onCLickCart={()=>setCartOpened(true)} />


            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className='search-block d-flex'>
                        <img src='./img/search.svg' alt='Search'/>
                        {searchValue && <img onClick={()=> setSearchValue('')} className='clear cu-p' src="./img/btn-remove.svg" alt="Clear"/>} {/*кнопка отображается тогда когда мы вбиваем что-то в инпут*/}
                        <input onChange={inputHandler} value={searchValue} placeholder='Поиск...' type="text"/>
                    </div>
                </div>

                <div className='d-flex flex-wrap'>
                    {shoes
                        .filter((obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))) /*поиск по фильтру даже с нижним регистром*/
                        .map((obj, index)=>(
                        <Index
                            key={index}
                        title={obj.title}
                        price={obj.price}
                        imageUrl={obj.imageUrl}
                        onFavorite={(items)=>onAddToFavorite(items)}
                        onPlus={(items)=>onAddToCart(items)}
                    />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
