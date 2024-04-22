import ChatTokenRequest from "./ChatTokenRequest";
import EventBus from "./EventBus";

enum SessionEvents {
    Connected = 'Connected',
    MessageIn = 'MessageIn',
    MessageOut = 'MessageOut',
    DataReceived = 'DataReceived',
}
export default class ChatSession extends EventBus {
    chatId: number;
    _chatToken: string | null = null;
    currentUserId: number;
    socket: WebSocket | null = null;
    ping: NodeJS.Timeout | null = null;
    constructor(props: Record<string, number>) {
        super();

        const { chatId, currentUserId } = props;
        this.chatId = chatId;
        this.currentUserId = currentUserId;
        this.listeners[SessionEvents.MessageIn] = [];
        this.listeners[SessionEvents.MessageOut] = [];
        this.listeners[SessionEvents.Connected] = [];
        this.listeners[SessionEvents.DataReceived] = [];
        this._getChatToken();
    }

    async _getChatToken() {
        const tokenRequest = new ChatTokenRequest(this.chatId);

        try {
            const requestResult = await tokenRequest.request();
            try {
                const tokenObj = JSON.parse(requestResult.response);
                tokenObj.token ? this._chatToken = tokenObj.token : undefined;
                if (this._chatToken) {
                    this._startSession();
                }
            } catch (err) {
                console.log(err);
             }
        } catch (err) {
            console.log(err);
         }
    }

    sendMessage(content: unknown) {
         if (this.socket) {
            this.socket.send(JSON.stringify({
                content: content,
                type: 'message',
            }))
            this.emit(SessionEvents.MessageOut)
         }
    }

    send(data: unknown) {
        if (this.socket) {
           this.socket.send(JSON.stringify(data))
           this.emit(SessionEvents.MessageOut)
        }
   }

    async _startSession() {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.currentUserId}/${this.chatId}/${this._chatToken}`);

        this.socket.addEventListener('open', () => {
            this.emit(SessionEvents.Connected);
            this.ping = setInterval(()=> {
                this.socket ? this.socket.send(JSON.stringify({
                    type: "ping",
                })) : undefined;
            }, 5000);
        });

        this.socket.addEventListener('close', () => {
            clearInterval(this.ping as NodeJS.Timeout);
        });

        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data);
            if (data.type === 'message') {
                this.emit(SessionEvents.MessageIn, data);
            } else if (Array.isArray(data)) {
                this.emit(SessionEvents.DataReceived, data);
            }
        });

        this.socket.addEventListener('error', event => {
            clearInterval(this.ping as NodeJS.Timeout);
            console.log('Ошибка', event);
        });
    }
}
