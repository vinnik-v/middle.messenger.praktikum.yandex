import ErrorPageTemplate from './error-page.hbs?raw';
import Block from '../../classes/Block';
import ErrorPageContent from '../../components/error-page-content';
export default class ErrorPage extends Block<Record<string, unknown>> {
    
    constructor(props: typeof Block.prototype.props) {
        const template = ErrorPageTemplate as string;
        const classList = {
            classList: ['main-container','error-page']
        }
        const children = {
            pageContent: new ErrorPageContent('error')
        }
        const tagName = {
            tagName: 'main'
        }
        super(template, {...tagName, ...classList, ...children, ...props});
        
    }
}
