import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { Text, Div, Button, Row, Col, Container } from 'atomize'
import Loading from '../components/Loading'

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

    if (!product.title) return <Loading />
    return (
        <Container>
            <Row m={{ b: "2rem" }} p="2rem">
                <Col>
                    <Div bgImg={product.images[0].src} shadow="3" bgSize="cover" w="100%" bgPos="center center" h="40rem"/>
                </Col>
                <Col>
                    <Text tag="h1" textColor="black500" textWeight="200" m={{ y: '2rem' }}>{product.title}</Text>
                    <Text tag="h3" m={{ y: '2rem' }} textWeight="200">${product.variants[0].price}</Text>
                    <Text tag="p" textSize="paragraph" textColor="gray900" textWeight="200">{product.description}</Text>
                    <Button rounded="0" shadow="3" bg="black500" m={{ y: '2rem' }} onClick={() => addItemToCheckout(product.variants[0].id, 1)}>Add To Cart</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage
