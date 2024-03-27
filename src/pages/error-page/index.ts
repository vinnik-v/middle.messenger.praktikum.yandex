import ErrorPageTemplate from './error-page.hbs?raw';
import Block from '../../classes/Block';
import ErrorPageContent from '../../components/error-page-content';
export default class ErrorPage extends Block {
    
    constructor(props: Record<string, string | string[] | Record<string, ((event: Event)=>unknown) | boolean> | { name: string, value: string}[]>) {
        const template = ErrorPageTemplate as string;
        const classList = {
            classList: ['main-container','error-page']
        }
        const children = {
            pageContent: new ErrorPageContent('error')
        } as Record<string, Block>
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}
