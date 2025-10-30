// ======= MASCARA DE INPUT =======
function aplicarMascaraCPF(campo) {
  campo.value = campo.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function aplicarMascaraTelefone(campo) {
  campo.value = campo.value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}

function aplicarMascaraCEP(campo) {
  campo.value = campo.value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2");
}

// ======= SALVAR E RESTAURA o FORMULÁRIO =======
function salvarFormulario(form) {
  const dados = {};
  const campos = form.querySelectorAll("input, select, textarea");
  campos.forEach(campo => {
    dados[campo.name] = campo.value;
  });
  localStorage.setItem("formCadastro", JSON.stringify(dados));
  mostrarMensagem("Cadastro salvo temporariamente!");
}

function restaurarFormulario(form) {
  const dadosSalvos = localStorage.getItem("formCadastro");
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    const campos = form.querySelectorAll("input, select, textarea");
    campos.forEach(campo => {
      if (dados[campo.name]) campo.value = dados[campo.name];
    });
    mostrarMensagem("Cadastro restaurado automaticamente!");
  }
}

// ======= EXIBE MENSAGEM =======
function mostrarMensagem(texto) {
  let aviso = document.getElementById("mensagemTemp");

  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "mensagemTemp";
    aviso.className = "mensagem-temp";
    document.body.appendChild(aviso);
  }

  aviso.textContent = texto;
  aviso.classList.add("ativo");

  setTimeout(() => aviso.classList.remove("ativo"), 3000);
}

// ======= VALIDAÇÃO =======
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    restaurarFormulario(form);
    form.addEventListener("input", () => salvarFormulario(form));

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const campos = form.querySelectorAll("input[required], textarea[required]");
      let valido = true;

      campos.forEach((campo) => {
        if (!campo.value.trim()) {
          campo.style.borderColor = "red";
          valido = false;
        } else {
          campo.style.borderColor = "#ccc";
        }
      });

      if (!valido) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
      }

      alert("Cadastro enviado!");
      form.reset();
      localStorage.removeItem("formCadastro");
      mostrarMensagem("Dados temporários apagados!");
    });
  }
});