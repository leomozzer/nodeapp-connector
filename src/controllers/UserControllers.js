module.exports = {
    async CreateUser(req, res) {
        try {

        }
        catch (error) {

        }
    },
    async ListUsers(req, res) {
        try {
            return res.json({
                'response': [{ "name": "Leonardo", 'age': 25 }]
            })
        }
        catch (error) {

        }
    }
}