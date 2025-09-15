import { createBrowserRouter } from "react-router-dom"
import { SignUp } from "./Pages/Sign-up"
import { AuthLayout } from "./Pages/AuthLayout"
import { SignIn } from "./Pages/Sign-in"
import { UserData } from "./Pages/UserDataList"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserData />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-up", element: <SignUp /> },
      { path: "/sign-in", element: <SignIn /> }
    ]
  }
])