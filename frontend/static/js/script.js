const entrada = document.getElementById("entrada");
const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");

const btnProcessar = document.getElementById("btnProcessar");
const btnCopiar = document.getElementById("btnCopiar");
const btnColar = document.getElementById("btnColar");
const btnLimpar = document.getElementById("btnLimpar");


// Processar texto
btnProcessar.addEventListener("click", async () => {

    const texto = entrada.value;

    if (!texto.trim()) {
        alert("Insira um texto primeiro.");
        return;
    }

    try {

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

        resultado.value = dados.resultado;

        contador.textContent =
            dados.quantidade + " números";

    } catch (erro) {

        alert("Não foi possível processar o texto: " + erro.message);

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

        alert("Não foi possível acessar a área de transferência.");

    }

});


// Colar texto substituindo o conteúdo anterior
btnColar.addEventListener("click", async () => {

    try {

        const texto = await navigator.clipboard.readText();

        entrada.value = texto;

        resultado.value = "";

        contador.textContent = "0 números";

        entrada.focus();

    } catch (erro) {

        alert("Não foi possível acessar a área de transferência. Verifique a permissão do navegador.");

    }

});


// Limpar campos
btnLimpar.addEventListener("click", () => {

    entrada.value = "";
    resultado.value = "";

    contador.textContent = "0 números";

    entrada.focus();

});


const btnFechar = document.getElementById("btnFechar");


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
