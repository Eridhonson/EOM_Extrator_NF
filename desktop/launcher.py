import threading
import webview

from werkzeug.serving import make_server

from backend.app import app
from desktop.window import criar_janela

from config.settings import HOST, PORT


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

    janela = criar_janela(url)

    try:

        webview.start()

    finally:

        servidor.shutdown()
        servidor.server_close()

def encerrar_aplicacao(self):
    if self.janela is not None:
        self.janela.destroy()

    return {"status": "encerramento solicitado"}