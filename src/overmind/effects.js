import axios from "axios";

export const api = {
    async getUsers(id) {
        let res = await axios.get("https://test-api-server.herokuapp.com/users")
        let users = res.data.map(r => ({id: r.id, data: r}))
        let userData = id && undefined !== users[id] ? users[id].data : null

        return userData || users
    },
    async getUserWithDetails(id) {
        return this.getUsers(id)
    }
};

export const authenticateLogin = async () => {
    let res = await axios.get("https://test-api-server.herokuapp.com/login")

    return 200 === res.status
}
