import EventBus from "./EventBus";
import ChatSession from "./ChatSession";
import * as types from '../types/types';

export enum StoreEvents {
    ChatsUpdated = 'ChatsUpdated',
    ChatsCleared = 'ChatsCleared',
    ChatUpdated = 'ChatUpdated',
    ChatSelected = 'ChatSelected',
    ChatUnselected = 'ChatUnselected',
    ChatUsersChanged = 'ChatUsersChanged',
    ChatDeleted = 'ChatDeleted',
    UserLogged = 'UserLogged',
    UserUnlogged = 'UserUnlogged',
}

interface IState {
    [key: string]: types.IUser | types.IChatItem[] | null | number | Record<string, ChatSession>
    currentUser: types.IUser | null,
    chats: types.IChatItem[],
    selectedChatId: number | null,
    chatSessions: Record<string, ChatSession>;
}
class Store extends EventBus {
    state: IState = {
        currentUser: null,
        chats: [],
        selectedChatId: null,
        chatSessions: {}
    };

    public clearState() {
        this.state.currentUser = null;
        this.state.chats = [];
        this.state.selectedChatId = null;
        this.state.chatSessions = {};
    }

    public set(key: keyof IState, value: types.IUser | types.IChatItem[] | number | null, valueType: StoreEvents) {
        this._setState(key, value);

        // метод EventBus
        if (!this.listeners[StoreEvents[valueType]]) {
            this.listeners[StoreEvents[valueType]] = [];
        }
        this.emit(StoreEvents[valueType]);
    }

    public setChatSession(key: string, value: ChatSession) {
        this.state.chatSessions[key] = value;
    }

    public getChatSession(key: string) {
        return this.state.chatSessions[key];
    }

    public updateChatData(chatId: number, key: keyof types.IChatItem, value: string | number | types.ILastMessage | types.IUser[]) {
        this.state.chats.forEach(item => {
            if (item.id === chatId) {
                item[key] = value
            }
        });
        if (!this.listeners[StoreEvents.ChatUpdated]) {
            this.listeners[StoreEvents.ChatUpdated] = [];
        }
        this.emit(StoreEvents.ChatUpdated);
    }

    public getState(key?: string) {
        return key ? this.state[key] : this.state;
    }

    _setState(key: keyof IState, value: types.IUser | types.IChatItem[] | number | null) {
        this.state[key] = value;
    }
}

export default new Store(); 
