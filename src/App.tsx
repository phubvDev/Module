import {RouterProvider} from 'react-router-dom'
import router from "./routers";
import {GetBoardsProvider} from "./context/GetBoardsContext.tsx";

function App() {
    return <GetBoardsProvider>
        <RouterProvider future={{
            v7_startTransition: true,
        }} router={router}/>
    </GetBoardsProvider>;
}

export default App
