import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()

const client = Client.buildClient({
    storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
    domain: 'graphql.myshopify.com'
})

class ShopProvider extends Component {
    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false
    }

    componentDidMount() {
        this.createCheckout()
    }

    createCheckout = async () => {
       const checkout = await client.checkout.create()
       await this.setState({ checkout: checkout })
    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [{
            variantId,
            quantity: parseInt(quantity, 10)
        }]
        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd )
        this.setState({ checkout: checkout })
        console.log(checkout);
        
        this.openCart()
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        this.setState({ products: products })
    }

    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id)
        this.setState({ product: product })
        return product
    }

    closeCart = () => { this.setState({ isCartOpen: false }) }
    openCart = () => { this.setState({ isCartOpen: true }) }

    render() {
        return(
            <ShopContext.Provider value={{ 
                ...this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithId: this.fetchProductWithId,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addItemToCheckout: this.addItemToCheckout

            }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}


const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider
