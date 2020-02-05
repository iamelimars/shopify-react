import React, { useContext } from 'react'
import { Div, SideDrawer, Text, Row, Col } from "atomize";
import {ShopContext} from '../context/shopContext'

const Cart = () => {

    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)

    return (
        <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
            <Div d="flex" flexDir="column" m={{ b: "4rem" }}>
                {checkout.lineItems && checkout.lineItems.map(item => (
                    <Row key={item.id}>
                        <Col>
                            <Div bgImg={item.variant.image.src} bgSize="cover" bgPos="center" h="5rem" w="4rem"/>
                        </Col>
                        <Col>
                            <Text>{item.title}</Text>
                            <Text>{item.variant.title}</Text>
                            <Text>{item.quantity}</Text>
                        </Col>
                        <Col>
                            <Text>{item.variant.price}</Text>
                        </Col>
                    </Row>
                ))}
                <a href={checkout.webUrl} target="_blank" rel="noopener noreferrer">Checkout</a>
            </Div>
        </SideDrawer>
    )
}

export default Cart

