import React from 'react';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import Login from './login';

const engine = new Styletron();

export default function App() {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Login />
            </BaseProvider>
        </StyletronProvider>
    );
}