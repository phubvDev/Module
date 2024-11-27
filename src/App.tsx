import { RouterProvider } from 'react-router-dom';
import router from './routers';
import { GetBoardsProvider } from './context/GlobalContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = 'your-client-id.apps.googleusercontent.com'; // Thay thế CLIENT_ID của bạn

function App() {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GetBoardsProvider>
                <RouterProvider
                    future={{
                        v7_startTransition: true,
                    }}
                    router={router}
                />
            </GetBoardsProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
