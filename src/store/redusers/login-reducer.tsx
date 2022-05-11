import {Dispatch} from "redux";
import {nekoCardsAPI} from "../../api/neko-cards-api";
import {setProfile} from "./profile-reducer";
import {AxiosError} from "axios";

enum LoginAction {
    SET_INITIALIZED = 'Login/SET_INITIALIZED',
    SET_IS_AUTH = 'Login/SET_IS_AUTH'
}

const initialState = {
    isAuth: false,
    initialized: false
}


export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case LoginAction.SET_IS_AUTH:
        case  LoginAction.SET_INITIALIZED:
            return {...state, ...action.payload}
        default:
            return state
    }
}


//actions
type SetInitializedType = ReturnType<typeof setInitialized>
export const setInitialized = (initialized: boolean) => {
    return {
        type: LoginAction.SET_INITIALIZED,
        payload: {
            initialized
        } as const
    }
}

type SetIsAuthType = ReturnType<typeof setIsAuth>
export const setIsAuth = (isAuth: boolean) => {
    return {
        type: LoginAction.SET_IS_AUTH,
        payload: {
            isAuth
        } as const
    }
}


//thunks
export const isAuthTC = () => (dispatch: Dispatch) => {
    nekoCardsAPI.AuthMe()
        .then(res => {
            const {name, email, avatar} = res.data
            dispatch(setProfile(res.data))
            dispatch(setIsAuth(true))
        })

        .finally(() => {
            dispatch(setInitialized(true))
        })
}


type ActionType = SetInitializedType | SetIsAuthType

type InitialStateType = typeof initialState



