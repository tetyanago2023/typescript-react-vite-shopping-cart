import { ProductsType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider.tsx"
import React, {ReactElement} from "react"


type PropsType = {
    product: ProductsType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}


const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType ): ReactElement => {
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})

    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

    const content =
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img"/>
            <p>{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </article>

    return content
}
export default Product