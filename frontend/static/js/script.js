
const entrada = document.getElementById("entrada");
const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");

const btnProcessar = document.getElementById("btnProcessar");
const btnCopiar = document.getElementById("btnCopiar");
const btnLimpar = document.getElementById("btnLimpar");
const btnFechar = document.getElementById("btnFechar");


// ========================================
// COLAR E EXTRAIR NÚMEROS
// ========================================

btnProcessar.addEventListener("click", async () => {

    try {

        const texto = await navigator.clipboard.readText();

        if (!texto.trim()) {
            alert("A área de transferência está vazia.");
            return;
        }

        entrada.value = texto;

        const resposta = await fetch("/api/processar", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                texto: texto
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Erro no processamento."
            );
        }

        resultado.value = dados.resultado;

        contador.textContent =
            dados.quantidade + " números";

    } catch (erro) {

        console.error("Erro ao processar:", erro);

        alert(
            "Não foi possível colar e processar o texto.\n\n" +
            erro.message
        );

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

    try {

        await navigator.clipboard.writeText(
            resultado.value
        );

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

                if (
                    window.pywebview &&
                    window.pywebview.api
                ) {
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

        console.log("Solicitando encerramento...");

        const api = await aguardarPywebview();

        console.log("API Python encontrada:", api);

        const resposta = await api.encerrar_aplicacao();

        console.log("Resposta do Python:", resposta);

        if (
            !resposta ||
            resposta.status !== "encerramento solicitado"
        ) {
            throw new Error(
                "O Python não confirmou a solicitação de encerramento."
            );
        }

    } catch (erro) {

        console.error("Erro ao encerrar aplicação:", erro);

        alert(
            "Não foi possível encerrar o programa.\n\n" +
            erro.message
        );

        btnFechar.disabled = false;
        btnFechar.textContent = "Encerrar programa";

    }

});
