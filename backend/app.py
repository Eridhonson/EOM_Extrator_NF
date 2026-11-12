
# ========================================
# EOM - EXTRATOR DE CHAVES NF
# Versão: 1.1.2
# Alteração:
# - Implementação da rota POST /api/processar.
# - Integração com o módulo processador.
# - Retorno padronizado em JSON.
# ========================================

from pathlib import Path

from flask import Flask, render_template, request, jsonify

from backend.processador import processar_texto


BASE_DIR = Path(__file__).resolve().parent.parent

app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "frontend" / "templates"),
    static_folder=str(BASE_DIR / "frontend" / "static"),
    static_url_path="/static"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/processar", methods=["POST"])
def api_processar():

    try:
        dados = request.get_json(silent=True)

        if not isinstance(dados, dict):
            return jsonify({
                "erro": "Dados inválidos ou ausentes."
            }), 400

        texto = dados.get("texto")

        if not isinstance(texto, str):
            return jsonify({
                "erro": "O texto enviado é inválido."
            }), 400

        resultado = processar_texto(texto)

        return jsonify(resultado), 200

    except Exception as erro:

        app.logger.exception("Erro ao processar texto.")

        return jsonify({
            "erro": "Falha interna ao processar o texto."
        }), 500
