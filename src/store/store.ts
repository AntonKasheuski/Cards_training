import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./redusers/profile-reducer";
import {loginReducer} from "./redusers/login-reducer";
import {registerReducer} from "./redusers/register-reducer";
import {createPasswordReducer} from "./redusers/createPassword-reducer";
import {enterPasswordReducer} from "./redusers/enterPassword-reducer";
import {recoveryPasswordReducer} from "./redusers/recoveryPassword-reducer";
import thunkMiddleware from "redux-thunk";
import {SetNewPasswordReducer} from "./redusers/setNewPassword-reducer";
import {AppReducer} from "./redusers/app-reducer";


export const rootReducer  = combineReducers({
    app: AppReducer,
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer,
    createPassword: createPasswordReducer,
    enterPassword: enterPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    setNewPassword: SetNewPasswordReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store