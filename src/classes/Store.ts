import EventBus from "./EventBus";
import * as types from '../types/types';

export enum StoreEvents {
    ChatsUpdated = 'ChatsUpdated',
    ChatUpdated = 'ChatUpdated',
    ChatSelected = 'ChatSelected',
    UserLogged = 'UserLogged'
}

interface IState {
    [key: string]: types.IUser | types.IChatItem[] | null | number
    currentUser: types.IUser | null,
    chats: types.IChatItem[],
    selectedChatId: number | null
}
class Store extends EventBus {
    state: IState = {
        currentUser: null,
        chats: [],
        selectedChatId: null
    };

    public set(key: keyof IState, value: types.IUser | types.IChatItem[] | number, valueType: StoreEvents) {
        this._setState(key, value);

        // метод EventBus
        this.emit(StoreEvents[valueType]);
    }

    public updateChatData(chatId: number, key: keyof types.IChatItem, value: string | number | types.ILastMessage | types.IUser[]) {
        this.state.chats.forEach(item => {
            if (item.id === chatId) {
                item[key] = value
            }
        })
    }

    public getState(key?: string) {
        return key ? this.state[key] : this.state;
    }

    _setState(key: keyof IState, value: types.IUser | types.IChatItem[] | number) {
        this.state[key] = value;
    }
}

export default new Store(); 
