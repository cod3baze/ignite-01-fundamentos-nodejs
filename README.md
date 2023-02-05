# Fundamentals

## Streams

Conseguir ler/obter pequenas partes dos dados, e a partir desses pedaços já conseguir trabalhar/manipular antes de ler o arquivo completo.

- ex: importação de clientes via CSV (Excel)

- trabalhando com as streams, os dados devem estar em formato de **Buffer**

| `func`              | `desc`                                          |
| ------------------- | ----------------------------------------------- |
| `Stream.pipe(args)` | encaminha tudo que está recebendo para **args** |
| `Request`           | ReadableStream                                  |
| `Response`          | WritableStream                                  |
|                     |                                                 |
