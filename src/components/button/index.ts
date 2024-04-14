import Block from "../../classes/Block";
import Router from "../../classes/Router";
import './button.scss';

export default class Button extends Block {
    constructor(template: string, props: typeof Block.prototype.props) {
        props.tagName ? props.tagName : props.tagName = 'button';
        const classList = props.classList? props.classList as string[] : ['button'];
        props.classList = [...classList];
        

        if (!props.events) {
            const events: Record<string, ((event: Event) => unknown)> = {};
            if (!props.buttonType || (props.buttonType && props.buttonType !== 'submit')) {
                if (props.redirectPage) {
                    events.click = (event: Event) => {
                        event.preventDefault();
                        const router = new Router();
                        router.go(props.redirectPage as string);
                    }
                }
            }
            props.events = events;
        }

        super(template ? template : '{{ buttonText }}', { classList, ...props });
    }
}
