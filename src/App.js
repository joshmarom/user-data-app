import React from 'react'
import { BaseProvider, LightTheme, DarkTheme } from 'baseui'
import { Client as Styletron } from 'styletron-engine-atomic'
import { useOvermind } from './overmind';
import { Provider as StyletronProvider } from 'styletron-react'
import MainRouter from './components/main-router';

const engine = new Styletron();

export default function App() {
    const { state } = useOvermind()
    const theme = 'dark' === state.theme ? DarkTheme : LightTheme
    const Wrapper = props =>
        <div style={{backgroundColor: theme.colors.backgroundPrimary}}
        children={props.children}
        ref={props.forwardedRef}/>

    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
                <Wrapper>
                    <MainRouter theme={theme}/>
                </Wrapper>
            </BaseProvider>
        </StyletronProvider>
    );
}