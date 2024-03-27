import './contact-card.scss';
import ContactCardTemplate from './contact-card.hbs?raw';
import Block from '../../../../../../classes/Block';
import ContactAvatar from '../../../../../../components/contact-avatar';

export default class ContactCard extends Block {
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = ContactCardTemplate as string;
        const classList = {
            classList: ['contact-card']
        }
        const tagName = {
            tagName: 'li'
        }

        const children = {
            contactAvatar: new ContactAvatar({ settings: { withInternalID: true } }),
          } as Record<string, Block>

        super(template, {...tagName, ...children, ...classList, ...props});
        
    }
}
