(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var WA='34652723373',fine=matchMedia('(hover:hover) and (pointer:fine)').matches,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var b=$('.burger'),m=$('.menu');b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var g={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()).forEach(function(p){g[p.type]=p.value});
var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[g.weekday],t=(+g.hour%24)*60+ +g.minute;
var open=(d>=1&&d<=5&&t>=390&&t<1320)||(d===6&&t>=540&&t<720);var lv=$('#live');
if(lv){lv.textContent=open?'Abierto ahora · Vitoria-Gasteiz':'Ahora cerrado · escríbele por WhatsApp';lv.style.setProperty('--c',open?'#7cff4f':'#ff6b4a')}
var li=$('#hours li[data-d="'+d+'"]');if(li)li.classList.add('today');
// palabra rotatoria
var ws=$$('.rot .w'),wi=0;if(ws.length&&!RM)setInterval(function(){var a=ws[wi];a.classList.remove('on');a.classList.add('out');setTimeout(function(){a.classList.remove('out')},500);wi=(wi+1)%ws.length;ws[wi].classList.add('on')},2400);
// magnéticos
if(fine&&!RM)$$('.mag').forEach(function(el){el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();el.style.transform='translate('+(e.clientX-r.left-r.width/2)*.22+'px,'+(e.clientY-r.top-r.height/2)*.35+'px)'});el.addEventListener('mouseleave',function(){el.style.transform=''})});
function count(el){var to=+el.dataset.count,dec=+(el.dataset.dec||0),s=null;function f(ts){if(!s)s=ts;var k=Math.min((ts-s)/1200,1),v=to*(1-Math.pow(1-k,3));el.textContent=dec?v.toFixed(dec).replace('.',','):Math.round(v);if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');if(x.target.dataset.count)count(x.target);io.unobserve(x.target)}})},{threshold:.15});
$$('.scard,.steps li,blockquote,details,.calc,.g,.soc,.cc').forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});$$('[data-count]').forEach(function(el){io.observe(el)})}
var pr=$('.prog');if(pr){var pp=function(){var r=pr.parentNode.getBoundingClientRect();pr.style.setProperty('--pp',Math.min(Math.max((innerHeight*.85-r.top)/(r.height+innerHeight*.3),0),1))};addEventListener('scroll',pp,{passive:true});pp()}
// plan semanal
var PLAN='';var pl=$('#pl');if(pl){var R=$('#dr'),hr=$('#hh .opt.on'),qg=new URLSearchParams(location.search).get('g'),goal=$('#go .opt[data-g="'+qg+'"]')||$('#go .opt.on');
$$('#go .opt').forEach(function(x){x.classList.toggle('on',x===goal)});
var S={fuerza:['Fuerza tren inferior','Fuerza tren superior','Fuerza global','Potencia y core','Fuerza + movilidad'],peso:['Circuito metabólico','Fuerza global','Cardio por intervalos','Fuerza + core','Circuito HIIT'],
lesion:['Valoración y movilidad','Fuerza progresiva','Estabilidad y control','Fuerza progresiva','Readaptación'],salud:['Fuerza y postura','Cardio suave + core','Movilidad y fuerza','Fuerza global','Movilidad']};
var DAYS=['LUN','MAR','MIÉ','JUE','VIE','SÁB'],PICK={1:[2],2:[1,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,3,4]};
function upd(){var n=+R.value,w=$('#wk');w.innerHTML='';var sat=hr.dataset.h.indexOf('Sábado')===0,pick=PICK[n].slice();if(sat){pick=pick.slice(0,n-1).concat([5])}
var k=0,ses=[];DAYS.forEach(function(dn,i){var on=pick.indexOf(i)>=0,el=document.createElement('div');el.className='day'+(on?' act new':'');var st=on?S[goal.dataset.g][k++]:'';if(on)ses.push(dn.charAt(0)+dn.slice(1).toLowerCase()+': '+st);
el.innerHTML='<small>'+dn+'</small>'+(on?'<b>'+st+'</b><i>'+(i===5?'9:00–12:00':sat?'Horario flexible':hr.textContent)+'</i>':'<i>Descanso</i>');w.appendChild(el)});
$('#dv').textContent=n+(n>1?' días':' día');R.style.setProperty('--p',((n-1)/4*100)+'%');
PLAN='Objetivo: '+goal.textContent+'\nDías por semana: '+n+'\nHorario: '+hr.dataset.h+'\nSemana tipo: '+ses.join(', ')}
$$('#go .opt').forEach(function(o){o.addEventListener('click',function(){$$('#go .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on');goal=o;upd()})});
$$('#hh .opt').forEach(function(o){o.addEventListener('click',function(){$$('#hh .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on');hr=o;upd()})});R.addEventListener('input',upd);upd()}
// formulario
var cf=$('#cf');if(cf){$$('#nv .opt').forEach(function(o){o.addEventListener('click',function(){$$('#nv .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on')})});
$$('#ex .opt').forEach(function(o){o.addEventListener('click',function(){o.classList.toggle('on')})});
cf.addEventListener('submit',function(e){e.preventDefault();var v=function(n){return cf.querySelector('[name='+n+']').value.trim()},ok=true;
['n','t'].forEach(function(n){var f=cf.querySelector('[name='+n+']').parentNode,bad=!v(n);f.classList.toggle('err',bad);if(bad)ok=false});if(!ok){cf.querySelector('.err input').focus();return}
var ex=$$('#ex .opt.on').map(function(x){return x.textContent});
var msg='Hola! He hecho mi plan en la web de Fit365.\n\nNombre: '+v('n')+'\nTeléfono: '+v('t')+(v('e')?'\nEdad: '+v('e'):'')+'\nNivel: '+$('#nv .opt.on').textContent+(v('l')?'\nLesiones o molestias: '+v('l'):'')+'\n\n'+PLAN+(ex.length?'\nMe interesa también: '+ex.join(', '):'')+(v('m')?'\n\n'+v('m'):'');
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener')})}
// lightbox
var lb=$('.lb');if(lb){var im=$('img',lb);$$('.g').forEach(function(x){x.addEventListener('click',function(){im.src=x.dataset.src;lb.hidden=false})});lb.addEventListener('click',function(){lb.hidden=true});addEventListener('keydown',function(e){if(e.key==='Escape')lb.hidden=true})}
})();
