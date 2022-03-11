import React, { useReducer, createContext } from 'react'
import { ConversationType } from '../../services/Streamr_API';
import { GlobalDispatch, GlobalState } from './AppContextTypes';
import AppReducer from './AppReducer';

export const initialState: GlobalState = {
    streamr: undefined,
    selfId: undefined,
    ownProfile: undefined,
    notifications: [],
    conversations: [],
    selectedConversation: { profile: [{ address:'' }], streamId: '', selected: false, type: ConversationType.Hypha },
}

export const StateContext = createContext<GlobalState>(initialState);
export const DispatchContext = createContext<GlobalDispatch>(() => {});

export default function AppState(props){
    const [state, dispatch] = useReducer(AppReducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}