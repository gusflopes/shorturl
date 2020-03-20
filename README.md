# Url Shortener and Redirect

Pequeno projeto destinado a encurtar URL, bem como redirecionar para as rotas originais.
Para utilização em produção recomenda-se algumas medidas adicionais de segurança como autenticação de usuário ou outras barreiras de segurança.

## Requisitos
- Este projecto precisa de um banco de dados MongoDB para funcionar

## Iniciando o projeto
### Etapas de Instalação
Para iniciar o projeto pela primeira vez será necessário instalar as dependências, bem como cria rum container Docker para rodar o MongoDB. Basta digitar os seguintes comandos:

```bash
cp .env.example .env

docker run --name mongodb -p 27017:27017 -d -t mongo

yarn install
```

### Iniciando o servidor
Após a instalação, basta iniciar o servidor com o seguinte comando:

```bash
yarn dev
```

Pronto! Seu servidor deve estar rodando na porta `5000`. Basta acessar: http://localhost:5000 se não houve alteração da porta configurada inicialmente.