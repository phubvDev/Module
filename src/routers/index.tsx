import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Loading from "../components/loading";

const Layout = React.lazy(() => import('../layout'))
const Home = React.lazy(() => import('../pages/home'));
const BoardPage = React.lazy(() => import('../pages/board'));
const LoginPage = React.lazy(() => import('../pages/login'));
const AddorEditBoardPage = React.lazy(() => import('../pages/add_edit_Board'));

const router = createBrowserRouter([
    {
        path:'/module/login',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <LoginPage/>
            </React.Suspense>
        )
    },
    {
        path:'/module',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <Layout>
                    <Home/>
                </Layout>
            </React.Suspense>
        )
    },
    {
        path:'/module/boards',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <Layout>
                    <BoardPage/>
                </Layout>
            </React.Suspense>
        )
    },
    {
        path:'/module/boards/addboard',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <Layout>
                    <AddorEditBoardPage/>
                </Layout>
            </React.Suspense>
        )
    }
]);

export default router;