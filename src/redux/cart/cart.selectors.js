import { createSelector } from 'reselect'; // memoization / select small state and pass it.
// because react redux, pass always new state to all redux connected component,
// it will re-render by not related object changes.
// To prevent it, we use reselect

// i need whole state => selectCartItemsCount(state)
const selectCart = state => state.cart;

// i need select cart
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

// i need selectCartItems
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  )
);