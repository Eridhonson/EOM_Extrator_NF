
/*
========================================
EOM - EXTRATOR DE CHAVES NF
Versão: 1.1.2
Alteração:
- Leitura da área de transferência pelo Python.
- Cópia do resultado pelo Python.
- Tratamento de respostas inválidas da API.
- Preservação das funções de limpar e encerrar.
========================================
*/

const entrada = document.getElementById("entrada");
const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");

const btnProcessar = document.getElementById("btnProcessar");
const btnCopiar = document.getElementById("btnCopiar");
const btnLimpar = document.getElementById("btnLimpar");
const btnFechar = document.getElementById("btnFechar");


// ========================================
// AGUARDAR API DO PYWEBVIEW
// ========================================

function aguardarPywebview() {

    return new Promise((resolve, reject) => {

        if (window.pywebview && window.pywebview.api) {
            resolve(window.pywebview.api);
            return;
        }

        const timeout = setTimeout(() => {
            reject(
                new Error(
                    "A API do pywebview não foi disponibilizada."
                )
            );
        }, 5000);

        window.addEventListener(
            "pywebviewready",
            () => {

                clearTimeout(timeout);

                if (window.pywebview && window.pywebview.api) {
                    resolve(window.pywebview.api);
                } else {
                    reject(
                        new Error(
                            "Não foi possível acessar a API Python."
                        )
                    );
                }

            },
            { once: true }
        );

    });

}


// ========================================
// COLAR E EXTRAIR NÚMEROS
// ========================================

btnProcessar.addEventListener("click", async () => {

    btnProcessar.disabled = true;
    btnProcessar.textContent = "Processando...";

    try {

        // Obtém o texto pela API Python
        const api = await aguardarPywebview();

        const texto = await api.obter_texto_area_transferencia();

        if (typeof texto !== "string" || !texto.trim()) {
            alert("A área de transferência está vazia.");
            return;
        }

        entrada.value = texto;

        // Envia o texto para o Flask
        const resposta = await fetch("/api/processar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                texto: texto
            })
        });

        // Verifica se o servidor retornou JSON válido
        let dados;

        try {
            dados = await resposta.json();
        } catch {
            throw new Error(
                "O servidor retornou uma resposta inválida. Verifique a rota /api/processar."
            );
        }

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Erro no processamento."
            );
        }

        resultado.value = dados.resultado;
        contador.textContent = dados.quantidade + " números";

    } catch (erro) {

        console.error("Erro ao processar:", erro);

        alert(
            "Não foi possível colar e processar o texto.\n\n" +
            erro.message
        );

    } finally {

        btnProcessar.disabled = false;
        btnProcessar.textContent = "Colar e extrair";

    }

});


// ========================================
// COPIAR RESULTADO
// ========================================

btnCopiar.addEventListener("click", async () => {

    if (!resultado.value) {
        alert("Não existe resultado para copiar.");
        return;
    }

    btnCopiar.disabled = true;

    try {

        const api = await aguardarPywebview();

        await api.copiar_texto(resultado.value);

        btnCopiar.textContent = "Copiado!";

        setTimeout(() => {
            btnCopiar.textContent = "Copiar resultado";
        }, 1500);

    } catch (erro) {

        console.error("Erro ao copiar:", erro);

        alert(
            "Não foi possível copiar o resultado.\n\n" +
            erro.message
        );

    } finally {

        btnCopiar.disabled = false;

    }

});


// ========================================
// LIMPAR CAMPOS
// ========================================

btnLimpar.addEventListener("click", () => {

    entrada.value = "";
    resultado.value = "";

    contador.textContent = "0 números";

    entrada.focus();

});


// ========================================
// ENCERRAR APLICAÇÃO
// ========================================

btnFechar.addEventListener("click", async () => {

    const confirmar = confirm(
        "Deseja realmente encerrar o programa?"
    );

    if (!confirmar) {
        return;
    }

    btnFechar.disabled = true;
    btnFechar.textContent = "Encerrando...";

    try {

        const api = await aguardarPywebview();

        const resposta = await api.encerrar_aplicacao();

        if (
            !resposta ||
            resposta.status !== "encerramento solicitado"
        ) {
            throw new Error(
                "O Python não confirmou o encerramento."
            );
        }

    } catch (erro) {

        console.error("Erro ao encerrar:", erro);

        alert(
            "Não foi possível encerrar o programa.\n\n" +
            erro.message
        );

        btnFechar.disabled = false;
        btnFechar.textContent = "Encerrar programa";

    }

});
