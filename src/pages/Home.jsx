import React from 'react';
import Index from "../components/card";

const Home = ({shoes,searchValue,setSearchValue,inputHandler,onAddToCart,onAddToFavorite}) => {
    return (
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
    );
};

export default Home;