import React, { useContext } from 'react'
import { Div, SideDrawer, Text } from "atomize";
import {ShopContext} from '../context/shopContext'

const Cart = () => {

    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)

    return (
        <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
            <Div d="flex" flexDir="column" m={{ b: "4rem" }}>
                {checkout.lineItems && checkout.lineItems.map(item => (
                    <Div>
                        <Text>{item.title}</Text>
                        <Text>{item.variant.price}</Text>
                    </Div>
                ))}
                <a href={checkout.webUrl} target="_blank" rel="noopener noreferrer">Checkout</a>
            </Div>
        </SideDrawer>
    )
}

export default Cart

