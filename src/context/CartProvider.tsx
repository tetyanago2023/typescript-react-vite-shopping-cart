import {useMemo, useReducer} from "react";

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUSER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QAUNTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUSER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUSER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }
            const { sku, name, price } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return { ...state, cart: [...filteredCart, { sku, name, price, qty }] }
        }
        case REDUSER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }
            const { sku } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart] }
        }
        case REDUSER_ACTION_TYPE.QAUNTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }
            const { sku, qty } = action.payload
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if (!itemExists) {
                throw new Error ('Item must exist in order to update quantity')
            }

            const updatedItem: CartItemType = { ...itemExists, qty }
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart, updatedItem]}

            }
        case REDUSER_ACTION_TYPE.SUBMIT:
            return { ...state, cart: [] }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useCartContext = (initCartState:  CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUSER_ACTION_TYPE
    }, [])
    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)
    const totalPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.price * cartItem.qty)
        }, 0)
    )

    const cart = state.cart.sort((a,b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))

        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}