import CheckUserLoggedRequest from "../classes/CheckUserLoggedRequest";

export default function checkUserLogged() {
    const userRequest = new CheckUserLoggedRequest();
    return userRequest.request();
}
