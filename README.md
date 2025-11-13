# Quake-Log-Parser
Desafio de criar um parser de log

# Solução Proposta
A solução foi desenvolvida em NodeJs e Typescript com o framework Express para criar as rotas da API.

A resolução encontrada para concluir o teste foi utilizar hierarquia de classes, usando uma classe abstrata que seria utilizada como mãe e duas outras classes que solucionariam a Task 1 e a Task 2.

Classes criadas para resolver o teste:
- IGenerator: Classe abstrata que será a mãe das duas classes principais
- ParserGenerator: Classe responsável por gerar o parser do log (Task 1)
- GeradorRelatorio: Classe responsável por gerar o relatório de cada jogo (Task 2)

Por fim, uma função principal foi desenvolvida para iniciar o processo de criação de relatório ou gerar o relatório. A ideia desta função é que havia uma sequencia de instruções que se repetiam, então uma função central foi a melhor escolha para reduzir a repetição de código e facilitar a leitura do mesmo.

# Setup do projeto
Após ter o projeto baixado na sua máquina, rode o comando ``npm install`` isto irá instalar as dependencias (normais e as de desenvolvedor)

Para facilitar os testes de API, tenha o Postman instalado na máquina, o arquivo ``Quake_API.postman_collection.json`` é o export de uma collection com rotas de teste para facilitar

# Rotas criadas
Foram criadas algumas rotas, apesar do teste pedir apenas a rota GET do relatório, pensando em facilitar o teste e a visualização do resultado, foram criadas mais três rotas.  
**Obs:** No arquivo do Postman disponibilizado neste projeto, duas rotas foram criadas para testar caso um ID inexistente fosse requisitado (BuscarResumoInexistente, BuscarRelatorioInexistente)

### IDs de jogos disponíveis
O intuito desta rota é facilitar o teste das rotas que pedem um id de jogo como parâmetro.
```
  127.0.0.1:8000/game/ids
```
Ela retorna uma lista de IDs disponíveis de jogos
```
[
    "game_1",
    "game_2",
    "game_3",
    "game_4",
    "game_5",
    "game_6",
    "game_7",
    "game_8"
]
```

### Buscar todos os resumos (parser da Task 1)
O intuito desta rota é facilitar a visualização do resultado da Task 1
```
  127.0.0.1:8000/game/resumo
```
Ela retorna uma lista de todos os jogos disponíveis no log
```
  {
    "game_1": {
        "total_kills": 0,
        "players": [
            "Isgalamido"
        ],
        "kills": {
            "Isgalamido": 0
        }
    },
    "game_2": {
        "total_kills": 11,
        "players": [
            "Isgalamido",
            "Dono da Bola",
            "Mocinha"
        ],
        "kills": {
            "Isgalamido": -5,
            "Dono da Bola": 0,
            "Mocinha": 0
        }
    },
}
```

### Buscar os resumos (parser da Task 1) por ID de jogo
Ela faz basicamente o que a rota anterior faz, porém ela retorna apenas o resumo do jogo desejado
```
  127.0.0.1:8000/game/resumo/:id
```
Resultado:
```
{
    "total_kills": 11,
    "players": [
        "Isgalamido",
        "Dono da Bola",
        "Mocinha"
    ],
    "kills": {
        "Isgalamido": -5,
        "Dono da Bola": 0,
        "Mocinha": 0
    }
}
```

### Buscar os relatórios por ID de jogo (Task 2 e 3)
Esta rota é o resultado da Task 2, como solicitado na Task 3, uma rota de API foi criada para consultar os relatórios por jogo
```
  127.0.0.1:8000/game/relatorio/:id
```
Resultado:
```
{
    "kills_by_means": {
        "MOD_TRIGGER_HURT": 7,
        "MOD_ROCKET_SPLASH": 3,
        "MOD_FALLING": 1
    },
    "general_ranking": {
        "Isgalamido": -5,
        "Dono da Bola": 0,
        "Mocinha": 0
    },
    "killed_by_world": {
        "Isgalamido": 8,
        "Dono da Bola": 0,
        "Mocinha": 0
    }
}
```
