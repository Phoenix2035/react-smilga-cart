const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return {...state, cart: []}

        case "REMOVE_ITEM":
            return {...state, cart: state.cart.filter(item => item.id !== action.payload)}

        case "GET_TOTALS":
            let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
                let itemTotal = cartItem.price * cartItem.amount

                cartTotal.total += itemTotal
                cartTotal.amount += cartItem.amount
                return cartTotal
            }, {
                total: 0,
                amount: 0
            })

            total = parseFloat(total.toFixed(2))

            return {...state, total, amount}


        case "TOGGLE_AMOUNT":
            let tempCart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    if (action.payload.type === 'inc') {
                        return {...item, amount: item.amount + 1}
                    }
                    if (action.payload.type === 'dec') {
                        return {...item, amount: item.amount - 1}
                    }
                }
                return item
            }).filter((item) => item.amount !== 0)
            return {...state, cart: tempCart}

        case "LOADING":
            return {...state, loading: true}

        case "DISPLAY_ITEMS":
            return {...state, cart: action.payload, loading: false}

        default:
            return state
    }


}

export default reducer