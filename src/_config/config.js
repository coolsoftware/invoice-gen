export const Config = {

    get: function () {
        return {
            apiUrl: (process.env.REACT_APP_API_URL || 'http://localhost:4000'),
        }
    }

}