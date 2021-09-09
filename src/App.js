import React, {useState, useEffect} from 'react'
import axios from "axios"
import {Route} from "react-router-dom";
import Index from "./components/card";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";

function App() {
    const [shoes, setShoes] = useState([]);
    const [cartShoes, setCartShoes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/shoes').then((res) => {
            setShoes(res.data);
        })
        axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart').then((res) => {
            setCartShoes(res.data);
        })
        axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites').then((res) => {
            setFavorites(res.data);
        })
    }, [])

    const onAddToCart = (items) => {
        setCartShoes(prev => [...prev, items]);
        axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart', items)
    }

    const onRemoveCart = (id) => {
        setCartShoes(prev => prev.filter(items => items.id !== id));
        axios.delete(`https://61322bd7ab7b1e001799b3a2.mockapi.io/cart/${id}`)
    }

    const onAddToFavorite = async (items) => {
        try{
            if (favorites.find((favObj) => favObj.id === items.id)) {
                axios.delete(`https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites/${items.id}`)
            } else {
                const { data } = await axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites', items)
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Ой, что-то пошло не так с фаворитами :D')
        }
    }

    const inputHandler = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer shoes={cartShoes} onClose={() => setCartOpened(false)} onRemove={onRemoveCart}/>}
            <Header onCLickCart={() => setCartOpened(true)}/>


            <Route path='/' exact>
                <Home
                    shoes={shoes}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    inputHandler={inputHandler}
                    onAddToCart={onAddToCart}
                    onAddToFavorite={onAddToFavorite}
                />
            </Route>

            <Route path='/favorite' exact>
                <Favorite shoes={favorites} onAddToFavorite={onAddToFavorite}/>
            </Route>
        </div>
    );
}

export default App;
