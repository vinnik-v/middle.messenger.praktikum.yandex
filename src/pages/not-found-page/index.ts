import './not-found-page.scss';
import NotFoundPageTemplate from './not-found-page.hbs?raw';
import Block from '../../classes/Block';
import ErrorPageContent from '../../components/error-page-content';
export default class NotFoundPage extends Block<Record<string, unknown>> {
    
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = NotFoundPageTemplate as string;
        const classList = {
            classList: ['main-container','error-page']
        }
        const children = {
            pageContent: new ErrorPageContent('404')
        }
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}
