# AppConfig Template

Este projeto é um exemplo de como criar um AppConfig na AWS utilizando o Cloud Development Kit (CDK)

### Cria os arquivos para deploy (gera o javascript)
```
npm run build
```

### Altera os arquivos automaticamente (atualiza o javascript)
```
npm run watch
```

### Executa os testes
```
npm run test
```

### Atualiza o snapshot para execução dos testes
```
npm run test -- --update-snapshot
```

### Deploy na AWS
```
cdk deploy
```
