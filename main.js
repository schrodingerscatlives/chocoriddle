var current_level = 0;

const form = {
  pageTitle           : () => document.getElementById("page-title"          ),
  inputAnswer         : () => document.getElementById("input-answer"        ),
  buttonOk            : () => document.getElementById("button-ok"           ),
  labelTitle          : () => document.getElementById("label-title"         ),
  imgLevel            : () => document.getElementById("img-level"           ),
  labelTip            : () => document.getElementById("label-tip"           ),
  labelCharRemaining  : () => document.getElementById("label-char-remaining"),
  labelAnswFormat     : () => document.getElementById("label-answ-format"   ),
  hiddenComments      : () => document.getElementById("comments-container"  ),
  inputContainer      : () => document.getElementById("input-container"     )
}

const levelTitle     = 0;
const levelImg       = 1;
const levelTip       = 2;
const levelFormatAns = 3;
const levelAnswer    = 4;
const levelAlt       = 5;
const levelComments  = 6;

form.inputAnswer().addEventListener("keypress", function(event) {  
  if (event.key === "Enter") {    
    //event.preventDefault();    
    form.buttonOk().click();
  }
});

function onChangeAnsw() {       
  
  const answerValue  = form.inputAnswer().value;
  const answerMaxLen = form.inputAnswer().maxLength;
  
  if (!answerValue) {
      form.labelCharRemaining().innerHTML = 'Caracteres restantes: ' + answerMaxLen;
  } else {
      form.labelCharRemaining().innerHTML = 'Caracteres restantes: ' + (answerMaxLen - answerValue.length);
  }
  
}

function loadLevel(id) {
  if ((id >-1) && (id < level.length)) {
    form.pageTitle().innerHTML = 'Riddle - Nível '+id;
    form.labelTitle().innerHTML = 'Nível '+id+': '+d(level[id][levelTitle]);
    form.imgLevel().src = d(level[id][levelImg]);
    form.imgLevel().alt = d(level[id][levelAlt]);
    form.labelTip().innerHTML = d(level[id][levelTip]);
    form.inputAnswer().value ='';
    form.inputAnswer().maxLength = level[id][levelAnswer].length;
    form.labelCharRemaining().innerHTML = 'Caracteres restantes: ' + form.inputAnswer().maxLength;
    form.labelAnswFormat().innerHTML = 'Formato da resposta: '+d(level[id][levelFormatAns]);
    form.hiddenComments().innerHTML = '<!-- '+d(level[id][levelComments])+' -->';
    if (level[id][levelAnswer].length > 0) {
      form.inputContainer().style.display = 'block';
    } else {
      form.inputContainer().style.display = 'none';
    }
    if (d(level[id][levelComments]) == "h2.text-align:justify") {
      form.labelTitle().style.textAlign = 'justify';
    } else {
      form.labelTitle().style.textAlign = 'center';
    }
  } else {
    form.pageTitle().innerHTML = 'Riddle - Nível (-1)';
    form.labelTitle().innerHTML = 'Nível (-1): Oops! Deu ruim...';
    form.imgLevel().src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDllOWhpYXJsenpuZWVtMmR0OXRveHZ5bDdkc2prYXhvNGRxZzlhNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8EmeieJAGjvUI/giphy.webp';
    form.imgLevel().alt = 'deu ruim...';
    form.labelTip().innerHTML = 'Algo de errado não está certo... Nenhum enigma foi carregado';
    form.inputAnswer().value ='';
    form.inputAnswer().maxLength = 0;
    form.labelCharRemaining().innerHTML = 'Caracteres restantes: ?';
    form.labelAnswFormat().innerHTML = 'Formato da resposta: não há :(';
    form.hiddenComments().innerHTML = '';    
    form.inputContainer().style.display = 'none';
  }
}

function testAns() {
  const answerValue  = form.inputAnswer().value;  
  if (!answerValue) {
      alert("Resposta incorreta...  :'(");
  } else if (answerValue == d(level[current_level][levelAnswer])) {
      current_level++;
      loadLevel(current_level);
  } else {
      alert("Resposta incorreta...  :'(");
  }
}

function d(u) {
  let t = '';
  let s = u;  
  for (let i = 0; i < s.length; i++) {    
    const r = 'áéíóúàèìòùäëïöüâêîôûãõÕñÑçÇÃÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛ';
    if (r.includes(s.at(i))) {
      t = t + s.at(i);  
    } else {
      let o = s.charCodeAt(i) - 24;    
      if (o < 32) {
        o = (126 + 1) - (32-o);
      }
      t = t + String.fromCharCode(o);
    }
  }
  t = u; //ignora toda a função acima....
  return t;
}




/*
[ levelTitle, 
  levelImg, 
  levelTip, 
  levelFormatAns, 
  levelAnswer, 
  levelAlt, 
  levelComments],
*/

const welcome = 
"Viiiixe tava achando que o ovo da páscoa esse ano seria assim tão fácil? \
Apesar de ainda não ser oficial, esta é a nossa primeira páscoa juntinhos e eu não poderia deixar isso barato :3<br>\
cada enigma te guiará pelo caminho até a sua cestinha de páscoa que está escondida em algum lugar deste shopping. \
Só tem um graaaande problema... ele não tá assim tão bem escondido... então é muito importante que você seja rápida \
(pelo amor), antes que outra pessoa aleatória acabe encontrando a tua cestinha (e esse aviso é muito sério kkkkkk, \
afinal de contas estamos em um lugar público).<br>Desta vez serão apenas 6 enigmas para chegar ao final do arco-íris. \
A Doutora está pronta para a nossa aventura?";


const level = [

  
  
  // NIVEL 0
  [ "Opa, confirme a sua identidade...", 
    "imgs/capa.jpeg", 
	"Quem é você?", 
    "utilize apenas letras minúsculas.", 
    "mel", 
    "i'm waiting you ...", 
    ""],

  // NIVEL: SEJA BEM VINDA
  [ welcome, 
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmYyNW9pOXBuNzlqcnlxc2FwZ2hrZ2VvMGVmdTZxazc3ZDhka2s3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnJA6zyOeo6IA1F7f/giphy.gif", 
    "para comerçar nossa caça ao ovo digite: vamooo", 
    "apenas letras minúsculas.", 
    "vamooo", 
    "¡Felices Pascuas!", 
    "h2.text-align:justify"],

  
  [ "Ela também está pertinho da tua casa", 
    "imgs/sentido-turne.jpg", 
    "Encontre esta empresa (ou loja).<br>A resposta deste enigma é o nome da empresa prestadora de serviços amaralinha e azul que está ao lado direito.<br>(importante: todas as pistas estão neste piso)", 
    "Apenas letras minúsculas.", 
    "correios", 
    "Lavanderia", 
    "Não há nada aqui..."],    

  
  [ "Já fui sinônimo de salgadinhos e biscoitos, mas hoje faço festas", 
	"imgs/salgadinhos.png", 
	"Que grande gigante azul você consegue ver lá na frente?<br>A resposta deste enigma é o nome da instituição que está a frente desta loja amarela e vermelha que você acabou de chegar.", 
	"Escreva a primeira palavra, e utilize apenas letras minúsculas.", 
	"caixa", 
	"Uma instituição de valores", 
	"Não há nada aqui..."],      

  
  [ "Dica extraaa", 
    "imgs/filme.png", 
    "Para a nossa tristeza, ganhador do oscar 2025 de melhor atriz e melhor filme.", 
    "apenas letras minúsculas.", 
    "anora", 
    "Quase assistimos...", 
    "Não há nada aqui..."],   	
	
  
  [ "Cada vez mais perto!!!", 
    "imgs/poup.jpg", 
    "De frente a esta instuição azul, que loja você consegue ver? A dica é: cama, mesa e banho...", 
    "apenas letras minúsculas.", 
    "ga", 
    "aviacoes", 
    "Não há nada aqui..."],	

  
  [ "iupiiiii chegooouuuu", 
    "imgs/gpsico.png", 
    "Agora você só precisa procurar por este símbolo da imagem acima.<br>Dicas importantes:<br>\
		- Sua cesta está entre estes dois últimos estabelecimentos;<br>\
		- A informação crucial para finalizar esse riddle está no seu wpp<br>(entregue em 26/02 às 19h04, no dia em que quase assistimos um certo filme...)", 
    "", 
    "", 
    "gps", 
    "--h2.text-align:justify"]
  
   


]

