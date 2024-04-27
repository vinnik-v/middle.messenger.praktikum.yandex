
import Block from "./Block.ts";

class IBlock extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super('', props)
    }
}

function render(query: string, block: IBlock) {
    const root = document.querySelector(query);
    (<HTMLElement>root).innerHTML = '';
    (<HTMLElement>root).appendChild(block.getContent());
    return root;
}

class Route {
    _pathname: string;
    _blockClass: typeof IBlock;
    _block: null | IBlock;
    _props: Record<string, string>;

    constructor(pathname: string, view: typeof IBlock, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({ settings: { withInternalID: true } });
            render(this._props.rootQuery, this._block);
            return;
        }
        
        this._block.show();
        render(this._props.rootQuery, this._block);
    }
}

export default class Router {
    private static __instance: Router | null = null;
    routes: Route[] = [];
    history;
    _currentRoute: null | Route = null;
    _rootQuery: string = '';

    constructor(rootQuery?: string) {

        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery ? rootQuery : '.app';

        Router.__instance = this;
    }

    use(pathname: string, block: typeof IBlock) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const currentTarget = event.currentTarget as EventTarget & { location: Record<string, string> };
            this._onRoute(currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }
    end() {
        Router.__instance = null;
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        
        if (!route) {
            route = this.getRoute('/404');
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route ? route : null;
        
        route ? route.render() : undefined;
    }

    go(pathname: string) {
        this.history ? this.history.pushState({}, '', pathname) : undefined;
        this._onRoute(pathname);
    }

    back() {
        console.log('back');
        this.history ? this.history.back() : undefined;
    }

    forward() {
        console.log('forward');
        this.history ? this.history.forward() : undefined;
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
