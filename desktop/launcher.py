
import threading
import webview

from werkzeug.serving import make_server

from backend.app import app
from desktop.window import criar_janela

from config.settings import HOST, PORT


class AplicacaoAPI:

    def __init__(self):
        self.janela = None

    def definir_janela(self, janela):
        self.janela = janela

    def encerrar_aplicacao(self):

        if self.janela is not None:
            self.janela.destroy()

        return {
            "status": "encerramento solicitado"
        }

    # ========================================
    # ÁREA DE TRANSFERÊNCIA
    # ========================================

    def obter_texto_area_transferencia(self):

        import pyperclip

        try:
            return pyperclip.paste()

        except Exception as erro:
            raise RuntimeError(
                f"Falha ao ler a área de transferência: {erro}"
            )


    def copiar_texto(self, texto):

        import pyperclip

        try:
            pyperclip.copy(texto)

            return {
                "status": "texto copiado"
            }

        except Exception as erro:
            raise RuntimeError(
                f"Falha ao copiar o texto: {erro}"
            )



def iniciar_aplicacao():

    servidor = make_server(
        HOST,
        PORT,
        app
    )

    thread = threading.Thread(
        target=servidor.serve_forever,
        daemon=True
    )

    thread.start()

    url = f"http://{HOST}:{PORT}"

    # Cria a API Python
    api = AplicacaoAPI()

    # Cria a janela com acesso à API
    janela = criar_janela(
        url,
        js_api=api
    )

    api.definir_janela(janela)

    try:

        webview.start()

    finally:

        servidor.shutdown()
        servidor.server_close()

        thread.join(timeout=2)


if __name__ == "__main__":
    iniciar_aplicacao()
