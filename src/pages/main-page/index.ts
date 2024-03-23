import './main-page.scss';
import MainPageTemplate from './main-page.hbs?raw';
import Block from '../../classes/Block';
import ChatWindow from './components/chat-window';
export default class MainPage extends Block {
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = MainPageTemplate as string;
        const classList = {
            classList: ['main-container', 'main-page']
        }
        const tagName = {
            tagName: 'main'
        }
        const children = {
          chatWindow: new ChatWindow({ settings: { withInternalID: true } })
        } as Record<string, Block>

        super(template, {...tagName, ...children, ...classList, ...props});
        
    }
}

