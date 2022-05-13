import {Dispatch} from "redux";
import {packsListPageAPI} from "../../api/neko-cards-api";
import {AppRootStateType} from "../store";


// export type PackType = {
//     _id: string
//     user_id: string
//     name: string
//     cardsCount: number
//     created: string
//     updated: string
// }
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    deckCover: string
    grade: number
    user_name: string
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    __v: number
}
export type PacksListType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}


export type PacksListPageType = {
    packsList: PacksListType
    searchValue: string
}


const packsListInitialState: PacksListPageType = {
    packsList: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 1,
    },
    searchValue: ''
}

export const packsListReducer = (state: PacksListPageType = packsListInitialState, action: PacksListPageActionType): PacksListPageType => {
    switch (action.type) {
        case "UPDATE-PACK-LIST":
            return {...state, packsList: action.packsList}
        case "SET-SEARCH-VALUE":
            return {...state, searchValue: action.searchValue}
        case "ADD-NEW-PACK":
            return {
                ...state, packsList: {...state.packsList, cardPacks: [action.newPack, ...state.packsList.cardPacks]}
            }
        default:
            return state
    }
}

export const GetPacksListAC = (packsList: PacksListType) => {
    return {type: 'UPDATE-PACK-LIST', packsList} as const
}
export const SetSearchValueAC = (searchValue: string) => {
    return {type: 'SET-SEARCH-VALUE', searchValue} as const
}

export const AddNewPacksAC = (newPack: PackType) => {
    return {type: 'ADD-NEW-PACK', newPack} as const
}


export type UpdatePacksListAT = ReturnType<typeof GetPacksListAC>
export type SetSearchValueAT = ReturnType<typeof SetSearchValueAC>
export type AddNewPackType = ReturnType<typeof AddNewPacksAC>

export type PacksListPageActionType = UpdatePacksListAT | SetSearchValueAT | AddNewPackType

export const GetPacksListTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    packsListPageAPI.getPacksList(getState().packsList.searchValue)
        .then((res) => {
            dispatch(GetPacksListAC(res.data))
        })
}
export const AddPackTC = (newPack: NewPackType) => (dispatch: Dispatch) => {
    packsListPageAPI.addNewPack(newPack)
        .then(res => {
            dispatch(AddNewPacksAC(res.data.newCardsPack))
        })
}
export const DeletePackTC = (packId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    packsListPageAPI.deletePack(packId)
        .then(res => {
            packsListPageAPI.getPacksList(getState().packsList.searchValue)
                .then((res) => {
                    dispatch(GetPacksListAC(res.data))
                })
        })
}

export const UpdatePackTC = (packId: string, name: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let newUpdatePack = getState().packsList.packsList.cardPacks.find(el => el._id === packId)

    if(newUpdatePack){
        newUpdatePack.name = name
        packsListPageAPI.updatePack(newUpdatePack)
            .then(res => {
                packsListPageAPI.getPacksList(getState().packsList.searchValue)
                    .then((res) => {
                        dispatch(GetPacksListAC(res.data))
                    })
            })
    }
}



export type NewPackType = {
    name: string
    deckCover?: string
    private?: false
}

