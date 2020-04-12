![](https://img.shields.io/github/last-commit/Leonardocpn/provi-teste.svg?color=red)
![](https://img.shields.io/github/languages/top/Leonardocpn/provi-teste.svg?color=yellow)
![](https://img.shields.io/github/languages/count/Leonardocpn/provi-teste.svg?color=lightgrey)
![](https://img.shields.io/github/languages/code-size/Leonardocpn/provi-teste.svg)
![](https://img.shields.io/github/repo-size/Leonardocpn/provi-teste?color=blueviolet)
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

# Teste para admissão na Provi

- Foi utilizado o Node.js com a linguagem Typescript

  Acredito que uma linguagem tipada adicione garantias para a construção do backend

- Os endpoints foram criados com o uso do Express.js e hospedados com o Firebase Functions

  Pude treinar o deploy nos serviços da Google

- O banco de dados utilizado foi o MySQL hospedado em uma EC2 da AWS

  Pude treinar a manipulação dos serviços da AWS
  
- Foi utilizado o npm para gerenciamento de pacotes

- Os testes foram realizados com o Jest e supertest. O ambiente de testes foi separado do
  ambiente de produção com o uso do knex, com ele é possivel criar as tabelas de testes com
  as migrations e fornecer dados para elas com as seeds. As migrations são muito interessantes
  para verificar a forma de como o banco de dados foi evoluindo com o tempo

Obs: É necessário criar um banco de dados com o mysql na sua máquina local para que os testes de
integração funcionem. Os dados do banco são:

    host: "127.0.0.1",
    user: "teste",
    password: "teste",
    database: "provitestedb"

## Cobertura dos testes

![Coverage](functions/src/tests/assets/test_coverage.png?raw=true)

## Documentação para os endpoints no Postman

Esta é a documentação dos endpoints com exemplos para as requisições e as respostas

https://documenter.getpostman.com/view/9133514/SzS1SoGD

## Script para criação do banco de dados

https://firebasestorage.googleapis.com/v0/b/provi-teste.appspot.com/o/BancoDeDadosProviTeste.sql?alt=media&token=948cfea7-0225-40f8-ba3f-b96c52464726

Obs: As tabelas também estão documentadas nos arquivos da
pasta migrations

## Bibliotecas utilizadas

- jsonwebtoken
- mysql
- supertest
- uuid
- bcrypt
- cors
- express
- knex
- moment
- jest
- axios
- celebrate
- cpf-check
- cross-env
- ts-node
- uuid
