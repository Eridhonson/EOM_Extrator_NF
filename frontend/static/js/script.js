
const entrada = document.getElementById("entrada");
const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");

const btnProcessar = document.getElementById("btnProcessar");
const btnCopiar = document.getElementById("btnCopiar");
const btnLimpar = document.getElementById("btnLimpar");
const btnFechar = document.getElementById("btnFechar");


// Colar e extrair números
btnProcessar.addEventListener("click", async () => {

    try {

        // Lê a área de transferência
        const texto = await navigator.clipboard.readText();

        if (!texto.trim()) {
            alert("A área de transferência está vazia.");
            return;
        }

        // Substitui o texto anterior
        entrada.value = texto;

        // Envia para processamento
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
            throw new Error(dados.erro || "Erro no processamento.");
        }

        // Exibe o resultado
        resultado.value = dados.resultado;

        contador.textContent =
            dados.quantidade + " números";

    } catch (erro) {

        alert(
            "Não foi possível colar e processar o texto. " +
            "Verifique a permissão da área de transferência."
        );

    }

});


// Copiar resultado
btnCopiar.addEventListener("click", async () => {

    if (!resultado.value) {
        alert("Não existe resultado para copiar.");
        return;
    }

    try {

        await navigator.clipboard.writeText(resultado.value);

        btnCopiar.textContent = "Copiado!";

        setTimeout(() => {
            btnCopiar.textContent = "Copiar resultado";
        }, 1500);

    } catch (erro) {

        alert("Não foi possível copiar o resultado.");

    }

});


// Limpar campos
btnLimpar.addEventListener("click", () => {

    entrada.value = "";
    resultado.value = "";

    contador.textContent = "0 números";

    entrada.focus();

});


// Encerrar aplicação
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

        const resposta = await fetch("/api/encerrar", {
            method: "POST"
        });

        if (!resposta.ok) {
            throw new Error("Falha ao encerrar.");
        }

        document.body.innerHTML = `
            <main style="
                text-align: center;
                padding: 80px 20px;
                font-family: Arial, sans-serif;
            ">
                <h2>Programa encerrado!</h2>
                <p>Você pode fechar esta aba do navegador.</p>
                <p>EOM - Extrator de Chaves NF</p>
            </main>
        `;

    } catch (erro) {

        alert("Não foi possível encerrar o programa.");

        btnFechar.disabled = false;
        btnFechar.textContent = "Encerrar programa";

    }

});
