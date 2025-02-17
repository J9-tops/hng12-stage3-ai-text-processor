import { RouteObject } from "react-router-dom";
import ChatArea from "./components/ChatArea";
import RootLayout from "./components/RootLayout";
import ChatLayout from "./pages/ChatLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <ChatLayout />,
        children: [
          {
            index: true,
            element: <ChatArea />,
          },
        ],
      },
    ],
  },
];
