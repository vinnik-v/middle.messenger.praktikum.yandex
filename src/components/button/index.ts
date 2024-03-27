import Block from "../../classes/Block";
import { navigate } from "../../router/router";

export default class Button extends Block {
    constructor(template: string, props: typeof Block.prototype.props) {
        props.tagName ? props.tagName : props.tagName = 'button';

        if (!props.events) {
            const events: Record<string, ((event: Event) => unknown)> = {};
            if (!props.buttonType || (props.buttonType && props.buttonType !== 'submit')) {
                if (props.redirectPage) {
                    events.click = (event: Event) => {
                        event.preventDefault();
                        navigate(props.redirectPage as string);
                    }
                }
            }
            props.events = events;
        }

        super(template ? template : '{{ buttonText }}', props);
    }
}
