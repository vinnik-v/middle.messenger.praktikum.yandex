import { expect } from 'chai';
import 'mocha';
import jsDomGlobal from 'jsdom-global';
import Router from '../Router.ts';
import Block from '../Block.ts';

const initHooks = () => {
    beforeEach(() => {
        jsDomGlobal('',{
            url: "http://app.com",
        });
    });
    
    afterEach(() => {
        jsDomGlobal()();
    });
} 

class Page extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super('', props);
    }
}

const init = () => {
    const root = document.createElement('div');
    root.id = 'app';
    root.className = 'app';
    document.body.appendChild(root);

    const router = new Router(".app");
    router
        .use("/", Page)
        .use("/sign-up", Page)
        .use("/settings", Page)
        .use("/messenger", Page)
        .use("/404", Page)
        .use("/error", Page)
        .start();
    return router;
}

describe('Check router init', () => {
    initHooks();
    const getRouteNames = (router: Router) => router.routes.map(item => item._pathname);
    it('Router.routes must contain "/"', () => {
        const router = init();
        const routeNames = getRouteNames(router)
        expect(routeNames.includes('/')).to.equal(true);
        router.end();
    });
    it('Router.routes must contain "/sign-up"', () => {
        const router = init();
        const routeNames = getRouteNames(router)
        expect(routeNames.includes('/sign-up')).to.equal(true);
        router.end();
    });
    it('Router.routes must contain "/settings"', () => {
        const router = init();
        const routeNames = getRouteNames(router)
        expect(routeNames.includes('/settings')).to.equal(true);
        router.end();
    });
    it('Router.routes must contain "/messenger"', () => {
        const router = init();
        const routeNames = getRouteNames(router)
        expect(routeNames.includes('/messenger')).to.equal(true);
        router.end();
    });
    it('Router.routes must contain "/404"', () => {
        const router = init();
        const routeNames = getRouteNames(router)
        expect(routeNames.includes('/404')).to.equal(true);
        router.end();
    });
    it('Router.routes must contain "/error"', () => {
        const router = init();
        const routeNames = getRouteNames(router)
        expect(routeNames.includes('/error')).to.equal(true);
        router.end();
    });
});

describe('Check router navigation', () => {
    initHooks();
    it('Current route must be "/"', () => {
        const router = init();
        router.go('/');
        expect(router._currentRoute?._pathname === '/').to.equal(true);
        router.end();
    });
    it('Current route must be "/sign-up"', () => {
        const router = init();
        router.go('/sign-up');
        expect(router._currentRoute?._pathname === '/sign-up').to.equal(true);
        router.end();
    });
    it('Current route must be "/settings"', () => {
        const router = init();
        router.go('/settings');
        expect(router._currentRoute?._pathname === '/settings').to.equal(true);
        router.end();
    });
    it('Current route must be "/messenger"', () => {
        const router = init();
        router.go('/messenger');
        expect(router._currentRoute?._pathname === '/messenger').to.equal(true);
        router.end();
    });
    it('Current route must be "/404"', () => {
        const router = init();
        router.go('/404');
        expect(router._currentRoute?._pathname === '/404').to.equal(true);
        router.end();
    });
    it('Current route must be "/error"', () => {
        const router = init();
        router.go('/error');
        expect(router._currentRoute?._pathname === '/error').to.equal(true);
        router.end();
    });
    it('Window history length must be 7', () => {
        const router = init();
        router.go('/');
        router.go('/sign-up');
        router.go('/settings');
        router.go('/messenger');
        router.go('/404');
        router.go('/error');
        expect(window.history.length).to.equal(7);
        router.end();
    });
});




