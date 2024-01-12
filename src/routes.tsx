import Login from "./components/authentication/login";

const routes = [
    {
        path: "/",
        component: <Login />
    }, {
        path: "/login",
        component: <Login />
    }
];
export default routes;