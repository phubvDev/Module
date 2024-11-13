import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Loading from "../components/loading";
import ForgotPassword from "../pages/forgotpassword";
import Find_id from "../pages/find_id";

const Layout = React.lazy(() => import('../layout'));
const Home = React.lazy(() => import('../pages/home'));
const BoardPage = React.lazy(() => import('../pages/board'));
const LoginPage = React.lazy(() => import('../pages/login'));
const RegisterPage = React.lazy(() => import('../pages/register'));
const AddorEditBoardPage = React.lazy(() => import('../pages/add_edit_Board'));
const PostPage = React.lazy(() => import('../pages/post'))
const AddOrEditPostPage = React.lazy(() => import('../pages/add_edit_Post'))

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
        path:'/module/forgotpassword',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <ForgotPassword/>
            </React.Suspense>
        )
    },
    {
        path:'/module/findid',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <Find_id/>
            </React.Suspense>
        )
    },
    {
        path:'/module/register',
        element: (
            <React.Suspense fallback={<Loading/>}>
                <RegisterPage/>
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
    },
    {
        path:'module/posts/',
        element: (
            <React.Suspense fallback={<Loading />}>
                <Layout>
                    <PostPage />
                </Layout>
            </React.Suspense>
        )
    },
    {
        path:'module/posts/create',
        element: (
            <React.Suspense fallback={<Loading />}>
                <Layout>
                    <AddOrEditPostPage />
                </Layout>
            </React.Suspense>
        )
    }
]);

export default router;
