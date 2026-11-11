
from flask import Flask, render_template, request, jsonify
from backend.processador import processar_texto

from werkzeug.serving import make_server
from threading import Timer
import threading
import webbrowser


app = Flask(
    __name__,
    template_folder="frontend/templates",
    static_folder="frontend/static"
)

servidor = None


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/api/processar", methods=["POST"])
def processar():

    dados = request.get_json(silent=True) or {}
    texto = dados.get("texto", "")

    if not isinstance(texto, str):
        return jsonify({
            "erro": "O conteúdo enviado é inválido."
        }), 400

    resultado = processar_texto(texto)

    return jsonify(resultado)


@app.route("/api/encerrar", methods=["POST"])
def encerrar():

    # Agenda o encerramento após a resposta HTTP.
    Timer(
        0.5,
        servidor.shutdown
    ).start()

    return jsonify({
        "mensagem": "Aplicação encerrada."
    })


if __name__ == "__main__":

    servidor = make_server(
        "127.0.0.1",
        5000,
        app
    )

    Timer(
        1.5,
        lambda: webbrowser.open(
            "http://127.0.0.1:5000"
        )
    ).start()

    print("EOM - Extrator de Chaves NF iniciado.")

    try:
        servidor.serve_forever()

    finally:
        servidor.server_close()
        print("Aplicação encerrada.")
