import StreamrClient from 'streamr-client';
import { Actions, ActionType, GlobalState, } from './AppContextTypes'
import { initialState } from './AppState';

export default function AppReducer(state: GlobalState, action: ActionType): GlobalState{
    switch(action.type){
        case Actions.CLEAR_STATE:
            return {...initialState};
        case Actions.SET_WEB3_PROVIDER:
            return {
                ...state,
                web3Provider: action.payload
            };
        case Actions.SET_ACCOUNT:
            return {
                ...state,
                ownProfile: {...state.ownProfile, address: action.payload}
            };
        //Streamr Session consists of a authenticated streamr instance & a copy of the delegated wallet
        case Actions.SET_STREAMR:
            return {
                ...state,
                streamr: new StreamrClient({
                        auth: {
                            ethereum: window.ethereum
                        },
                    }),
                streamrDelegate: {
                    client: new StreamrClient({
                        auth: {
                            privateKey: action.payload.privateKey
                        }
                    }),
                    wallet: action.payload,
                },
            };
        case Actions.SET_SELFID:
            return {
                ...state,
                selfId: action.payload
            };
        case Actions.SET_PROFILE:
            return {
                ...state,
                ownProfile: action.payload
            };
        case Actions.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        case Actions.SET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload
            };
        case Actions.ADD_CONVERSATION:
            return {
                ...state,
                conversations: [
                    ...state.conversations, 
                    action.payload
                ]
            };
        case Actions.DELETE_CONVERSATION:
            return {
                ...state,
                conversations: state.conversations.filter(conversation => conversation !== action.payload)
            };
        case Actions.SELECT_CONVERSATION:
            return {
                ...state,
                conversations:
                state.conversations.map(conversation => {
                    if(conversation.streamId === action.payload.streamId) {
                        return {
                            ...conversation,
                            selected: true
                        }
                    }
                    else{
                        return {
                            ...conversation,
                            selected: false
                        }
                    }
                }),
                selectedConversation: {...action.payload, selected: true}
            };
        // Not used
        case Actions.INVITE_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations]
            };
        case Actions.SET_MESSAGES:
            const newConversation = action.payload.conversation;
            newConversation.messages = [...newConversation.messages, ...action.payload.messages];
            return {
                ...state,
                conversations: [
                    ...state.conversations,
                    newConversation
                ]
            };
        // Not used
        case Actions.ADD_MESSAGE:
            return {...state};
        // Not used
        case Actions.DELETE_MESSAGE:
            return {...state};
        // Not used
        case Actions.SELECT_MESSAGE:
            return {...state};
        // Not used
        case Actions.SET_METADATA:
            const newConversation2 = action.payload.conversation;
            newConversation2.metadata = action.payload.metadata
            return {
                ...state,
                conversations: [
                    ...state.conversations,
                    newConversation2
                ]
            };
    }
}