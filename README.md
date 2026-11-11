# CONTROLE DE VERSÕES
=====================
## FEITO
1.0.1 Adicionado o arquivo iniciar_oculto.vbs que inicia o programa sem abrir a tela do .bat (mais amigável para o usuário final)

CÓDIGO ADICIONADO - ARQUIVO iniciar_oculto.vbs:
Set shell = CreateObject("WScript.Shell")
scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
shell.Run """" & scriptDir & "\iniciar.bat" & """", 0, False

1.0.2 Removido a opção de pause do iniciar.bat

ALTERAÇÃO NO CÓDIGO:

REM pause

## PARA FAZER
1.0.3 Adicionar um botão de Fechar para encerrar o processo, agora que o iniciar.bat não fica mais aberto.