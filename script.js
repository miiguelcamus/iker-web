(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var WA='34652723373',fine=matchMedia('(hover:hover) and (pointer:fine)').matches,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var b=$('.burger'),m=$('.menu');b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var g={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()).forEach(function(p){g[p.type]=p.value});
var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[g.weekday],t=(+g.hour%24)*60+ +g.minute;
var open=(d>=1&&d<=5&&t>=360&&t<1320)||(d===6&&t>=540&&t<840);var lv=$('#live');
if(lv){lv.textContent=open?'Abierto ahora · Vitoria-Gasteiz':'Ahora cerrado · escríbele por WhatsApp';lv.style.setProperty('--c',open?'#4e9160':'#c0573e')}
var li=$('#hours li[data-d="'+d+'"]');if(li)li.classList.add('today');
// palabra rotatoria
var ws=$$('.rot .w'),wi=0;if(ws.length&&!RM)setInterval(function(){var a=ws[wi];a.classList.remove('on');a.classList.add('out');setTimeout(function(){a.classList.remove('out')},500);wi=(wi+1)%ws.length;ws[wi].classList.add('on')},2400);
// magnéticos
if(fine&&!RM)$$('.mag').forEach(function(el){el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();el.style.transform='translate('+(e.clientX-r.left-r.width/2)*.22+'px,'+(e.clientY-r.top-r.height/2)*.35+'px)'});el.addEventListener('mouseleave',function(){el.style.transform=''})});
function count(el){var to=+el.dataset.count,dec=+(el.dataset.dec||0),s=null;function f(ts){if(!s)s=ts;var k=Math.min((ts-s)/1200,1),v=to*(1-Math.pow(1-k,3));el.textContent=dec?v.toFixed(dec).replace('.',','):Math.round(v);if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');if(x.target.dataset.count)count(x.target);io.unobserve(x.target)}})},{threshold:.15});
$$('.scard,.steps li,blockquote,details,.calc,.g,.soc,.cc').forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});$$('[data-count]').forEach(function(el){io.observe(el)})}
var pr=$('.prog');if(pr){var pp=function(){var r=pr.parentNode.getBoundingClientRect();pr.style.setProperty('--pp',Math.min(Math.max((innerHeight*.85-r.top)/(r.height+innerHeight*.3),0),1))};addEventListener('scroll',pp,{passive:true});pp()}
// formulario
var cf=$('#cf');if(cf){var one=function(id){$$('#'+id+' .opt').forEach(function(o){o.addEventListener('click',function(){$$('#'+id+' .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on')})})},
many=function(id,cb){$$('#'+id+' .opt').forEach(function(o){o.addEventListener('click',function(){o.classList.toggle('on');if(cb)cb()})})};
['go','hh','md','nv'].forEach(one);
var qg=new URLSearchParams(location.search).get('g'),pg=qg&&$('#go .opt[data-g="'+qg+'"]');if(pg)pg.click();
var on=function(id){return $$('#'+id+' .opt.on').map(function(x){return x.textContent})},dc=$('#dc');
many('dy',function(){var n=on('dy').length;dc.textContent=n?n+(n>1?' días':' día'):'Elige uno o varios';dc.parentNode.parentNode.classList.remove('bad')});many('ex');
cf.addEventListener('submit',function(e){e.preventDefault();var v=function(n){return cf.querySelector('[name='+n+']').value.trim()},ok=true;
['n','t'].forEach(function(n){var f=cf.querySelector('[name='+n+']').parentNode,bad=!v(n);f.classList.toggle('err',bad);if(bad)ok=false});
if(!on('dy').length){$('#dy').parentNode.classList.add('bad');ok=false}
if(!ok){var f=cf.querySelector('.err input,.bad');f.scrollIntoView({block:'center',behavior:'smooth'});if(f.focus)f.focus();return}
var ex=on('ex');
var msg='Hola! Os escribo desde la web de Fit365.\n\nNombre: '+v('n')+'\nTeléfono: '+v('t')+(v('e')?'\nEdad: '+v('e'):'')+(v('l')?'\nLesiones / necesidades: '+v('l'):'')+
'\n\nObjetivo: '+on('go')[0]+'\nDías: '+on('dy').join(', ')+'\nHorario: '+on('hh')[0]+'\nModalidad: '+on('md')[0]+'\nNivel: '+on('nv')[0]+(ex.length?'\nMe interesa también: '+ex.join(', '):'')+(v('m')?'\n\n'+v('m'):'');
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener')})}
// parrilla
var sl=$('#slots');if(sl){var tabs=$$('#dtab .tab'),DN={1:'lunes',2:'martes',3:'miércoles',4:'jueves',5:'viernes',6:'sábado'};
function hh(h){return h+':00'}
function show(day){tabs.forEach(function(x){x.classList.toggle('on',+x.dataset.d===day)});sl.innerHTML='';var a=day===6?9:6,z=day===6?14:22,ch=Math.floor(t/60);
for(var h=a;h<z;h++){var st=day===d?(h<ch?'past':h===ch?'now':''):'',el=document.createElement('a');el.className='slot '+st;el.style.animationDelay=(h-a)*25+'ms';el.target='_blank';el.rel='noopener';
el.href='https://wa.me/'+WA+'?text='+encodeURIComponent('Hola! Quiero reservar plaza en Fit365 el '+DN[day]+' a las '+hh(h)+'.');
el.innerHTML='<span><b>'+hh(h)+'</b><small>Grupo reducido · máx. 5</small></span><em>'+(st==='now'?'Ahora':st==='past'?'Pasada':'Reservar')+'</em>';sl.appendChild(el)}}
tabs.forEach(function(x){if(+x.dataset.d===d)x.classList.add('td');x.addEventListener('click',function(){show(+x.dataset.d)})});
show(d>=1&&d<=6?d:1);var pn=$('#pnow');pn.textContent=open?'Abierto ahora':'Ahora cerrado';pn.style.setProperty('--c',open?'#4e9160':'#c0573e')}
// vídeo
var vd=$('#vid');if(vd)vd.addEventListener('click',function(){if(vd.querySelector('iframe'))return;var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+vd.dataset.id+'?autoplay=1&rel=0&modestbranding=1&playsinline=1';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.title='Vídeo de presentación de Fit365';vd.innerHTML='';vd.appendChild(f);vd.style.cursor='default'});
// lightbox
var lb=$('.lb');if(lb){var im=$('img',lb);$$('.g').forEach(function(x){x.addEventListener('click',function(){im.src=x.dataset.src;lb.hidden=false})});lb.addEventListener('click',function(){lb.hidden=true});addEventListener('keydown',function(e){if(e.key==='Escape')lb.hidden=true})}
})();
