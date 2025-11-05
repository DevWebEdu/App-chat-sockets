import { createBrowserRouter, Navigate } from 'react-router'
import { ChatView } from '../chat/Views/ChatView'
import { AuthLayout } from '../auth/layout/AuthLayout'
import { LoginView } from '../auth/views/LoginView'
import { RegisterView } from '../auth/views/RegisterView'
import { ChatLayout } from '../chat/layouts/ChatLayout'
import { ChatProove } from '../chat/Views/ChatProove'

export const router = createBrowserRouter([
    {
        path : 'chat-prooves',
        Component : ChatProove
    },
    {
        path: 'chat',
        Component: ChatLayout ,
        children: [
            { 
                index : true , 
                Component : ChatView
            }
        ]
    },
    {
        path: '',
        element: <Navigate to='chat' replace />
    },
    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            {
                path: 'authenticate',
                Component: LoginView
            },
            {
                path: 'create-account',
                Component: RegisterView
            },
            {
                index: true , 
                element: <Navigate to='authenticate' replace />
            },
            {
                path:'*',
                element: <Navigate to='authenticate' replace />
            }
        ]
    }
])