import './chat-card.scss';
import ChatCardTemplate from './chat-card.hbs?raw';
import Block from '../../../../../../classes/Block';
import ChatAvatar from '../../../../../../components/contact-avatar';

export default class ChatCard extends Block {
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = ChatCardTemplate as string;
        const classList = {
            classList: ['chat-card']
        }
        const tagName = {
            tagName: 'li'
        }

        const children = {
            ChatAvatar: new ChatAvatar({ settings: { withInternalID: true } }),
          } as Record<string, Block>

        super(template, {...tagName, ...children, ...classList, ...props});
        
    }
}
