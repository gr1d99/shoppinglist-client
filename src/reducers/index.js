/* Combine all app reducers */

import { combineReducers } from 'redux';

import auth from './auth';
import { shoppingListReducer } from './shoppinglists';
import { shoppingItemReducer} from "./shoppingitems";
import { alertsReducer } from "./alerts";
import { cleanup } from "./cleanup";
import { search } from "./search";
import { loader} from "./loader";

export default combineReducers({
    auth,
    shoppingList: shoppingListReducer,
    shoppingItem: shoppingItemReducer,
    alerts: alertsReducer,
    cleanup,
    search,
    loader
});