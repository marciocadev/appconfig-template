# AppConfig Template

Este projeto é um exemplo de como criar um AppConfig na AWS utilizando o Cloud Development Kit (CDK)

## Ferramentas
* AWS-CLI
* AWS-CDK
  * npm i -g aws-cdk
* CFN-DIAGRAM
  * npm i -g @mhlabs/cfn-diagram

## Comandos úteis
* `npm run build` compila o typescript para javascript
* `npm run watch` compila ao se alterar algum arquivo
* `npm run test` executa os teste unitários
* `npm run test -- --update-snapshot` atualiza o snapshot e executa os testes unitários
* `cdk synth` sintetiza o Cloudformation a partir do código
* `cdk deploy` faz o deploy da stack na AWS
* `cdk diff` compara a stack local com a que foi feito o deploy
* `cfn-dia html --template-file cdk.out/AppconfigTemplateStack.template.json` gera um diagrama e exibe no browser
* `cfn-dia html --template-file cdk.out/AppconfigTemplateStack.template.json --output-path AppconfigTemplateStack-html` gera um diagrama e cria uma parta com o html
* `cfn-dia draw.io --template-file cdk.out/AppconfigTemplateStack.template.json --output-file AppconfigTemplateStack.drawio` gera um diagrama e cria um arquivo para o Draw.io

## Links úteis
* Cloudformation Designer
  * https://console.aws.amazon.com/cloudformation/designer/home?region=us-east-1
* AWS Policy Generator
  * https://awspolicygen.s3.amazonaws.com/policygen.html