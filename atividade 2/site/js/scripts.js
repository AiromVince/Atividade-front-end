// ======= MÁSCARAS DE INPUT =======

// CPF
function aplicarMascaraCPF(campo) {
  const valorReal = campo.dataset.realValue || ""; // valor real armazenado
  const apenasNumeros = campo.value.replace(/\D/g, "");

  // Atualiza o valor real conforme digita
  const novoValorReal = (valorReal + apenasNumeros).slice(0, 11);
  campo.dataset.realValue = novoValorReal;

  // Monta o CPF formatado
  let formatado = novoValorReal
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  // Exibe o CPF mascarado com asteriscos (mostra só os 2 últimos dígitos)
  const partes = formatado.split("-");
  if (partes.length === 2) {
    const prefixoMascarado = partes[0].replace(/\d/g, "*");
    campo.value = prefixoMascarado + "-" + partes[1];
  } else {
    campo.value = formatado.replace(/\d/g, "*");
  }
}
// TELEFONE
function aplicarMascaraTelefone(campo) {
  campo.value = campo.value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}

// CEP
function aplicarMascaraCEP(campo) {
  campo.value = campo.value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2");
}

// E-MAIL
function aplicarMascaraEmail(campo) {
  campo.value = campo.value
    .trim()
    .toLowerCase()
    .replace(/\s/g, ""); // remove espaços
}

// NOME (remove números e caracteres especiais)
function aplicarMascaraNome(campo) {
  campo.value = campo.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
}

// ======= APLICA MÁSCARAS AUTOMATICAMENTE =======
document.addEventListener("input", (e) => {
  const campo = e.target;

  if (campo.id === "cpf") aplicarMascaraCPF(campo);
  if (campo.id === "telefone") aplicarMascaraTelefone(campo);
  if (campo.id === "cep") aplicarMascaraCEP(campo);
  if (campo.id === "email") aplicarMascaraEmail(campo);
  if (campo.id === "nome") aplicarMascaraNome(campo);
});

// ======= SALVAR E RESTAURAR FORMULÁRIO =======
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

// ======= EXIBE MENSAGEM TEMPORÁRIA =======
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

// ======= ANIMAÇÕES DE REVELAÇÃO =======
const revealElements = document.querySelectorAll('.reveal, .reveal-side');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 50;

  revealElements.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;

    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
