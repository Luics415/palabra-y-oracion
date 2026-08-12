import{r as e,t}from"./jsx-runtime-DGeXAQPT.js";
import{t as n}from"./react-BhjfaixL.js";
import{c as r}from"./index-DQtxIjf5.js";
import{t as i}from"./use-speech-T0l3YkUW.js";
import{n as a,t as o}from"./rosary-D74_GD2n.js";

var R=e(n()),J=t();
var padre=r("padre-nuestro").text;
var ave=r("ave-maria").text;
var credo=r("credo").text;
var gloria=r("gloria").text;
var salve=r("salve-regina").text;
var fatima="Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas y socorre especialmente a las más necesitadas de tu misericordia.";
var contricion="Señor mío Jesucristo, Dios y hombre verdadero, Creador, Padre y Redentor mío. Por ser Tú quien eres, Bondad infinita, y porque te amo sobre todas las cosas, me pesa de todo corazón haberte ofendido. Ayudado de tu divina gracia propongo firmemente nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén.";
var madreGracia="María, Madre de gracia, Madre de misericordia. Defiéndenos de nuestros enemigos y ampáranos ahora y en la hora de nuestra muerte. Amén.";

function crearPasos(conjunto){
  var pasos=[
    {label:"Señal de la Cruz",text:"Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor Dios nuestro. En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."},
    {label:"Acto de contrición",text:contricion},
    {label:"Invocación inicial",text:"Señor, ábreme los labios. Y mi boca proclamará tu alabanza. Dios mío, ven en mi auxilio. Señor, date prisa en socorrerme."},
    {label:"Credo de los Apóstoles",text:credo},
    {label:"Padre Nuestro",text:padre},
    {label:"Ave María por la fe",text:ave},
    {label:"Ave María por la esperanza",text:ave},
    {label:"Ave María por la caridad",text:ave},
    {label:"Gloria",text:gloria}
  ];
  conjunto.mysteries.forEach(function(misterio,indice){
    var decena=indice+1;
    pasos.push({label:decena+"º Misterio",text:misterio.title+". Fruto de este misterio: "+misterio.fruit+".",decade:decena,kind:"mystery"});
    pasos.push({label:"Padre Nuestro",text:padre,decade:decena});
    pasos.push({label:"10 Ave Marías",text:ave,decade:decena,repetitions:10});
    pasos.push({label:"Gloria",text:gloria,decade:decena});
    pasos.push({label:"María, Madre de gracia",text:madreGracia,decade:decena});
    pasos.push({label:"Jaculatoria de Fátima",text:fatima,decade:decena});
  });
  pasos.push({label:"Salve Regina",text:salve});
  pasos.push({label:"Oración final",text:"Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén. En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."});
  return pasos;
}

var storageKey="rosario-progreso-v2";

function RosarioCompleto(){
  var stateSet=(0,R.useState)(0),setIndex=stateSet[0],setSetIndex=stateSet[1];
  var stateStep=(0,R.useState)(0),current=stateStep[0],setCurrent=stateStep[1];
  var stateBead=(0,R.useState)(1),bead=stateBead[0],setBead=stateBead[1];
  var stateAuto=(0,R.useState)(false),automatic=stateAuto[0],setAutomatic=stateAuto[1];
  var stateReady=(0,R.useState)(false),ready=stateReady[0],setReady=stateReady[1];
  var speech=i(),speak=speech.speak,pause=speech.pause,resume=speech.resume,stop=speech.stop,speaking=speech.speaking,paused=speech.paused,supported=speech.supported;
  var conjunto=o[setIndex];
  var pasos=(0,R.useMemo)(function(){return crearPasos(conjunto)},[conjunto]);

  (0,R.useEffect)(function(){
    var suggested=o.findIndex(function(item){return item.name===a().name});
    var savedSet=suggested>=0?suggested:0,savedStep=0,savedBead=1;
    try{var saved=JSON.parse(localStorage.getItem(storageKey)||"null");if(saved){if(Number.isInteger(saved.setIndex))savedSet=saved.setIndex;if(Number.isInteger(saved.step))savedStep=saved.step;if(Number.isInteger(saved.bead))savedBead=saved.bead}}catch(error){}
    setSetIndex(Math.min(savedSet,o.length-1));setCurrent(savedStep);setBead(Math.max(1,Math.min(10,savedBead)));setReady(true);
  },[]);

  (0,R.useEffect)(function(){if(ready)localStorage.setItem(storageKey,JSON.stringify({setIndex:setIndex,step:current,bead:bead}))},[setIndex,current,bead,ready]);
  (0,R.useEffect)(function(){var node=document.getElementById("rosario-paso-"+current);if(node)node.scrollIntoView({behavior:"smooth",block:"center"})},[current]);
  (0,R.useEffect)(function(){
    if(!automatic||!ready)return;
    var paso=pasos[Math.min(current,pasos.length-1)];
    var prefix=paso.repetitions?"Ave María "+bead+" de "+paso.repetitions+". ":paso.label+". ";
    speak(prefix+paso.text,function(){
      if(paso.repetitions&&bead<paso.repetitions)setBead(function(value){return value+1});
      else if(current<pasos.length-1){setBead(1);setCurrent(function(value){return value+1})}else setAutomatic(false);
    });
    return function(){stop()};
  },[automatic,current,bead,setIndex,ready]);

  function seleccionarMisterios(index){stop();setAutomatic(false);setSetIndex(index);setCurrent(0);setBead(1)}
  function seleccionarPaso(index,nextBead){stop();setAutomatic(false);setCurrent(index);setBead(nextBead||1)}
  function iniciarAudio(){if(paused){resume();return}if(!speaking)setAutomatic(true)}
  function detenerAudio(){stop();setAutomatic(false)}
  var totalUnidades=pasos.reduce(function(total,paso){return total+(paso.repetitions||1)},0);
  var completadas=pasos.slice(0,current).reduce(function(total,paso){return total+(paso.repetitions||1)},0)+(pasos[current].repetitions?bead:1);
  var progreso=Math.round(completadas/totalUnidades*100);

  return(0,J.jsxs)("div",{className:"mx-auto max-w-4xl px-4 py-10",children:[
    (0,J.jsx)("h1",{className:"font-serif text-4xl font-bold text-primary",children:"Santo Rosario"}),
    (0,J.jsx)("p",{className:"mt-3 max-w-2xl text-muted-foreground",children:"Lee el Rosario completo, sigue la oración resaltada y acompaña la lectura con audio sin perder tu lugar."}),
    (0,J.jsx)("div",{className:"mt-5 flex flex-wrap gap-2",children:o.map(function(item,index){return(0,J.jsx)("button",{onClick:function(){seleccionarMisterios(index)},className:"rounded-full px-3.5 py-1.5 text-sm transition-colors "+(index===setIndex?"bg-primary text-primary-foreground":"border border-border bg-card hover:bg-accent/15"),children:item.name.replace("Misterios ","")},item.name)})}),
    (0,J.jsxs)("div",{className:"z-30 mt-6 rounded-xl border bg-card/95 p-4 shadow-sm backdrop-blur sm:sticky sm:top-16",children:[
      (0,J.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[
        supported&&(0,J.jsx)("button",{onClick:iniciarAudio,className:"rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",children:paused?"▶ Reanudar":speaking?"Leyendo…":"▶ Escuchar desde aquí"}),
        supported&&speaking&&!paused&&(0,J.jsx)("button",{onClick:pause,className:"rounded-md border px-4 py-2 text-sm",children:"⏸ Pausar"}),
        supported&&(0,J.jsx)("button",{onClick:detenerAudio,className:"rounded-md border px-4 py-2 text-sm",children:"■ Detener"}),
        (0,J.jsx)("button",{onClick:function(){detenerAudio();setCurrent(0);setBead(1)},className:"rounded-md border px-4 py-2 text-sm",children:"Reiniciar"}),
        (0,J.jsxs)("span",{className:"ml-auto text-sm text-muted-foreground",children:[progreso,"% completado"]})
      ]}),
      (0,J.jsx)("div",{className:"mt-3 h-1.5 overflow-hidden rounded-full bg-secondary",children:(0,J.jsx)("div",{className:"h-full bg-gold transition-all",style:{width:progreso+"%"}})})
    ]}),
    (0,J.jsx)("div",{className:"mt-8 space-y-4",children:pasos.map(function(paso,index){var active=index===current;return(0,J.jsxs)("article",{id:"rosario-paso-"+index,onClick:function(){seleccionarPaso(index)},"aria-current":active?"step":undefined,className:"cursor-pointer rounded-xl border p-5 transition-colors "+(active?"border-gold bg-accent/15 shadow-sm":"bg-card hover:bg-accent/10"),children:[
      paso.repetitions&&(0,J.jsx)("div",{className:"mb-4 flex items-center gap-1.5",role:"group","aria-label":"Cuentas del Ave María",children:Array.from({length:paso.repetitions},function(_,cuenta){var numero=cuenta+1,marcada=active&&numero<=bead;return(0,J.jsx)("button",{type:"button",onClick:function(event){event.stopPropagation();seleccionarPaso(index,numero)},"aria-label":"Ave María "+numero+" de "+paso.repetitions,className:"flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-all "+(marcada?"border-gold bg-gold text-primary shadow-sm":"border-accent/50 bg-background text-muted-foreground hover:border-gold"),children:numero},numero)})}),
      (0,J.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,J.jsx)("h2",{className:"font-serif text-xl font-semibold",children:paso.label}),paso.decade&&(0,J.jsxs)("span",{className:"rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground",children:["Decena ",paso.decade]}),active&&(0,J.jsx)("span",{className:"ml-auto text-xs font-medium uppercase tracking-wider text-accent-foreground",children:speaking?"Leyendo":"Tu lugar"})]}),
      paso.repetitions&&(0,J.jsxs)("p",{className:"mt-2 text-sm font-medium text-accent-foreground",children:["Cuenta ",active?bead:1," de ",paso.repetitions]}),
      (0,J.jsx)("p",{className:"mt-3 whitespace-pre-line text-scripture",children:paso.text})
    ]},index)})}),
    (0,J.jsx)("p",{className:"mt-8 text-center text-xs text-muted-foreground",children:"El audio utiliza la voz en español disponible en tu navegador. El progreso queda guardado en este dispositivo."})
  ]})
}

export{RosarioCompleto as component};
