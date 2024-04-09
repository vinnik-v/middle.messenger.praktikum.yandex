import ChatTokenRequest from "./ChatTokenRequest";

export default class ChatSession {
    chatId: number;
    _chatToken: string | null = null;
    currentUserId: number;
    constructor(props: Record<string, number>) {
        const { chatId, currentUserId } = props;
        this.chatId = chatId;
        this.currentUserId = currentUserId;
        this._getChatToken();
        this._startSession();
    }

    async _getChatToken() {
        const tokenRequest = new ChatTokenRequest(this.chatId);

        try {
            const requestResult = await tokenRequest.request();
            try {
                const tokenObj = JSON.parse(requestResult.response);
                tokenObj.token ? this._chatToken = tokenObj.token : undefined;
            } catch { }
        } catch { }
    }

    _startSession() {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.currentUserId}/${this.chatId}/${this._chatToken}`);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: 'Моё первое сообщение миру!',
                type: 'message',
            }));
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    }
}