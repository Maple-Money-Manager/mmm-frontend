# REDUX TUTORIAL

Links: 

[Redux Tutorial - Tutorialpoint]:  https://www.tutorialspoint.com/redux/redux_overview.htm
[Redux Tutorial - Learn Redux from Scratch]: https://www.youtube.com/watch?v=poQXNp9ItL4



Redux is a predictable state container for JavaScript apps. Helps to keep app organized and maintain data flow by allowing states to be stored in a global object called `Store`.



## Principles of Redux

### 1. Single Source of Truth

The state of your whole application is stored in an object tree within a single store. As whole application state is stored in a single tree, it makes debugging easy, and development faster.

### 2. State is Read-only

The only way to change the state is to emit an action, an object describing what happened. This means nobody can directly change the state of your application.

### 3. Changes are made with pure functions

To specify how the state tree is transformed by actions, you write pure reducers. A reducer is a central place where state modification takes place. Reducer is a function which takes state and action as arguments, and returns a newly updated state.



## Redux Installation

```javascript
//Install redux
npm install --save redux

//Using redux with react application, need 1 more dependency
npm install --save react-redux

//Installation of Redux DevTools
npm install --save-dev redux-devtools

```



## Redux Usage

To change a redux state, you will need an `action` - a plain object that describes the intention to cause change with a type property. It must have a type property which tells what type of action is being performed.

```javascript
return {
   type: 'ITEMS_REQUEST', //action type
   isLoading: true //payload information
}
```

Actions and states are held together by a function called Reducer. An action is dispatched with an intention to cause change. This change is performed by the reducer. Reducer is the only way to change states in Redux

```JavaScript
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ITEMS_REQUEST':
         return Object.assign({}, state, {
            isLoading: action.isLoading
         })
      default:
         return state;
   }
}
```

### Redux Store

A store is an immutable object tree in Redux. A store is a state container which holds the application’s state. Redux can have only a single store in your application. Whenever a store is created in Redux, you need to specify the reducer. 

#### createStore 

A `Store` can be created using the createStore function: `createStore(reducer, [preloadedState], [enhancer])` .

```javascript
import { createStore } from 'redux';
import reducer from './reducers/reducer'
const store = createStore(reducer);
```

#### getState

This function allows the retrieval of current state of Redux store

```javascript
store.getState()
```

#### dispatch

It allows you to dispatch an action to change a state in your application.

The syntax for dispatch is as follows −

```javascript
store.dispatch({type:'ITEMS_REQUEST'})
```

#### subscribe

It helps you register a callback that Redux store will call when an action has been dispatched. As soon as the Redux state has been updated, the view will re-render automatically.

The syntax for dispatch is as follows −

```javascript
store.subscribe(()=>{ console.log(store.getState());})
```

Note that subscribe function returns a function for unsubscribing the listener. To unsubscribe the listener, we can use the below code −

```javascript
const unsubscribe = store.subscribe(()=>{console.log(store.getState());});
unsubscribe();
```



### Redux Action

Actions are the only source of information for the store as per Redux official documentation. It carries a `payload` of information from your application to store. `Types` should be defined as string constants in your application as given below:

```javascript
const ITEMS_REQUEST = 'ITEMS_REQUEST';
```

To cause any change in the store, you need to dispatch an action first by using store.dispatch() function. The action object is as follows −

```javascript
{ type: GET_ORDER_STATUS , payload: {orderId,userId } }
{ type: GET_WISHLIST_ITEMS, payload: userId }
```

#### Action Creators

Action creators are the functions that encapsulate the process of creation of an action object.

```javascript
const ITEMS_REQUEST = ‘ITEMS_REQUEST’ ;
const ITEMS_REQUEST_SUCCESS = ‘ITEMS_REQUEST_SUCCESS’ ;
export function itemsRequest(bool,startIndex,endIndex) {
   let payload = {
      isLoading: bool,
      startIndex,
      endIndex
   }
   return {
      type: ITEMS_REQUEST,
      payload
   }
}
export function itemsRequestSuccess(bool) {
   return {
      type: ITEMS_REQUEST_SUCCESS,
      isLoading: bool,
   }
}
```

To invoke a dispatch function, you need to pass action as an argument to dispatch function.

```javascript
dispatch(itemsRequest(true,1, 20));
dispatch(itemsRequestSuccess(false));
```

You can dispatch an action by directly using store.dispatch(). However, it is more likely that you access it with react-Redux helper method called **connect()**.

### Redux Reducers

Reducers are a pure function in Redux. Pure functions are predictable. Reducers are the only way to change states in Redux. It is the only place where you can write logic and calculations. Reducer function will accept the previous state of app and action being dispatched, calculate the next state and returns the new object.

```javascript
const initialState = {
   isLoading: false,
   items: []
};
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ITEMS_REQUEST':
         return Object.assign({}, state, {
            isLoading: action.payload.isLoading
         })
      case ‘ITEMS_REQUEST_SUCCESS':
         return Object.assign({}, state, {
            items: state.items.concat(action.items),
            isLoading: action.isLoading
         })
      default:
         return state;
   }
}
export default reducer;
```

Or you can use shallow/deep copying with `spread operators` instead:

```javascript
const initialState = {
   isLoading: false,
   items: []
};
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ITEMS_REQUEST':
         return {...state, {
            isLoading: action.payload.isLoading
         }}
      case ‘ITEMS_REQUEST_SUCCESS':
         return {...state, {
            items: state.items.concat(action.items),
            isLoading: action.isLoading
         }}
      default:
         return state;
   }
}
export default reducer;
```

#### CombineReducers

we can combine reducers by using Redux combineReducers utility. The combineReducers generate a function which returns an object whose values are different reducer functions.

```javascript
/reducer/orderStatusReducer.js
import { GET_ORDER_STATUS } from ‘../constants/appConstant’;
export default function (state = {} , action) {
   switch(action.type) {
      case GET_ORDER_STATUS:
         return { ...state, orderStatusData: action.payload.orderStatus };
      default:
         return state;
   }
}

/reducer/getWishlistDataReducer.js
import { GET_WISHLIST_ITEMS } from ‘../constants/appConstant’;
export default function (state = {}, action) {
   switch(action.type) {
      case GET_WISHLIST_ITEMS:
         return { ...state, wishlistData: action.payload.wishlistData };
      default:
         return state;
   }
}

/reducer/index.js
import { combineReducers } from ‘redux’;
import OrderStatusReducer from ‘./orderStatusReducer’;
import GetWishlistDataReducer from ‘./getWishlistDataReducer’;

const rootReducer = combineReducers ({
   orderStatusReducer: OrderStatusReducer,
   getWishlistDataReducer: GetWishlistDataReducer
});
export default rootReducer;
```