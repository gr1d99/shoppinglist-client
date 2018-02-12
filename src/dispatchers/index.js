import axios from 'axios';

import * as actions from "../actions";
import * as msgs from "../containers/utils/defaults";


import { BASE_URL, API_PREFIX, LIST_LIMIT, ITEM_LIST_LIMIT, PAGE, SEARCH_LIMIT } from '../components/Defaults';

const URL = `${ BASE_URL }${ API_PREFIX }`;
const DEFAULT_HEADER = 'application/x-www-form-urlencoded';

export const registerUser = (history, data) => {
    const _prefix = '/auth/register';
    const registerData = new FormData();

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
                dispatch(actions.RegisterUserSuccess(response));
                dispatch(actions.successfulOperation(msgs.ACCOUNT_CREATED))
                dispatch(actions.clearInternalState())
                history.push('/login');
            })
            .catch(error => {
                console.log(error.response)
                history.push('/signup');
                dispatch(actions.RegisterUserError(error))
                dispatch(actions.failedOperation(error))
            })
    }
};


export const LoginUser = (history, data) => {
    const _prefix = '/auth/login';
    const loginData = new FormData();

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
                window.location.reload()
            })
            .catch(error => {
                dispatch(actions.LoginUserError(error));
                dispatch(actions.failedOperation(error));
                history.push("/login")
            })
    }
};

export const LogoutUser = (history) => {
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
                dispatch(actions.LogoutUserSuccess(response));
                dispatch(actions.successfulOperation(msgs.LOGGED_OUT))
                history.push('/');
                window.location.reload()
            })
            .catch(error => {
                history.push('/');
                dispatch(actions.LogoutUserError(error))
                dispatch(actions.failedOperation(error))
            })
    }
};

export const fetchUserInfo = (history) => {
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
            dispatch(actions.fetchUserInfoError(error));
            error.response.data.message && dispatch(actions.failedOperation(error));
            history.push('/')
        })
};

export const updateUserInfo = (history, data) => {
    const _prefix = '/auth/users';
    const newData = new FormData();
    let apiKey = localStorage.getItem('apiKey');

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
                dispatch(actions.successfulOperation(msgs.ACCOUNT_UPDATED))
                history.push('/login');
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })
            .catch(error => {
                console.log(error.response);
                history.push('/dashboard/account/edit');
                dispatch(actions.updateUserInfoError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            })
    }
};

export const getPasswordResetToken = (history, data) => {
    const _prefix = '/auth/reset-password';
    const newData = new FormData();

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
                dispatch(actions.successfulOperation(response.data.message))
                history.push('/forgot-password/reset-token/show');
            })
            .catch(error => {
                history.push('/forgot-password');
                dispatch(actions.getResetTokenError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            })
    }
};


export const resetUserPassword = (history, data) => {
    const _prefix = '/auth/reset-password/process';
    const newData = new FormData();

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
                history.push('/');
            })
            .catch(error => {
                dispatch(actions.resetPasswordError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                history.push('/forgot-password/reset');
                setTimeout(
                    () => {
                        window.location.reload()
                    }, 3000)
            })
    }
};

export const deleteUserAccount = (history) => {
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
                history.push(`/`);
                dispatch(actions.deleteUserAccountError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            });
    }
};


// shoppinglists
export const createShoppingList = (history, data) => {
    const _prefix = '/shopping-lists';
    const newData = new FormData();

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
                // const newId = response.data.data.id;
                dispatch(actions.createShoppingListSuccess(response));
                dispatch(actions.successfulOperation(msgs.SHOPPING_LIST_CREATED));
                history.push(`/shoppinglists`)
            })
            .catch(error => {
                dispatch(actions.createShoppingListError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
                history.push(`/shoppinglists/create`)
            })
    }
};

export const getUserShoppingLists = (history, url=null) => {
    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');
    const finalUrl = !url ? `${URL}${_prefix}?limit=${LIST_LIMIT}&page=${PAGE}`: url;

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
            dispatch(actions.fetchShoppingListError(error));
            history.push('/shoppinglists')
        })
};

export const getUserShoppingListDetail = (history, id) => {
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
                dispatch(actions.getUserShoppingListError(error));
                history.push('/shoppinglists')
            })
    }
};

export const updateShoppingList = (history, id, new_data) => {
        const _prefix = '/shopping-lists';
        const newData = new FormData();

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

                })
                .catch(error => {
                    history.push(`/shoppinglists/${id}/edit`);
                    dispatch(actions.updateShoppingListError(error));
                    error.response.data.message && dispatch(actions.failedOperation(error));
                });
        }
};

export const deleteShoppingList = (history, id) => {
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
                    history.push(`/shoppinglists/${id}`);
                    dispatch(actions.deleteShoppingListError(error));
                    error.response.data.message && dispatch(actions.failedOperation(error));
                });
        }
};



export const createShoppingItem = (history, id, data) => {
    const _prefix = '/shopping-lists';
    const newData = new FormData();

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
            })
            .catch(error => {
                history.push(`/shoppinglists/${id}/items/create`);
                dispatch(actions.createShoppingItemError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            })
    }
};


export const fetchShoppingItems = (history, id, url=null) => {
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
                history.push(`/shoppinglists/${id}/items`);
                dispatch(actions.fetchShoppingItemsSuccess(response));
            })
            .catch(error => {
                history.push(`/shoppinglists/${id}`);
                dispatch(actions.fetchShoppingItemsError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            })
    }
};

export const getUserShoppingListItemDetail = (history, shlId, itemId) => {
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
                dispatch(actions.fetchShoppingItemDetailSuccess(response))
                history.push(`/shoppinglists/${shlId}/items/${itemId}/edit`)
            })
            .catch(error => {
                dispatch(actions.fetchShoppingItemsDetailError(error));
            })
    }
};

export const updateShoppingListItem = (history, shlId, itemId, new_data) => {
    const _prefix = '/shopping-lists';
    const newData = new FormData();


    // get appropriate value of bought field.
    // backend only accepts '1' and '0'
    let _bought = '';
    new_data.bought === true ? _bought = '1': _bought = '0';

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
                history.push(`/shoppinglists/${shlId}/items`);
                dispatch(actions.successfulOperation(msgs.SHOPPING_ITEM_UPDATED))
                dispatch(actions.updateShoppingItemDetailSuccess(response));

            })
            .catch(error => {
                history.push(`/shoppinglists/${shlId}/edit`);
                dispatch(actions.updateShoppingItemsDetailError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            });
    }
};

export const deleteShoppingItem = (history, shlId, itemId) => {
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
                history.push(`/shoppinglists/${shlId}`);
                dispatch(actions.deleteShoppingItemSuccess(response));
                dispatch(actions.successfulOperation(response.data.message))

            })
            .catch(error => {
                history.push(`/shoppinglists/${shlId}/items`);
                dispatch(actions.deleteShoppingItemError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            });
    }
};

export const searchShoppingLists = (history, term, url=null) => {
    const _prefix = '/shopping-lists/search';
    let apiKey = localStorage.getItem('apiKey');
    const finalUrl = !url ? `${URL}${_prefix}?q=${term}&limit=${SEARCH_LIMIT}&page=${PAGE}`: url;
    console.log('url------', url)

    return dispatch => {
        axios.get(
            finalUrl, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                dispatch(actions.searchShoppingListsSuccess(response));
                response.data.message && dispatch(actions.successfulOperation(response.data.message))
                history.push('/shoppinglists/search')
            })
            .catch(error => {
                history.push(`/shoppinglists/search`);
                dispatch(actions.searchShoppingListsError(error));
                error.response.data.message && dispatch(actions.failedOperation(error));
            })
    }
};
