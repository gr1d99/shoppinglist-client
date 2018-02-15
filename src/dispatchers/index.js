import axios from 'axios';

import * as actions from "../actions";
import * as msgs from "../containers/utils/defaults";


import { BASE_URL, API_PREFIX, LIST_LIMIT, ITEM_LIST_LIMIT, PAGE, SEARCH_LIMIT } from '../components/Defaults';

const URL = `${ BASE_URL }${ API_PREFIX }`;
const DEFAULT_HEADER = 'application/x-www-form-urlencoded';

export const registerUser = (history, data) => {
    /* Make registration request and dispatch actions based on the response */

    // constants
    const _prefix = '/auth/register';
    const registerData = new FormData(); // form data object

    // add data to form data object
    registerData.set('username', data.username);
    registerData.set('email', data.email);
    registerData.set('password', data.password);
    registerData.set('confirm', data.confirm);

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, registerData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                }
            })
            .then(response => {
                /* Dispatch appropriate actions after successful response */
                dispatch(actions.RegisterUserSuccess(response));
                dispatch(actions.successfulOperation(msgs.ACCOUNT_CREATED));
                dispatch(actions.clearInternalState());
                dispatch(actions.deactivateLoading()); // deactivate loading

                // redirect user to login
                history.push('/login');
            })
            .catch(error => {
                // handle errors in request
                history.push('/signup'); // redirect user to signup

                // dispatch error action creators
                dispatch(actions.RegisterUserError(error));
                dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading
            })
    }
};


export const LoginUser = (history, data) => {
    /* Make user login request and dispatch appropriate action creators */

    const _prefix = '/auth/login';
    const loginData = new FormData();

    // add data to form data object
    loginData.set('username', data.username);
    loginData.set('password', data.password);

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, loginData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                }
            })
            .then(response => {
                dispatch(actions.LoginUserSuccess(response));
                dispatch(actions.successfulOperation(msgs.LOGGED_IN));
                history.push("/");
                window.location.reload();
                dispatch(actions.deactivateLoading()); // deactivate loading
            })
            .catch(error => {
                // handle errors in request

                // dispatch error action creators
                dispatch(actions.LoginUserError(error));
                dispatch(actions.failedOperation(error));
                history.push("/login");
                dispatch(actions.deactivateLoading()); // deactivate loading

            })
    }
};

export const LogoutUser = (history) => {
    /* Make user logout request and dispatch appropriate action creators */

    const _prefix = '/auth/logout';
    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.delete(
            `${URL}${_prefix}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey,
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                dispatch(actions.LogoutUserSuccess());
                dispatch(actions.successfulOperation(msgs.LOGGED_OUT));
                history.push('/');
                dispatch(actions.deactivateLoading()); // deactivate loading
                window.location.reload()
            })
            .catch(error => {
                // handle errors in request

                history.push('/');

                // dispatch error action creators
                dispatch(actions.LogoutUserError(error));
                dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading

            })
    }
};

export const fetchUserInfo = (history) => {
    /* Make user info fetch request and dispatch appropriate action creators */

    const _prefix = '/auth/users';
    let apiKey = localStorage.getItem('apiKey');
    const finalUrl = `${URL}${_prefix}`;

    return dispatch => axios.get(
        finalUrl, {
            headers: {
                'Content-Type': DEFAULT_HEADER,
                'x-access-token': apiKey,
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => {
            history.push('/dashboard');
            dispatch(actions.fetchUserInfoSuccess(response));
            console.log(response)
        })
        .catch(error => {
            // handle errors in request

            // dispatch error action creators
            dispatch(actions.fetchUserInfoError(error));
            error.response.data.message && dispatch(actions.failedOperation(error));

            history.push('/')
        })
};

export const updateUserInfo = (history, data) => {
    /* Make user info update request and dispatch appropriate action creators */

    const _prefix = '/auth/users';
    const newData = new FormData();
    let apiKey = localStorage.getItem('apiKey');

    // add data to form data object
    newData.set('username', data.username);

    return dispatch => {
        axios.put(
            `${URL}${_prefix}`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                dispatch(actions.updateUserInfoSuccess(response));
                dispatch(actions.successfulOperation(msgs.ACCOUNT_UPDATED));
                actions.deactivateLoading();
                history.push('/login');
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })
            .catch(error => {
                // handle errors in request

                history.push('/dashboard/account/edit');

                // dispatch error action creators
                dispatch(actions.updateUserInfoError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading())
            })
    }
};

export const getPasswordResetToken = (history, data) => {
    /* Make user get password reset token request and dispatch appropriate action creators */

    const _prefix = '/auth/reset-password';
    const newData = new FormData();

    // add data to form data object
    newData.set('email', data.email);

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER
                }
            })
            .then(response => {
                dispatch(actions.getResetTokenSuccess(response));
                dispatch(actions.successfulOperation(response.data.message));
                dispatch(actions.deactivateLoading()); // deactivate loading
                history.push('/forgot-password/reset-token/show');
            })
            .catch(error => {
                // handle errors in request

                history.push('/forgot-password');

                // dispatch error action creators
                dispatch(actions.getResetTokenError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading

            })
    }
};


export const resetUserPassword = (history, data) => {
    /* Make user password reset request and dispatch appropriate action creators */

    const _prefix = '/auth/reset-password/process';
    const newData = new FormData();

    // add data to form data object
    newData.set('username', data.username);
    newData.set('new_password', data.new_password);
    newData.set('confirm', data.confirm);
    newData.set('reset_token', data.password_reset_token);

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER
                }
            })
            .then(response => {
                dispatch(actions.resetPasswordSuccess(response));
                dispatch(actions.successfulOperation(response.data.message));
                dispatch(actions.deactivateLoading()); // deactivate loading
                history.push('/');
            })
            .catch(error => {
                // handle errors in request

                // dispatch error action creators
                dispatch(actions.resetPasswordError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading

                // redirect user
                history.push('/forgot-password/reset');
                setTimeout(
                    () => {
                        window.location.reload()
                    }, 3000)
            })
    }
};

export const deleteUserAccount = (history) => {
    /* Make user account delete request and dispatch appropriate action creators */

    const _prefix = '/auth/users';

    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.delete(
            `${URL}${_prefix}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                history.push(`/login`);
                dispatch(actions.deleteUserAccountSuccess(response));
                dispatch(actions.successfulOperation(response.data.message));
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch(error => {
                // handle errors in request

                history.push(`/`); // redirect user

                // dispatch error action creators
                dispatch(actions.deleteUserAccountError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            });
    }
};


// shoppinglists
export const createShoppingList = (history, data) => {
    /* Make request to create shopping list and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    const newData = new FormData();

    // add data to form data object
    newData.set('name', data.name);
    newData.set('description', data.description);

    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                dispatch(actions.createShoppingListSuccess(response));
                dispatch(actions.successfulOperation(msgs.SHOPPING_LIST_CREATED));
                dispatch(actions.deactivateLoading()); // deactivate loading
                history.push(`/shoppinglists`) // redirect user
            })
            .catch(error => {
                // handle errors in request

                // dispatch error action creators
                dispatch(actions.createShoppingListError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading

                history.push(`/shoppinglists/create`) // redirect user
            })
    }
};

export const getUserShoppingLists = (history, url=null) => {
    /* Make request to fetch user shopping list and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');
    const finalUrl = !url ? `${URL}${_prefix}?limit=${LIST_LIMIT}&page=${PAGE}`: url;

    console.log(finalUrl)

    return dispatch => axios.get(
        finalUrl, {
            headers: {
                'Content-Type': DEFAULT_HEADER,
                'x-access-token': apiKey
            }
        })
        .then(response => {
            history.push('/shoppinglists');
            dispatch(actions.fetchShoppingListSuccess(response));
        })
        .catch(error => {
            // handle errors in request

            // dispatch error action creators
            dispatch(actions.fetchShoppingListError(error));

            history.push('/shoppinglists') // redirect user
        })
};

export const getUserShoppingListDetail = (history, id) => {
    /* Make request to fetch single user shopping list and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.get(
            `${URL}${_prefix}/${id}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                dispatch(actions.getUserShoppingListSuccess(response))
            })
            .catch(error => {
                // handle errors in request

                // dispatch error action creators
                dispatch(actions.getUserShoppingListError(error));

                history.push('/shoppinglists') // redirect user
            })
    }
};

export const updateShoppingList = (history, id, new_data) => {
    /* Make request to update user shopping list and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    const newData = new FormData();

    // add data to form data object
    newData.set('name', new_data.name);
        newData.set('description', new_data.description);

        let apiKey = localStorage.getItem('apiKey');

        return dispatch => {
            axios.put(
                `${URL}${_prefix}/${id}`, newData, {
                    headers: {
                        'Content-Type': DEFAULT_HEADER,
                        'x-access-token': apiKey
                    }
                })
                .then(response => {
                    history.push(`/shoppinglists/${id}`);
                    dispatch(actions.updateShoppingListSuccess(response));
                    dispatch(actions.successfulOperation(msgs.SHOPPING_LIST_UPDATED))
                    dispatch(actions.deactivateLoading()); // deactivate loading
                })
                .catch(error => {
                    // handle errors in request

                    history.push(`/shoppinglists/${id}/edit`); // redirect user

                    // dispatch error action creators
                    dispatch(actions.updateShoppingListError(error));
                    error.response.data.message && dispatch(actions.failedOperation(error));
                    dispatch(actions.deactivateLoading()); // deactivate loading
                });
        }
};

export const deleteShoppingList = (history, id) => {
    /* Make request to delete user shopping list and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';

        let apiKey = localStorage.getItem('apiKey');

        return dispatch => {
            axios.delete(
                `${URL}${_prefix}/${id}`, {
                    headers: {
                        'Content-Type': DEFAULT_HEADER,
                        'x-access-token': apiKey
                    }
                })
                .then(response => {
                    history.push(`/shoppinglists`);
                    dispatch(actions.deleteShoppingListSuccess(response));
                    dispatch(actions.successfulOperation(response.data.message))

                })
                .catch(error => {
                    // handle errors in request

                    history.push(`/shoppinglists/${id}`); // redirect user

                    // dispatch error action creators
                    dispatch(actions.deleteShoppingListError(error));
                    error.response.data.message && dispatch(actions.failedOperation(error));
                });
        }
};



export const createShoppingItem = (history, id, data) => {
    /* Make request to create user shopping item and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    const newData = new FormData();

    // add data to form data object
    newData.set('name', data.name);
    newData.set('price', data.price);
    newData.set('quantity_description', data.quantity);



    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.post(
            `${URL}${_prefix}/${id}/shopping-items`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                history.push(`/shoppinglists/${id}`);
                dispatch(actions.createShoppingItemSuccess(response));
                dispatch(actions.successfulOperation(msgs.SHOPPING_LIST_CREATED))
                dispatch(actions.deactivateLoading()); // deactivate loading
            })
            .catch(error => {
                // handle errors in request

                history.push(`/shoppinglists/${id}/items/create`); // redirect user

                // dispatch error action creators
                dispatch(actions.createShoppingItemError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading
            })
    }
};


export const fetchShoppingItems = (history, id, url=null) => {
    /* Make request to fetch user shopping items and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');
    const finalUrl = !url ? `${URL}${_prefix}/${id}/shopping-items?limit=${ITEM_LIST_LIMIT}&page=${PAGE}`: url;

    return dispatch => {
        axios.get(
            finalUrl, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                history.push(`/shoppinglists/${id}/items`); // redirect user
                dispatch(actions.fetchShoppingItemsSuccess(response));
            })
            .catch(error => {
                // handle errors in request

                history.push(`/shoppinglists/${id}`); // redirect user

                // dispatch error action creators
                dispatch(actions.fetchShoppingItemsError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            })
    }
};

export const getUserShoppingListItemDetail = (history, shlId, itemId) => {
    /* Make request to fetch user shopping item detail and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.get(
            `${URL}${_prefix}/${shlId}/shopping-items/${itemId}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                // dispatch success action creators
                dispatch(actions.fetchShoppingItemDetailSuccess(response));

                history.push(`/shoppinglists/${shlId}/items/${itemId}/edit`) // redirect user
            })
            .catch(error => {
                // handle errors in request

                // dispatch error action creators
                dispatch(actions.fetchShoppingItemsDetailError(error));
            })
    }
};

export const updateShoppingListItem = (history, shlId, itemId, new_data) => {
    /* Make request to update user shopping item and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';
    const newData = new FormData();


    // get appropriate value of bought field.
    // backend only accepts '1' and '0'
    let _bought = '';
    new_data.bought === true ? _bought = '1': _bought = '0';

    // add data into object
    newData.set('name', new_data.name);
    newData.set('price', new_data.price);
    newData.set('bought', _bought);
    newData.set('quantity_description', new_data.quantity_description);

    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.put(
            `${URL}${_prefix}/${shlId}/shopping-items/${itemId}`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                // dispatch success action creators
                dispatch(actions.successfulOperation(msgs.SHOPPING_ITEM_UPDATED));
                dispatch(actions.updateShoppingItemDetailSuccess(response));
                dispatch(actions.deactivateLoading()); // deactivate loading

                history.push(`/shoppinglists/${shlId}/items`); // redirect user
            })
            .catch(error => {
                // handle errors in request

                // dispatch error action creators
                dispatch(actions.updateShoppingItemsDetailError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading
                history.push(`/shoppinglists/${shlId}/items/${itemId}/edit`); // redirect user
            });
    }
};

export const deleteShoppingItem = (history, shlId, itemId) => {
    /* Make request to delete user shopping item and dispatch appropriate action creators */

    const _prefix = '/shopping-lists';

    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.delete(
            `${URL}${_prefix}/${shlId}/shopping-items/${itemId}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                history.push(`/shoppinglists/${shlId}`); // redirect user

                // dispatch error action creators
                dispatch(actions.deleteShoppingItemSuccess(response));
                dispatch(actions.successfulOperation(response.data.message))

            })
            .catch(error => {
                // handle errors in request

                history.push(`/shoppinglists/${shlId}/items`); // redirect user

                // dispatch error action creators
                dispatch(actions.deleteShoppingItemError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            });
    }
};

export const searchShoppingLists = (history, term, url=null) => {
    /* Make request to search user shopping lists and dispatch appropriate action creators */

    const _prefix = '/shopping-lists/search';
    let apiKey = localStorage.getItem('apiKey');
    const finalUrl = !url ? `${URL}${_prefix}?q=${term}&limit=${SEARCH_LIMIT}&page=${PAGE}`: url;

    return dispatch => {
        axios.get(
            finalUrl, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                // dispatch success action creators
                dispatch(actions.searchShoppingListsSuccess(response));
                response.data.message && dispatch(actions.successfulOperation(response.data.message));
                dispatch(actions.deactivateLoading()); // deactivate loading

                history.push('/shoppinglists/search') // redirect user
            })
            .catch(error => {
                // handle errors in request

                history.push(`/shoppinglists/search`); // redirect user

                // dispatch error action creators
                dispatch(actions.searchShoppingListsError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                dispatch(actions.deactivateLoading()); // deactivate loading
            })
    }
};
