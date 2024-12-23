import React from "react";
import {createBrowserRouter} from 'react-router-dom';
import Loading from "../components/loading";
import ForgotPassword from "../pages/forgotpassword";
import Find_id from "../pages/find_id";
import PrivateRoute from "./PrivateRoute.tsx";



const Layout = React.lazy(() => import('../layout'));
const Home = React.lazy(() => import('../pages/home'));
const BoardPage = React.lazy(() => import('../pages/board'));
const LoginPage = React.lazy(() => import('../pages/login'));
const RegisterPage = React.lazy(() => import('../pages/register'));
const AddorEditBoardPage = React.lazy(() => import('../pages/add_edit_Board'));
const PostPage = React.lazy(() => import('../pages/post'))
const AddOrEditPostPage = React.lazy(() => import('../pages/add_edit_Post'))
const PostDetailPage = React.lazy(() => import('../pages/postdetail'))
const User = React.lazy(() => import('../pages/users'))
const SMS = React.lazy(() => import('../pages/sms'))
const Email = React.lazy(() => import('../pages/email'))
const AccessHistory = React.lazy(() => import('../pages/access-history'))
const LevelChangeHistory = React.lazy(() => import('../pages/level-change-history'))
const Privacy = React.lazy(() => import('../pages/privacy'))
const Policy = React.lazy(() => import('../pages/policy'))
const SnsSetting = React.lazy(() => import('../pages/sns-setting'))
const Level = React.lazy(() => import('../pages/level'))
const MailSmsSetting = React.lazy(() => import('../pages/mail-sms-setting'))


const router = createBrowserRouter([
        {
            path: '/module/login',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <LoginPage/>
                </React.Suspense>
            )
        },
        {
            path: '/module/forgotpassword',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <ForgotPassword/>
                </React.Suspense>
            )
        },
        {
            path: '/module/users',
            element: (
                <React.Suspense fallback={<Loading/>}>
                 <User/>
                </React.Suspense>
            )
        },
        {
            path: '/module/sms',
            element: (
                <React.Suspense fallback={<Loading/>}>
                  <SMS/>
                </React.Suspense>
            )
        },
        {
            path: '/module/email',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <Email/>
                </React.Suspense>
            )
        },
        {
            path: '/module/access-history',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <AccessHistory/>
                </React.Suspense>
            )
        },
        {
            path: '/module/level-change-history',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <LevelChangeHistory/>
                </React.Suspense>
            )
        },
        {
            path: '/module/privacy',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <Privacy/>
                </React.Suspense>
            )
        },
        {
            path: '/module/policy',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <Policy/>
                </React.Suspense>
            )
        },
        {
            path: '/module/sns-setting',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <SnsSetting/>
                </React.Suspense>
            )
        },
        {
            path: '/module/level',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <Level/>
                </React.Suspense>
            )
        },
        {
            path: '/module/mail-sms-setting',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <MailSmsSetting/>
                </React.Suspense>
            )
        },
        {
            path: '/module/findid',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <Find_id/>
                </React.Suspense>
            )
        },
        {
            path: '/module/register',
            element: (
                <React.Suspense fallback={<Loading/>}>
                    <RegisterPage/>
                </React.Suspense>
            )
        },
        {
            path: '/module',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <Home/>
                    </Layout>
                </React.Suspense>}/>

            )
        },
        {
            path: '/module/boards',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <BoardPage/>
                    </Layout>
                </React.Suspense>}/>

            )
        },
        {
            path: '/module/boards/addboard',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <AddorEditBoardPage/>
                    </Layout>
                </React.Suspense>}/>
            )
        },
        {
            path: 'module/posts/',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <PostPage/>
                    </Layout>
                </React.Suspense>}/>
            )
        },
        {
            path: 'module/posts/create',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <AddOrEditPostPage/>
                    </Layout>
                </React.Suspense>}/>

            )
        },
        {
            path: 'module/posts/:id',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <PostDetailPage/>
                    </Layout>
                </React.Suspense>}/>

            )
        },
        {
            path: 'module/posts/edit',
            element: (
                <PrivateRoute element={<React.Suspense fallback={<Loading/>}>
                    <Layout>
                        <AddOrEditPostPage/>
                    </Layout>
                </React.Suspense>}/>

            )
        },
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

export default router;