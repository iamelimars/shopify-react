import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { Text, Div, Button, Row, Col, Container } from 'atomize'

const ProductPage = () => {
    let { id } = useParams()
    const { fetchProductWithId, addItemToCheckout, product } = useContext(ShopContext)
    // const [product, setProduct] = useState(null)
    // async function fetchData() {
    //     const fetchedProduct = await fetchProductWithId(id)
    //     setProduct(fetchedProduct)
    // }

    useEffect(() => {
        fetchProductWithId(id)
        
        // fetchData()
        return () => {
            // setProduct(null)
        };
    }, [ fetchProductWithId, id])

    if (!product.title) return <div>loading</div>
    return (
        <Container>
            <Row>
                <Col>
                    <Div bgImg={product.images[0].src} bgSize="cover" w="100%" bgPos="center center" h="40rem"/>
                </Col>
                <Col>
                    <Text>{product.title}</Text>
                    <Text>${product.variants[0].price}</Text>
                    <Button onClick={() => addItemToCheckout(product.variants[0].id, 1)}>Add To Cart</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage
