async function apiPlugin(fastify, options) {
    console.log('Registering API routes');
    fastify.register(require('./v1/v1Routes'), {prefix: '/v1'});
}

module.exports = apiPlugin