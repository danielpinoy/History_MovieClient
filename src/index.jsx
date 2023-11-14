import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import "./index.scss";

const App = () => {
    return (
        <Provider store={store}>
            <Container className="mt-2">
                <MainView />
            </Container>
        </Provider>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element

root.render(<App />);
