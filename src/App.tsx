import {RouterProvider} from 'react-router-dom'
import router from "./routers";
import {GetBoardsProvider} from "./context/GetBoardsContext.tsx";

function App() {
    return <GetBoardsProvider>
        <RouterProvider router={router}/>
    </GetBoardsProvider>;
}

export default App
