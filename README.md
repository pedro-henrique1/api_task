<h1 align="center" style="font-weight: bold;">Todo List API</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Como Começar</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#contribute">Contribuindo</a>
</p>

<p align="center">
<b>Uma API RESTful simples para gerenciar uma lista de tarefas (To-Do List). O projeto fornece endpoints para criar, listar, atualizar e deletar tarefas.</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- Node
- Nestjs
- Docker
- Redis

<h2 id="started">🚀 Como Começar</h2>

Esta seção detalha os passos necessários para configurar e executar a API localmente. A forma mais recomendada de executar este projeto é utilizando Docker e Docker Compose.

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [Docker](https://docs.docker.com/get-started/get-docker/)
- Docker Compose: Geralmente já vem incluso na instalação do Docker Desktop
- [Git](https://git-scm.com/install/)

<h3>Clonagem</h3>

Como clonar o projeto

```bash
git clone https://github.com/pedro-henrique1/api_task.git
```

<h3>Configuração de Variáveis de Ambiente</h2>

Para que a API funcione corretamente e se conecte com o banco de dados e/ou serviços externos, você precisa criar um arquivo de configuração local.

<h3>Starting</h3>

How to start your project

```bash
cd todo_list
docker-compose up -d --build
```

<h2 id="routes">📍 API Endpoints</h2>

As pricipais rotas da Api
​
| Rota | Descrição | Método HTTP | Corpo Esperado |
|-------|------------|--------------|----------------|
| `/tasks` | Recupera todas as tarefas — busca uma lista de todas as tarefas do sistema | GET | — |
| `/tasks` | Cria uma nova tarefa — cria uma nova tarefa com os detalhes fornecidos | POST | `{ "title": "string", "description": "string", "completed": false }` |
| `/tasks/:id` | Exclui uma tarefa — exclui uma tarefa pelo seu ID | DELETE | — |
| `/tasks/:id` | Atualiza o status de conclusão — atualiza o status de conclusão de uma tarefa pelo seu ID | PATCH | `{ "completed": true }` |
| `/tasks/:id` | Atualiza uma tarefa — atualiza os dados de uma tarefa pelo seu ID | PUT | `{ "title": "string", "description": "string", "completed": false }` |

<h2 id="contribute">📫 Contribuindo</h2>

Aqui você pode explicar como outros desenvolvedores podem contribuir com o seu projeto.  
Por exemplo, descrevendo como criar suas próprias branches, quais padrões seguir e como abrir um Pull Request.

1. `git clone https://github.com/pedro-henrique1/api_task.git`
2. `git checkout -b feature/NOME-DA-FEATURE`
3. Siga os padrões de commits definidos
4. Abra um Pull Request explicando o problema resolvido ou a funcionalidade criada.  
   Se houver modificações visuais, adicione capturas de tela e aguarde a revisão!

<h3>Documentações que podem ajudar</h3>

[📝 Como criar um Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Padrão de Commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
