# Extrator de Chaves NF

*Nome:* EOM – Extrator de Chaves NF

*Objetivo:* Desenvolver uma aplicação local para extrair automaticamente os números de textos de notas fiscais, facilitando a identificação, cópia e utilização das chaves de acesso, eliminando letras, espaços e caracteres especiais.

*Tecnologias necessárias:*
- *Back-end:* Python 3 + Flask.
- *Front-end:* HTML5, CSS3 e JavaScript.
- *Execução:* Servidor local (localhost).
- *Navegador:* Google Chrome ou Microsoft Edge.
- *Ambiente:* Windows, sem dependência de WAMP, XAMPP ou Docker.

*Funcionalidades principais:*
- Inserção de textos manualmente ou por colagem.
- Extração automática de números.
- Exibição do resultado em campo separado.
- Botões para copiar, colar e limpar.
- Contagem de números extraídos.

*Arquitetura:* Projeto modular, com front-end e back-end independentes, permitindo alterações visuais e expansão das funcionalidades sem comprometer a estrutura principal.

*Informações adicionais:*
- Execução local, sem necessidade de internet após a instalação das dependências.
- Não exige banco de dados na versão inicial.
- Preparado para futuras implementações, como validação de chaves NF-e (44 dígitos), processamento em lote, histórico e exportação de resultados.

*Status inicial:* Planejamento e desenvolvimento da versão 1.0.

# CONTROLE DE VERSÕES

1.0.1 — Inicialização oculta com iniciar_oculto.vbs.

1.0.2 — Remoção do pause do arquivo iniciar.bat.

1.0.3 — Botão de encerramento da aplicação.

- Encerramento controlado do servidor Python.

- Confirmação antes de sair.

- Mensagem de encerramento no navegador.

- Finalização do processo sem intervenção manual.