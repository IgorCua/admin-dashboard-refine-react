import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import {
//   BlogPostCreate,
//   BlogPostEdit,
//   BlogPostList,
//   BlogPostShow,
// } from "./pages/blog-posts";
// import {
//   CategoryCreate,
//   CategoryEdit,
//   CategoryList,
//   CategoryShow,
// } from "./pages/categories";
// import { ForgotPassword } from "./pages/forgotPassword";
// import { Login } from "./pages/login";
// import { Register } from "./pages/register";

import {
  Home,
  ForgotPassword,
  Login,
  Register,
  Create,
  CompanyList,
  EditPage,
  List,
} from './pages';
import { Layout } from "./components/layout";
import { resources } from "./config/resources";
import { TasksCreatePage } from "./pages/tasks/create";
import { TasksEditPage } from "./pages/tasks/edit";

const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

// const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "oVWgxX-226DZO-Z9nYk0",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route path={'/register'} element={<Register />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/forgot-password'} element={<ForgotPassword />} />
                <Route
                  element={
                    <Authenticated
                      key={'authenticated-layout'}
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet/>
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home/>} />
                  <Route path="/companies">
                    <Route index element={<CompanyList/>}/>
                    <Route path="new" element={<Create/>}/>
                    <Route path="edit/:id" element={<EditPage/>}/>
                  </Route>
                  <Route path="/tasks" element={
                    <List>
                      <Outlet/>
                    </List>
                  }>
                    <Route path="new" element={<TasksCreatePage/>}/>
                    <Route path="edit/:id" element={<TasksEditPage/>}/>
                  </Route>
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
