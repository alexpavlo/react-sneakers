import React from "react"
import {AppContext} from "../App";

export const useCart = () => {
    const {cartShoes, setCartShoes} = React.useContext(AppContext);
    const totalPrice = cartShoes.reduce((sum, obj)=> obj.price + sum, 0);

    return{ cartShoes, setCartShoes, totalPrice };
};
