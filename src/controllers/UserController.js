const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, city, bairro, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            bairro,
            uf,
        });

        return response.json({ id });
    },

    async list(request, response) {
        return response.json(await connection('users').select('*'));
    }
}