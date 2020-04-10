const connection = require('../database/connection');

module.exports = {
    async get(request, response) {
        const { id } = request.body;

        const result = await connection('users')
            .select('name')
            .where('id', id)
            .first();

        if (!result) {
            return response.status(400).json({
                error: 'User not found'
            });
        }

        return response.json(result);
    }
}