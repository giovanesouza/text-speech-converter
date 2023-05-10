let textearea = document.querySelector("#text");
let voices = document.querySelector("#voices");
let button = document.querySelector("#button");
let selectedVoice = 0; // Utilizada para guardar a voz selecionada pelo usuário

// Executado quando houver mudança na lista de vozes
window.speechSynthesis.addEventListener("voiceschanged", () => {
  let voicesList = window.speechSynthesis.getVoices(); // Pega as vozes disponíveis no sistema
  //console.log(voicesList);

  // Insere todas as vozes disponíveis como option
  for (let i in voicesList) {
    let optionEl = document.createElement("option"); // Cria o elemento option

    // Seta valores ao option criado acima
    optionEl.setAttribute("value", i);
    optionEl.innerText = voicesList[i].name; // Texto que vai aparecer no option (para o usuário) - nome da voz

    voices.appendChild(optionEl); // Adiciona todas as opções de vozes no select
  }
});

button.addEventListener("click", () => {
  let voicesList = window.speechSynthesis.getVoices(); // Pega as vozes disponíveis no sistema

  //    Verifica se o textarea tem algum texto
  if (textearea.value !== "") {
    let ut = new SpeechSynthesisUtterance(textearea.value); // Configuração para que o texto possa ser falado

    ut.voice = voicesList[selectedVoice]; // Pega a voz selecionada pelo usuário

    window.speechSynthesis.speak(ut); // Fala o texto
  }
});

// Quando houver mudança de voz...
voices.addEventListener("change", () => {
  selectedVoice = parseInt(voices.value); // Pega o valor referente a voz selecionada que vem em formato de string e converte para Inteiro
});


// Utilizada para desabilitar o botão e o select enquanto um texto estiver sendo falado
function updateStatus() {
    // Se o speechSynthesis estiver falando...
    if(window.speechSynthesis.speaking) {
        voices.setAttribute('disabled', 'disabled'); // Seta atributo
        button.setAttribute('disabled', 'disabled'); // Seta atributo
    } else {
        voices.removeAttribute('disabled'); // Remove atributo
        button.removeAttribute('disabled'); // Remove atributo
    }
}

// Executa a função acima de forma constante a fim de verificar se algum texto está sendo falado ou não
setInterval(updateStatus, 100);