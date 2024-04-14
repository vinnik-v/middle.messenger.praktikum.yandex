import Template from './modal-search-field.hbs?raw';
import './modal-search-field.scss';
import FormInputField from "../../../../../../components/form/components/form-input-field";
import InputElem from "../../../../../../components/form/components/form-input-field/components/input";
import Block from '../../../../../../classes/Block';
import SearchUser from '../../../../main-page-api/SearchUser';
import SearchResultRow from '../search-result-row';

export default class ModalSearchField extends FormInputField {
    constructor(props: typeof FormInputField.prototype.props) {
        const propTemplate = Template as string;
        const tagName = {
            tagName: 'li'
        }
        const className = {
            className: 'form-input-field'
        }

        const inputElemProps = [
            { name: 'id', value: 'login' }, 
            { name: 'name', value: 'login' },
            { name: 'type', value: 'text' },
            { name: 'placeholder', value: 'Логин' },
        ]

        const input = new InputElem({
            fieldName: 'login',
            fieldLabel: 'login',
            settings: { withInternalID: true },
            className: 'form-input-field__input',
            elemProps: inputElemProps,
            events: {
                input: async (e: Event)=> {
                    e.preventDefault();
                    const value = (<HTMLInputElement>e.target).value;
                    if (value) {
                        const data = {
                            login: value
                        }
                        const searchReq = new SearchUser(data);
                        try {
                            const searchRes = await searchReq.request();
                            const users = JSON.parse(searchRes.response) as Record<string, string>[];
                            
                            const noResult = users.length === 0;

                            const searchResult = users.map((item, index) => {
                                const userLogin: string = item.login? item.login : 'user_'+(index+1);
                                const value = new SearchResultRow({
                                    userName: `${item.login} (${item.first_name + ' ' + item.second_name})`,
                                    settings: { withInternalID: true },
                                    elemProps: [{ name: 'id', value: item.login }]
                                }) as Block;
                                return { [userLogin]: value };
                            }) as Record<string, Block>[];

                            this.setProps({
                                noResult,
                                showSearchResult: true,
                                searchResult: searchResult
                            });

                            (<HTMLElement>e.target).focus();

                        } catch {
                            // 
                        }
                    } else {
                        this.setProps({
                            showSearchResult: false,
                            searchResult: []
                        });
                        (<HTMLElement>e.target).focus();
                    }
                
                }
            }
        }) as Block;
        
        super({input, ...tagName, ...className, ...props}, propTemplate);
    }
    
}
