import './error-page-content.scss';
import ErrorPageContentTemplate from './error-page-content.hbs?raw';
import Button from '../button';

const pageProps: Record<string, Record<string, string>> = {
    404: { header: '404', text: 'Страница не найдена' },
    error: { header: '500', text: 'Мы уже фиксим' }
}

import Block from '../../classes/Block';
export default class ErrorPageContent extends Block {
    
    constructor(pageType: string) {
        const template = ErrorPageContentTemplate as string;
        const className = {
            className: 'error-page__content'
        }
        const tagName = {
            tagName: 'div'
        }
        const pageProp = pageProps[pageType];

        const button = new Button('{{buttonText}}',{
            buttonText: 'Назад к чатам',
            className: 'navigate-button',
            redirectPage: '/messenger',
            elemProps: [{ name: 'id', value: 'err-page-button' }], 
            settings: { withInternalID: true },
        }) as Block;

        super(template, {...tagName, ...{ button: button } as Record<string, Block>, ...className, ...pageProp});
        
    }
}
