import {createContext, ReactElement, useEffect, useState} from "react";

export type ProductsType = {
    sku: string,
    name: string,
    price: number,
}

const initialState: ProductsType[] = []

// const initialState: ProductsType[] = [
//     {
//         "sku": "item0001",
//         "name": "Widget",
//         "price": 9.99
//     },
//     {
//         "sku": "item0002",
//         "name": "Premium Widget",
//         "price": 19.99
//     },
//     {
//         "sku": "item0003",
//         "name": "Deluxe Widget",
//         "price": 29.99
//     }
// ]

export type UseProductsContextType = {
    products: ProductsType[]
}

const initContextState: UseProductsContextType = {
    products: []
}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductsProvider = ({children}: ChildrenType): ReactElement => {
    const[products, setProducts] = useState<ProductsType[]>(initialState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductsType[]> => {
            const data =
                await fetch('http://localhost:3500/products')
                    .then(res => {
                        return res.json()
                    })
                    .catch(err => {
                        if (err instanceof Error) {
                            console.error(err.message)
                        }
                    })
            return data
        }

        fetchProducts().then(products => setProducts(products))
    }, [])

    return (
        // <ProductsContext.Provider value={{ products: initialState }}>
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext