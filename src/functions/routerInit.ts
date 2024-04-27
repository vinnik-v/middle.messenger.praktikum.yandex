import LoginPage from '../pages/login-page/index.ts';
import RegisterPage from '../pages/register-page/index.ts';
import MainPage from '../pages/main-page/index.ts';
import ErrorPage from '../pages/error-page/index.ts';
import NotFoundPage from '../pages/not-found-page/index.ts';
import ProfilePage from '../pages/profile-page/index.ts';
import checkUserLogged from './checkUserLogged.ts';
import store, { StoreEvents } from '../classes/Store.ts';
import Router from '../classes/Router.ts';

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
        } catch {
            //
        }

        if (["/", "/sign-up"].includes(pathname)) {
            pathname = "/messenger";
        }
    } catch {
        pathname = pathname === "/sign-up"? pathname : "/";
    }
    router.go(pathname);
}

