import EventBus from './EventBus';
import Handlebars from 'handlebars';
import uuidv4 from '../functions/uuidv4';

type TFunc = (event: Event) => void;

type TProps = { [key: string]: Block } | Record<string, number | string | string[] | File | boolean | null |
    Record<string, TFunc> |
    Record<string, boolean> |
    Record<string, Block>[] |
    Record<string, Record<string, Block>[]> |
    { name: string, value: string }[]>;

export default class Block {
    // События
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element: HTMLElement;
    _template: string;
    props: TProps;
    children: Record<string, Block | Record<string, Block>[]>;
    eventBus: () => EventBus;
    _id: string | undefined;
    _classList: string[];

    /** JSDoc
       * @param {string} tagName
       * @param {Object} props
       *
       * @returns {void}
       */
    constructor(template: string, propsAndChildren: TProps = {}) {

        const { children, props } = this._getChildren(propsAndChildren);

        this.children = children;

        this._template = template;
        this._id = propsAndChildren.settings && (<Record<string, boolean>>propsAndChildren.settings).withInternalID ? uuidv4() : undefined;
        const propsObj = this._id ? { ...props, id: this._id } : props as TProps;
        this.props = this._makePropsProxy(propsObj);

        this._element = document.createElement(this.props.tagName ? this.props.tagName as string : 'div');

        this._classList = [];
        this.props.className ? this._classList.push(this.props.className as string) : undefined;
        this.props.classList ? (<string[]>this.props.classList).forEach(item => this._classList.push(item as string)) : undefined;

        this._classList.forEach(item => this._element.classList.add(item as string));
        this.props.elemProps ? (<{ name: string, value: string }[]>this.props.elemProps).forEach(item => this._element.setAttribute(item.name, item.value)) : undefined;


        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        // Регистрируем события жизненного цикла
        this._registerEvents(eventBus);
        // Дергаем событие INIT
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildren(propsAndChildren: Record<string, unknown>) {
        const children: Record<string, Block | Record<string, Block>[]> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                // console.log(value)
                const blockValue = value.find(item => {
                    const itemEntries = Object.values(item);
                    if (itemEntries[0] instanceof Block) {
                        return item;
                    }
                })
                if (blockValue) {
                    children[key] = value as Record<string, Block>[];
                } else props[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    setProps = (nextProps: TProps) => {
        if (!nextProps) {
            return;
        }

        const oldProps = { ...this.props };
        const inpPropsEntries = Object.entries(nextProps);
        inpPropsEntries.forEach(item => {
            this.props[item[0]] = item[1];
        });

        const { children } = this._getChildren(this.props);

        this.children = {...this.children, ...children};

        this.componentDidUpdate(oldProps, nextProps);
    };

    _makePropsProxy(inpProps: TProps) {
        const props = new Proxy({}, {
            get(target: TProps, prop: string) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Отказано в доступе');
                }

                const value = target[prop];
                return typeof value === "function" ? (<TFunc>value).bind(target) : value;
            },
            set(target: TProps, prop: string, value) {
                target[prop] = value;
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            }
        });
        const inpPropsEntries = Object.entries(inpProps);
        inpPropsEntries.forEach(item => props[item[0]] = item[1]);
        return props;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    // Инициализация
    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
        this.dispatchComponentDidMount();
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(inpOldProps: TProps, newProps: TProps) {
        let componentDidUpdate = false;
        const oldPropsKeys = Object.keys(inpOldProps);

        oldPropsKeys.forEach((key: string) => {
            if (inpOldProps[key] !== newProps[key]) {
                componentDidUpdate = true
            }
        })

        if (componentDidUpdate) {
            this._componentDidUpdate();
        }
    }

    _addEvents() {
        const { events = {} as Record<string, EventListenerOrEventListenerObject> } = this.props as Record<string, Record<string, EventListenerOrEventListenerObject>>;
        
        if (events) Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });

    }

    _removeEvents() {
        const { events } = this.props as Record<string, Record<string, EventListenerOrEventListenerObject>>;

        if (events) Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });

    }

    compile(template: string, props: TProps) {

        const childEntries: TProps = { ...props };
        
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                const childs = child.map(item => {
                    const itemValue = Object.values(item);
                    return `<div data-id="${itemValue[0].props.id}"></div>`
                }).join('');
                childEntries[key] = childs;
            } else childEntries[key] = `<div data-id="${child.props.id}"></div>`;
        });

        const fragment = document.createElement('template');

        const hbsTemplate = Handlebars.compile(template);
        fragment.innerHTML = hbsTemplate(childEntries);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    const itemValue = Object.values(item);
                    const elem = fragment.content.querySelector(`[data-id="${itemValue[0].props.id}"]`);
                    if (elem) elem.replaceWith(itemValue[0].getContent());
                });
            } else {
                const elem = fragment.content.querySelector(`[data-id="${child.props.id}"]`);
                if (elem) elem.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    _render() {
        this._removeEvents();

        const newElem = this.compile(this._template, this.props);
        this._element.innerHTML = '';
        newElem.childNodes.forEach(item => this._element.appendChild(item as Node));

        // Навешиваем события на элемент
        this._addEvents();

    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return '';
    }

    getContent(): HTMLElement {
        return this._element;
    }

    validate(): boolean | void {

    }

    show() {
        this._render();
        this.apiRequest();
    }
    hide() {
        //
    }
    apiRequest(data?: Record<string, string>) {
        data
    }
}
