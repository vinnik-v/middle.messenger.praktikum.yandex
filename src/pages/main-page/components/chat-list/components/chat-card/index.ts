import './chat-card.scss';
import ChatCardTemplate from './chat-card.hbs?raw';
import Block from '../../../../../../classes/Block';
import ChatAvatar from '../../../../../../components/contact-avatar';

export default class ChatCard extends Block {
    constructor(props: typeof Block.prototype.props) {
        const template = ChatCardTemplate as string;
        const classList = {
            classList: ['chat-card']
        }
        const tagName = {
            tagName: 'li'
        }

        const avatar = props.avatar as string;

        const children = {
            ChatAvatar: new ChatAvatar({ 
                settings: { withInternalID: true },
                avatar
            }),
          } as Record<string, Block>

        super(template, {...tagName, ...children, ...classList, ...props});
        
    }
}
