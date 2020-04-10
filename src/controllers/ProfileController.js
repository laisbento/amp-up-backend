const connection = require('../database/connection');

module.exports = {
    async list(request, response){
        const user_id = request.headers.authorization;

        const ads = await connection('ads')
        .where('user_id', user_id)
        .select('*');

        return response.json(ads);
    }
}