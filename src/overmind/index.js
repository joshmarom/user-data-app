import { Overmind } from "overmind";
import { createHook } from "overmind-react";
import { state } from "./state";
import * as actions from "./actions";
import * as effects from "./effects";
import {
    createStateHook,
    createActionsHook,
    createEffectsHook,
    createReactionHook
} from 'overmind-react'

export const useState = createStateHook()
export const useActions = createActionsHook()
export const useEffects = createEffectsHook()
export const useReaction = createReactionHook()

const onInitialize = ({ actions, effects }) => {
    console.log("onInitialize passed actions:")
    console.dir(actions);
};

export const config = {
    onInitialize,
    state,
    actions,
    effects
};

const overmind = new Overmind(config);

export const useOvermind = createHook(overmind);
