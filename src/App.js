import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import {Route} from "react-router-dom";
import Index from "./components/card";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});


function App() {
    const [shoes, setShoes] = useState([]);
    const [cartShoes, setCartShoes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const shoesResponse = await axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/shoes')
                const cartResponse = await axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart')
                const favoriteResponse = await axios.get('https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites')

                setIsLoading(false);

                setCartShoes(cartResponse.data);
                setFavorites(favoriteResponse.data);
                setShoes(shoesResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных :С')
                console.error(error)
            }
        }

        fetchData();
    }, [])

    const onAddToCart = async (items) => {
        try {
            const findShoes = cartShoes.find((obj) => Number(obj.parentId) === Number(items.id))
            if (findShoes) {
                setCartShoes((prev) => prev.filter((obj) => Number(obj.parentId) !== Number(items.id)))
                await axios.delete(`https://61322bd7ab7b1e001799b3a2.mockapi.io/cart/${findShoes.id}`);

            } else {
                setCartShoes((prev)=>[...prev, items])
                const { data } = await axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/cart', items);
                setCartShoes((prev) => prev.map(obj => {
                    if (obj.parentId === data.parentId){
                        return{
                            ...obj,
                            id: data.id
                        };
                    } else {
                        return obj
                    }
                }));
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину')
            console.error(error)
        }
    }

    const onRemoveCart = async (id) => {
        try {
            axios.delete(`https://61322bd7ab7b1e001799b3a2.mockapi.io/cart/${id}`)
            setCartShoes((prev) => prev.filter(items => Number(items.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении в корзину')
            console.error(error)
        }
    }

    const onAddToFavorite = async (items) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(items.id))) {
                axios.delete(`https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites/${items.id}`)
                setFavorites((prev) => prev.filter((obj) => Number(obj.id) !== Number(items.id)))
            } else {
                const {data} = await axios.post('https://61322bd7ab7b1e001799b3a2.mockapi.io/favorites', items)
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Ой, что-то пошло не так с фаворитами :D')
            console.error(error)
        }
    }

    const inputHandler = (e) => {
        setSearchValue(e.target.value)
    }

    const isShoesAdded = (id) => {
        return cartShoes.some((items) => Number(items.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{  shoes, cartShoes, favorites, isShoesAdded, setCartOpened, setCartShoes, onAddToCart, onAddToFavorite }}>
            <div className="wrapper clear">
                {cartOpened && <Drawer shoes={cartShoes} onClose={() => setCartOpened(false)} onRemove={onRemoveCart} opened={cartOpened}/>}

                <Header onCLickCart={() => setCartOpened(true)}/>


                <Route path='react-sneakers/' exact>
                    <Home
                        shoes={shoes}
                        cartShoes={cartShoes}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        inputHandler={inputHandler}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                        isLoading={isLoading}
                    />
                </Route>

                <Route path='react-sneakers/favorite' exact>
                    <Favorite onAddToFavorite={onAddToFavorite}/>
                </Route>

                <Route path='react-sneakers/orders' exact>
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
