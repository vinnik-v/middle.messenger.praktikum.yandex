import Block from "./Block";
import LoginPage from '../pages/login-page/index';
import RegisterPage from '../pages/register-page';
import MainPage from '../pages/main-page';
import ErrorPage from '../pages/error-page';
import NotFoundPage from '../pages/not-found-page';
import ProfilePage from '../pages/profile-page';
import checkUserLogged from "../functions/checkUserLogged";
import store, { StoreEvents } from "./Store";

type TBlock = typeof LoginPage | typeof RegisterPage | typeof MainPage | typeof ErrorPage | typeof NotFoundPage | typeof ProfilePage

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    (<HTMLElement>root).innerHTML = '';
    (<HTMLElement>root).appendChild(block.getContent());
    return root;
}

class Route {
    _pathname: string;
    _blockClass: TBlock;
    _block: null | Block;
    _props: Record<string, string>;

    constructor(pathname: string, view: TBlock, props: Record<string, string>) {
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

    use(pathname: string, block: TBlock) {
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

export async function routerInit() {
    const router = new Router(".app");
    
    let pathname = window.location.pathname;
    router
        .use("/", LoginPage)
        .use("/sign-up", RegisterPage)
        .use("/settings", ProfilePage)
        .use("/messenger", MainPage)
        .use("/404", NotFoundPage)
        .use("/error", ErrorPage)
        .start();
    
    try {
        
        const userResp = await checkUserLogged();
        
        try {
            const currentUser = JSON.parse(userResp.response);
            store.set('currentUser', currentUser, StoreEvents.UserLogged);
        } catch {}

        if (["/", "/sign-up"].includes(pathname)) {
            pathname = "/messenger";
        }
    } catch {
        pathname = "/";
    }
    
    router.go(pathname);
}
