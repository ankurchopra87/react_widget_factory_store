// Reducer for cart
function reducer(state, action){
    if (state === undefined){
        return { cartItems: []}
    }

    var items = state.cartItems; 

    switch(action.type){
        case "addToCart":
            // When item is added to cart.
            return { cartItems: items.concat([action.cartItem])};
        case "removeFromCart": // When item is removed from cart.
            if (action.cartItemIndex !== undefined){
                items = items.slice();
                items.splice(action.cartItemIndex, 1)
                return {
                    cartItems: items
                }
            }else {
                return { cartItems: []}
            }
          
        default: 
    }
}

export default reducer; 