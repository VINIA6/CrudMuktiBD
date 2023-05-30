# Projeto da Construção de uma API com Bancos de Dados Diferentes

Este é um projeto que visa construir uma API utilizando dois tipos de banco de dados diferentes. Neste caso, utilizaremos o MongoDB, por meio do Mongoose, e o PostgreSQL, por meio do Sequelize.

## Tecnologias Utilizadas

* Node.js: Um ambiente de execução JavaScript assíncrono baseado no motor V8 do Chrome.
* Express: Um framework web rápido e minimalista para Node.js.
* JSON Web Token (JWT): Um padrão aberto para autenticação baseada em tokens.
* Mongoose: Uma biblioteca de modelagem de objetos MongoDB para Node.js, que fornece uma solução baseada em esquemas para modelar os dados da sua aplicação.
* Sequelize: Um ORM (Object-Relational Mapping) para Node.js que suporta vários bancos de dados relacionais, incluindo o PostgreSQL.
* Mocha: Uma estrutura de teste para Node.js que facilita a criação de testes unitários.
* Docker: Uma plataforma de código aberto para automatizar a implantação e o gerenciamento de aplicativos em contêineres.

## Principais Assuntos Abordados

### Callbacks

Callbacks são uma forma de gerenciar fluxo de controle em JavaScript. No contexto de uma API, eles são comumente usados para tratar operações assíncronas, como consultas a bancos de dados. Utilizaremos callbacks para garantir a execução correta das operações e lidar com erros.

### Promises e Async/Await

Além dos callbacks, também utilizaremos Promises e a sintaxe async/await, que são recursos poderosos do JavaScript para lidar com código assíncrono de forma mais elegante e legível. Promises permitem que tratemos operações assíncronas como objetos, enquanto o async/await torna a escrita do código assíncrono mais semelhante à forma síncrona, o que facilita a compreensão e manutenção do código.

### Testes Unitários com Mocha

Os testes unitários são uma parte fundamental do desenvolvimento de software, pois garantem que as diferentes partes do código estejam funcionando corretamente. Utilizaremos o Mocha para criar e executar testes unitários automatizados para verificar se a nossa API está se comportando como esperado.

### Criação de API com Methods HTTP

Neste projeto, vamos criar uma API RESTful utilizando o Node.js e o framework Express. Utilizaremos os métodos HTTP, como GET, POST, PUT e DELETE, para implementar as funcionalidades da API. Isso permitirá que os usuários possam realizar operações de leitura, criação, atualização e exclusão de recursos.

### Docker para Levantamento dos Bancos MongoDB e PostgreSQL

Para facilitar o processo de configuração e execução dos bancos de dados MongoDB e PostgreSQL, utilizaremos o Docker. O Docker é uma plataforma de código aberto que permite a criação e o gerenciamento de contêineres, que são ambientes isolados e auto-suficientes que contêm todas as dependências necessárias para executar uma aplicação.

Dessa forma, será possível levantar os bancos de dados MongoDB e PostgreSQL rapidamente, com suas configurações predefinidas, sem a necessidade de instalar e configurar manualmente os bancos de dados em sua máquina local.

## Instruções de Uso

Para executar o projeto, siga as etapas abaixo:

Certifique-se de ter o Node.js e o Docker instalados em seu sistema.
Clone este repositório em sua máquina local.
Execute o comando npm install para instalar as dependências do projeto.
Utilize o Docker para levantar os bancos de dados MongoDB e PostgreSQL com as seguintes configurações:
Para o MongoDB:
Execute o comando: docker run -d -p 27017:27017 --name mongodb mongo
Para o PostgreSQL:
Execute o comando: docker run -d -p 5432:5432 --name postgresql -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password postgres
Substitua "your_username" pelo nome de usuário desejado e "your_password" pela senha desejada.
Configure as informações de conexão com o MongoDB e o PostgreSQL no arquivo de configuração correspondente.
Execute o comando npm start para iniciar o servidor.
A API estará disponível em http://localhost:3000.

## Considerações Finais

Este projeto visa fornecer uma estrutura básica para a criação de uma API utilizando dois tipos de banco de dados diferentes. Utilizando o Docker para levantar os bancos de dados MongoDB e PostgreSQL, você poderá começar a desenvolver sua API rapidamente, com todas as dependências de banco de dados configuradas e prontas para uso. Sinta-se à vontade para adicionar suas próprias funcionalidades e personalizações ao projeto.    
    
    docker run --name postgres -e POSTGRES_USER=vinia6 -e POSTGRES_PASSWORD=senha -e POSTGRES_DB=heroes -p 5432:5432 -d postgres 

    docker ps 
    docker exec -it postgres /bin/bash

    docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

    docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senha -d mongo:4

    docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
  
    docker exec -it mongodb mongo --host localhost -u admin -p senha --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'vinia6', pwd: 'senha', roles: [{role: 'readWrite', db: 'herois'}]})"
