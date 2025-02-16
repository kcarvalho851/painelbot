// Carregar relógios do localStorage
function carregarRelogios() {
  const listaRelogios = document.getElementById("listaRelogios");
  listaRelogios.innerHTML = ""; // Limpa a lista de relógios

  let relogios = JSON.parse(localStorage.getItem("relogios")) || [];

  // Exibe os relógios na tela
  relogios.forEach((relogio, index) => {
    const relogioDiv = document.createElement("div");
    relogioDiv.className = "relogio";
    relogioDiv.innerHTML = `
      <img src="${relogio.imagem}" width="100">
      <br><strong><button onclick="toggleDescricao(${index})">${relogio.nome}</button></strong>
      <br>${relogio.valor}
      <div class="descricao" style="display:none;" id="descricao-${index}">${relogio.descricao}</div>
      <span class="opcoes" onclick="toggleMenu(${index})">...</span>
      <div class="menu" id="menu-${index}">
        <button onclick="editarRelogio(${index})">Editar</button>
        <button onclick="removerRelogio(${index})">Apagar</button>
      </div>
    `;
    listaRelogios.appendChild(relogioDiv);
  });
}

// Toggle para mostrar ou esconder a descrição
function toggleDescricao(index) {
  const descricao = document.getElementById(`descricao-${index}`);
  descricao.style.display =
    descricao.style.display === "block" ? "none" : "block";
}

// Função para adicionar relógio
function adicionarRelogio() {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;
  const imagem = document.getElementById("imagem").files[0];

  if (!nome || !descricao || !imagem) {
    alert("Preencha todos os campos!");
    return;
  }

  valor = valor
    ? parseFloat(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "R$ 0,00";

  const reader = new FileReader();
  reader.onload = function (e) {
    const novoRelogio = {
      nome: nome,
      descricao: descricao,
      valor: valor,
      imagem: e.target.result,
    };

    let relogios = JSON.parse(localStorage.getItem("relogios")) || [];
    relogios.push(novoRelogio);
    localStorage.setItem("relogios", JSON.stringify(relogios));

    carregarRelogios(); // Atualiza a lista de relógios
  };
  reader.readAsDataURL(imagem);
}

// Função para editar um relógio
function editarRelogio(index) {
  let relogios = JSON.parse(localStorage.getItem("relogios"));
  let novoNome = prompt("Novo nome do relógio:", relogios[index].nome);
  let novaDescricao = prompt("Nova descrição:", relogios[index].descricao);
  let novoValor = prompt("Novo valor (R$):", relogios[index].valor);

  if (novoNome && novaDescricao && novoValor) {
    relogios[index].nome = novoNome;
    relogios[index].descricao = novaDescricao;
    relogios[index].valor = parseFloat(novoValor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    localStorage.setItem("relogios", JSON.stringify(relogios));
    carregarRelogios();
  }
}

// Função para remover um relógio
function removerRelogio(index) {
  let relogios = JSON.parse(localStorage.getItem("relogios"));
  relogios.splice(index, 1);
  localStorage.setItem("relogios", JSON.stringify(relogios));
  carregarRelogios();
}
// Função para fechar o formulário de adicionar relógio
function fecharAdicionarRelogio() {
  document.getElementById("addRelogio").classList.add("hidden");
}

// Função para alternar a visibilidade do menu (editar, excluir)
function toggleMenu(index) {
  const menu = document.getElementById(`menu-${index}`);
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Adicionar evento para o botão de adicionar relógio
document.getElementById("btnAdicionar").addEventListener("click", () => {
  document.getElementById("addRelogio").classList.toggle("hidden"); // Exibe ou esconde o formulário de adicionar relógio
});

// Carregar os relógios ao iniciar a página
carregarRelogios();
