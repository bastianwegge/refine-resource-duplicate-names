import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";
import { DefaultPostList } from './pages/default-post-list';
import { TypicodePostList } from './pages/typicode-post-list';

const API_URL = "https://api.fake-rest.refine.dev";
const CATEGORIES_API_URL = "https://api.fake-rest.refine.dev";
const TYPICODE_API_URL = "https://jsonplaceholder.typicode.com";

const App = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={{
                        default: dataProvider(API_URL),
                        categories: dataProvider(CATEGORIES_API_URL),
                        typicode: dataProvider(TYPICODE_API_URL),
                    }}
                    resources={[
                        {
                            name: "posts",
                            identifier: "default-posts",
                            list: "/default/posts",
                            meta: {
                                parent: "default",
                                dataProviderName: "default",
                            },
                        },
                        {
                            name: "categories",
                            meta: {
                                dataProviderName: "categories",
                            },
                        },
                        {
                            name: "posts",
                            identifier: "typicode-posts",
                            list: "/typicode/posts",
                            meta: {
                                parent: "typicode",
                                dataProviderName: "typicode",
                            },
                        },
                    ]}
                    notificationProvider={notificationProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />
                            <Route path="/default/posts" element={<DefaultPostList />} />
                            <Route path="/typicode/posts" element={<TypicodePostList />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
