import { parallel, action } from "overmind";

export const switchTheme = ({ state }) => {
    state.theme = 'light' === state.theme ? 'dark' : 'light';
}

export const doLogout = action(
   async ({state, effects}) => {
       console.log(state)
    state.error = false
    state.currentUser = null
    state.isLoggedIn = false
       console.log(state)

    await effects.logout();
    return true;
})

export const doLogin = action(
   async ({state, effects}, credentials) => {
    try {
        state.error = null
        state.currentUser = null

        let { user } = await effects.login(credentials)

        state.isLoggedIn = true
        state.currentUser = credentials

        console.log('state in try of doLogin action:',state)
        return state.currentUser
    }
    catch (error) {
        state.currentUser = null
        state.error = error
        return error
    }
})

export const showUsersPage = action(
    async ({ value: params, state, effects }) => {
        if (!params.id) state.modalUser = null;
        if (state.users.length) return;

        state.currentPage = "users";
        state.isLoadingUsers = true;
        state.users = await effects.api.getUsers();
        state.isLoadingUsers = false;
    }
);

export const showUserModal = parallel(
    showUsersPage, // BUG this crashes when rendering User & UserModal components
    action(async ({ value: params, state, effects }) => {
        state.currentUserModalTabIndex = Number(params.tab);

        if (state.modalUser && state.modalUser.id === params.id) return;

        state.isLoadingUserDetails = true;
        state.modalUser = await effects.api.getUserWithDetails(params.id);
        state.isLoadingUserDetails = false;
    })
);
