import React, {useState, useEffect} from 'react'
import Index from "./components/card";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";

function App() {
    const [shoes, setShoes] = useState([]);
    const [cartShoes, setCartShoes] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(()=>{
        fetch('https://61322bd7ab7b1e001799b3a2.mockapi.io/shoes')
            .then((res) => {
            return res.json()
        }).then((json)=> {
            setShoes(json)
        })
    },[])


    const onAddToCart = (items) => {
        setCartShoes(prev => [...prev, items]);

    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer shoes={cartShoes} onClose={()=>setCartOpened(false)}/> }
            <Header onCLickCart={()=>setCartOpened(true)} />
            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                    <h1>Все кроссовки</h1>
                    <div className='search-block d-flex'>
                        <img src='./img/search.svg' alt='Search'/>
                        <input placeholder='Поиск...' type="text"/>
                    </div>
                </div>

                <div className='d-flex flex-wrap'>
                    { shoes.map((obj)=>(
                        <Index
                        title={obj.title}
                        price={obj.price}
                        imageUrl={obj.imageUrl}
                        onFavorite={()=>console.log('добавили в закладки')}
                        onPlus={(items)=>onAddToCart(items)}
                    />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
