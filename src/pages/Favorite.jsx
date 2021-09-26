import React from 'react';
import Index from "../components/card";
import {AppContext} from "../App";

const Favorite = ({ onAddToFavorite}) => {
    const {favorites} = React.useContext(AppContext)
    return (
        <div className='content p-40'>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои закладки</h1>
            </div>

            <div className='d-flex flex-wrap'>
                {favorites.map((obj, index)=>(
                        <Index
                            key={index}
                            id={obj.id}
                            title={obj.title}
                            price={obj.price}
                            imageUrl={obj.imageUrl}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Favorite;