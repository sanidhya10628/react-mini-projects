const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        return { ...state, cart: [] }
    }

    if (action.type === 'REMOVE_CART_ITEM') {
        return {
            ...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)
        }
    }

    if (action.type === 'INCREASE_CART_ITEM') {
        const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem
        })


        return {
            ...state, cart: updatedCart
        }
    }

    if (action.type === 'DECREASE_CART_ITEM') {
        const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount - 1 }
            }
            return cartItem
        }).filter((cartItem) => cartItem.amount > 0)
        return {
            ...state, cart: updatedCart
        }
    }


    if (action.type === 'GET_TOTAL') {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem
            cartTotal.total += (price * amount)
            cartTotal.amount += amount
            return cartTotal
        }, {
            total: 0,
            amount: 0
        })
        total = parseFloat(total.toFixed(2))
        return { ...state, total, amount }
    }

    if (action.type === 'LOADING') {
        return { ...state, loading: true }
    }

    if (action.type === 'DISPLAY_ITEMS') {
        return { ...state, loading: false, cart: action.payload }
    }
    return state
}

export default reducer