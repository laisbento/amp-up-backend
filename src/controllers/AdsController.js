const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('ads').insert({
            title,
            user_id,
            description,
            value
        });


        return response.json({ id });
    },

    async list(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('ads').count();

        const ads = await connection('ads')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'ads.*', 
            'users.name', 
            'users.email', 
            'users.whatsapp', 
            'users.city',
            'users.bairro', 
            'users.uf'])
        .join('users', 'users.id', '=', 'ads.user_id');

        response.header('X-Total-Count', count['count(*)'])

        return response.json(ads);
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const ad = await connection('ads')
            .where('id', id)
            .select('user_id')
            .first();

        if (ad.user_id !== user_id) {
            return response.status(401).json({
                error: 'Operation not permitted.'
            });
        }

        await connection('ads').where('id', id).delete();
        return response.status(204).send();
    }
}