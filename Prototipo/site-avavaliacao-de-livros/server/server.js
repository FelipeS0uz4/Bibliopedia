const Fastify = require('fastify');
const fastify = Fastify({ logger: true });
const path = require('node:path');
const cors = require('@fastify/cors');
const fastifyStatic = require('@fastify/static');

// Registrar o plugin de CORS
fastify.register(cors, {
  origin: '*', 
});

// Registrar o plugin de arquivos estáticos
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../client/build'),
  prefix: '/', // URL prefix to access static files
});

// Rota para receber comentários
fastify.post('/api/comentarios', async (request, reply) => {
  const { LivroId, comentario } = request.body;
  console.log(`Recebido comentário para o livro ${LivroId}: ${comentario}`);
  return { status: 'success' };
});

// Rota catch-all para servir o arquivo HTML
fastify.get('/', async (request, reply) => {
  try {
    return reply.sendFile('index.html'); // Ajuste se necessário
  } catch (error) {
    console.error('Erro ao servir o arquivo index.html:', error);
    reply.code(500).send('Erro ao servir o arquivo index.html');
  }
});

// Inicia o servidor
fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
