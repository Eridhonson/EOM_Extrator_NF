import re


def extrair_numeros(texto):
    """
    Recebe um texto e retorna somente os números.
    Remove letras, espaços e caracteres especiais.
    """

    if not isinstance(texto, str):
        return ""

    resultado = re.sub(r"\D", "", texto)

    return resultado


def processar_texto(texto):
    """
    Função principal de processamento.
    Preparada para receber novas regras futuramente.
    """

    return {
        "original": texto,
        "resultado": extrair_numeros(texto),
        "quantidade": len(extrair_numeros(texto))
    }