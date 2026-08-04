/* ========================================================================== 
   UNIDAD 5 · RECTAS EN EL PLANO
   Navegación, progreso, applets SVG, TP guiado y autoevaluación.
   ========================================================================== */
'use strict';

const STORAGE_KEY = 'algebra_u5_progreso_v1';
const TP_STORAGE_KEY = 'algebra_u5_tp_v1';
const MODULE_KEYS = ['formas','constructor','posiciones','distancias','mediatriz','area','practica','aplicaciones','autoevaluacion'];
const EPS = 1e-9;
const completed = new Set(loadJson(STORAGE_KEY, []));

const PLOT = {width: 720, height: 520, left: 52, right: 28, top: 26, bottom: 46, xmin: -10, xmax: 10, ymin: -8, ymax: 8};
const SVG_NS = 'http://www.w3.org/2000/svg';

const steppers = {
  tp2b: {
    tag: 'TP 5 · ejercicio 2.b',
    title: 'Recta paralela por un punto',
    intro: `Hallar la recta que pasa por \(A=(-1,-2)\) y es paralela a \(L_1:y-3x-9=0\).`,
    complete: 'formas',
    steps: [
      `Reescribimos la recta dada: \(y=3x+9\). Su pendiente es \(m=3\).`,
      `Una recta paralela debe conservar la misma pendiente. Usamos la forma punto–pendiente: \[y-(-2)=3\bigl(x-(-1)\bigr).\]`,
      `Desarrollamos: \[y+2=3x+3\quad\Longrightarrow\quad \boxed{y=3x+1}.\]`,
      `En forma implícita: \[\boxed{-3x+y-1=0}.\] El punto \((-1,-2)\) verifica la ecuación y la pendiente sigue siendo \(3\).`
    ]
  },
  tp5: {
    tag: 'TP 5 · ejercicio 5',
    title: 'Paralelas, perpendiculares y coincidentes',
    intro: `\(L_1:3x+hy+4=0\) y \(L_2:2x-4y+k=0\).`,
    complete: 'posiciones',
    steps: [
      `Los vectores normales son \(\vec n_1=(3,h)\) y \(\vec n_2=(2,-4)\).`,
      `<strong>Paralelas.</strong> Los normales deben ser proporcionales: \(\frac32=\frac{h}{-4}\), de donde \(h=-6\). Para que no coincidan, debe cumplirse \(k\neq\frac83\).`,
      `<strong>Perpendiculares.</strong> Los normales también son perpendiculares: \[(3,h)\cdot(2,-4)=0\quad\Longrightarrow\quad 6-4h=0,\] por lo tanto \(h=\frac32\). El valor de \(k\) es libre.`,
      `<strong>Coincidentes.</strong> Todos los coeficientes deben ser proporcionales: \[h=-6,\qquad \frac{4}{k}=\frac32,\] de modo que \(\boxed{h=-6,\;k=\frac83}.\]`
    ]
  },
  tp7: {
    tag: 'TP 5 · ejercicio 7',
    title: 'Mediatriz y puntos equidistantes',
    intro: `Sean \(A=(-1,-2)\) y \(B=(3,6)\).`,
    complete: 'mediatriz',
    steps: [
      `El punto medio es \[M=\left(\frac{-1+3}{2},\frac{-2+6}{2}\right)=(1,2).\]`,
      `El vector \(\overrightarrow{AB}=(4,8)\) es normal a la mediatriz. Entonces: \[4(x-1)+8(y-2)=0.\]`,
      `Simplificando: \[\boxed{x+2y-5=0}.\]`,
      `Sobre el eje \(x\), imponemos \(y=0\) y obtenemos \(P=(5,0)\).`,
      `Con \(L:2x-y+1=0\), la intersección con la mediatriz es \(\left(\frac35,\frac{11}{5}\right)\). En cambio, \(2x+4y+4=0\) es paralela a la mediatriz y no aporta un punto equidistante.`
    ]
  },
  tp12c: {
    tag: 'TP 5 · ejercicio 12.c',
    title: 'Distancia entre dos rectas paralelas',
    intro: `\(L_1:\;x=-2+t,\;y=3-t\) y \(L_2:\;x=5+k,\;y=-2-k\).`,
    complete: 'distancias',
    steps: [
      `Ambas rectas tienen director \((1,-1)\), por lo que son paralelas.`,
      `Convertimos \(L_1\) a forma implícita: \[x+y-1=0.\]`,
      `Tomamos el punto \(P=(5,-2)\in L_2\). Entonces: \[d(L_1,L_2)=d(P,L_1)=\frac{|5-2-1|}{\sqrt{1^2+1^2}}.\]`,
      `Finalmente: \[\boxed{d(L_1,L_2)=\frac{2}{\sqrt2}=\sqrt2}.\]`
    ]
  },
  tp14: {
    tag: 'TP 5 · ejercicio 14',
    title: 'Punto de una recta más cercano a un punto exterior',
    intro: `\(A=(1,-2)\) y \(L:(x,y)=\lambda(3,4)\).`,
    complete: 'distancias',
    steps: [
      `Un punto genérico de \(L\) es \(P(\lambda)=(3\lambda,4\lambda)\). El vector \(\overrightarrow{PA}=A-P(\lambda)\) debe ser perpendicular al director \((3,4)\).`,
      `Imponemos: \[(1-3\lambda,-2-4\lambda)\cdot(3,4)=0.\]`,
      `Se obtiene \(-5-25\lambda=0\), por lo tanto \(\lambda=-\frac15\) y \[\boxed{P=(-\frac35,-\frac45)}.\]`,
      `La distancia mínima es \[d(A,L)=\|A-P\|=\sqrt{(\frac85)^2+(-\frac65)^2}=\boxed{2}.\]`,
      `La paralela a \(L\) que pasa por \(A\) tiene ecuación \(4x-3y-10=0\) y está a distancia \(2\) de \(L:4x-3y=0\). Por eso el inciso de distancia \(4\) no es posible, mientras que el de distancia \(2\) sí.`
    ]
  },
  tp17: {
    tag: 'TP 5 · ejercicios 17 y 18',
    title: 'Familias o haces de rectas',
    intro: `El parámetro permite describir infinitas rectas que comparten una propiedad.`,
    complete: 'practica',
    steps: [
      `Paralelas a \(3y-x-3=0\): \[\boxed{y=\frac13x+k},\qquad k\in\mathbb R.\]`,
      `Perpendiculares a \(3x+2y-7=0\): la pendiente pedida es \(\frac23\), por ejemplo \[\boxed{y=\frac23x+k}.\]`,
      `Rectas que pasan por \(P=(4,-2)\): \[\boxed{y+2=k(x-4)}.\] Esta expresión no incluye la vertical \(x=4\), que debe agregarse aparte.`,
      `La familia \(-3x+3y+k=0\) conserva el vector normal y está formada por paralelas. La familia \(y=kx-8\) conserva el punto \((0,-8)\).`,
      `En \(\frac{x}{-2}+\frac{y}{k}=1\), todas las rectas pasan por el corte fijo \((-2,0)\).`
    ]
  }
};

const quizBank = [
  {q:String.raw`Una recta pasa por \(P_0=(2,-1)\) y tiene director \((3,4)\). ¿Cuál es su forma vectorial?`, options:[String.raw`\((x,y)=(2,-1)+\lambda(3,4)\)`,String.raw`\((x,y)=(3,4)+\lambda(2,-1)\)`,String.raw`\(3x+4y=0\)`,String.raw`\(y=4x+3\)`], answer:0, exp:String.raw`La forma vectorial usa un punto de la recta más un múltiplo del vector director.`},
  {q:String.raw`Si \(L:ax+by+c=0\), ¿qué vector es normal a la recta?`, options:[String.raw`\((a,b)\)`,String.raw`\((-b,a)\)`,String.raw`\((c,a)\)`,String.raw`\((1,m)\)`], answer:0, exp:String.raw`Los coeficientes de \(x\) e \(y\) forman un vector perpendicular a la recta.`},
  {q:String.raw`¿Cuál es un director de \(2x-3y+1=0\)?`, options:[String.raw`\((2,-3)\)`,String.raw`\((3,2)\)`,String.raw`\((2,3)\)`,String.raw`\((-3,-2)\)`], answer:1, exp:String.raw`Un vector perpendicular al normal \((2,-3)\) es \((3,2)\).`},
  {q:String.raw`Dos rectas no verticales son paralelas cuando…`, options:[String.raw`sus pendientes son opuestas`,String.raw`sus pendientes son iguales`,String.raw`el producto de pendientes es \(1\)`,String.raw`sus ordenadas son iguales`], answer:1, exp:String.raw`La misma pendiente expresa la misma dirección; luego se revisa si coinciden o son distintas.`},
  {q:String.raw`Dos rectas de pendientes \(2\) y \(-\tfrac12\) son…`, options:[String.raw`paralelas`,String.raw`coincidentes`,String.raw`perpendiculares`,String.raw`verticales`], answer:2, exp:String.raw`El producto de pendientes es \(-1\).`},
  {q:String.raw`La distancia de un punto perteneciente a una recta es…`, options:[String.raw`\(1\)`,String.raw`la norma del normal`,String.raw`\(0\)`,String.raw`indefinida`], answer:2, exp:String.raw`Si el punto verifica la ecuación, el numerador de la fórmula de distancia es cero.`},
  {q:String.raw`La mediatriz de \(AB\) pasa por…`, options:[String.raw`el origen`,String.raw`el punto medio de \(AB\)`,String.raw`el extremo \(A\) solamente`,String.raw`cualquier punto del eje \(x\)`], answer:1, exp:String.raw`Además de pasar por el punto medio, es perpendicular al segmento.`},
  {q:String.raw`Si \(A=B\), ¿qué ocurre con la recta determinada por esos dos puntos?`, options:[String.raw`es vertical`,String.raw`es horizontal`,String.raw`no queda determinada de manera única`,String.raw`pasa por el origen`], answer:2, exp:String.raw`Dos puntos coincidentes no aportan una dirección.`},
  {q:String.raw`Para el área con base \(AB\), la altura es…`, options:[String.raw`\(d(A,B)\)`,String.raw`\(d(C,L_{AB})\)`,String.raw`\(d(A,C)\)`,String.raw`la pendiente de \(AB\)`], answer:1, exp:String.raw`La altura es la distancia perpendicular del vértice opuesto a la recta que contiene la base.`},
  {q:String.raw`Una recta vertical se escribe naturalmente como…`, options:[String.raw`\(y=mx+n\)`,String.raw`\(x=x_0\)`,String.raw`\(y=y_0\)`,String.raw`\(m=0\)`], answer:1, exp:String.raw`La pendiente de una vertical no existe, pero su coordenada \(x\) es constante.`},
  {q:String.raw`El ángulo menor entre dos rectas se calcula usando…`, options:[String.raw`el producto escalar sin valor absoluto`,String.raw`el valor absoluto del producto escalar`,String.raw`solo las ordenadas al origen`,String.raw`la distancia entre rectas`], answer:1, exp:String.raw`El valor absoluto evita elegir el ángulo obtuso suplementario.`},
  {q:String.raw`La familia \(y=kx-8\) tiene en común…`, options:[String.raw`la pendiente`,String.raw`el punto \((0,-8)\)`,String.raw`el vector normal`,String.raw`ser horizontal`], answer:1, exp:String.raw`Al poner \(x=0\) siempre se obtiene \(y=-8\).`},
  {q:String.raw`La pendiente asociada al director \((4,-2)\) es…`, options:[String.raw`\(-2\)`,String.raw`\(-\tfrac12\)`,String.raw`\(2\)`,String.raw`\(\tfrac12\)`], answer:1, exp:String.raw`\(m=u_y/u_x=-2/4=-1/2\).`},
  {q:String.raw`Si tres puntos están alineados, el área del triángulo que forman es…`, options:[String.raw`positiva`,String.raw`negativa`,String.raw`cero`,String.raw`infinita`], answer:2, exp:String.raw`La altura respecto de cualquier base es cero.`},
  {q:String.raw`La ecuación segmentaria \(\frac{x}{A}+\frac{y}{B}=1\) muestra directamente…`, options:[String.raw`el normal`,String.raw`los cortes con los ejes`,String.raw`el punto medio`,String.raw`el ángulo entre rectas`], answer:1, exp:String.raw`Los puntos de corte son \((A,0)\) y \((0,B)\).`}
];

/* --------------------------------------------------------------------------
   Utilidades generales
   -------------------------------------------------------------------------- */
function $(id) { return document.getElementById(id); }
function loadJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function saveJson(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* El sitio sigue funcionando si el almacenamiento está bloqueado. */ } }
function num(input, fallback = 0) { const value = Number.parseFloat(input.value); return Number.isFinite(value) ? value : fallback; }
function fmt(value, digits = 3) { if (!Number.isFinite(value)) return '—'; if (Math.abs(value) < EPS) return '0'; if (Math.abs(value - Math.round(value)) < 1e-8) return String(Math.round(value)); return Number(value.toFixed(digits)).toString(); }
function signed(value) { return value >= 0 ? `+${fmt(value)}` : fmt(value); }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function shuffle(array) { const copy = [...array]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function typeset(node = document.body) {
  if (window.MathJax?.typesetPromise) {
    if (window.MathJax.typesetClear) window.MathJax.typesetClear([node]);
    window.MathJax.typesetPromise([node]).catch(console.error);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function renderChoiceCards(name, options, ariaLabel, extraClass = '') {
  return `<div class="choice-cards ${extraClass}" role="radiogroup" aria-label="${escapeHtml(ariaLabel)}">
    ${options.map((option, index) => {
      const value = typeof option === 'object' ? option.value : index;
      const label = typeof option === 'object' ? option.label : option;
      return `<label class="choice-card">
        <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(value)}">
        <span class="choice-card__content">${label}</span>
      </label>`;
    }).join('')}
  </div>`;
}
function clearChoiceState(root) {
  root.querySelectorAll('.choice-card').forEach(card => card.classList.remove('correct', 'wrong'));
}
function markChoiceState(root, correctValue, selectedValue, revealCorrect = false) {
  root.querySelectorAll('.choice-card').forEach(card => {
    const input = card.querySelector('input[type="radio"]');
    const isCorrect = input?.value === String(correctValue);
    const isSelected = input?.value === String(selectedValue);
    card.classList.toggle('correct', isCorrect && (isSelected || revealCorrect));
    card.classList.toggle('wrong', isSelected && !isCorrect);
  });
}

function toast(message) { const el = $('toast'); el.textContent = message; el.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => { el.hidden = true; }, 2300); }
function el(name, attrs = {}, text = '') { const node = document.createElementNS(SVG_NS, name); Object.entries(attrs).forEach(([k,v]) => node.setAttribute(k, String(v))); if (text) node.textContent = text; return node; }
function mapPoint(point, plot = PLOT) {
  const innerW = plot.width - plot.left - plot.right;
  const innerH = plot.height - plot.top - plot.bottom;
  return {
    x: plot.left + (point.x - plot.xmin) / (plot.xmax - plot.xmin) * innerW,
    y: plot.height - plot.bottom - (point.y - plot.ymin) / (plot.ymax - plot.ymin) * innerH
  };
}
function unmapPoint(point, plot = PLOT) {
  const innerW = plot.width - plot.left - plot.right;
  const innerH = plot.height - plot.top - plot.bottom;
  return {
    x: plot.xmin + (point.x - plot.left) / innerW * (plot.xmax - plot.xmin),
    y: plot.ymin + (plot.height - plot.bottom - point.y) / innerH * (plot.ymax - plot.ymin)
  };
}
function pointerToSvg(svg, event) { const rect = svg.getBoundingClientRect(); return {x: (event.clientX - rect.left) / rect.width * PLOT.width, y: (event.clientY - rect.top) / rect.height * PLOT.height}; }
function snap(value, step = .5) { return Math.round(value / step) * step; }
function drawAxes(svg, plot = PLOT, xStep = 1, yStep = 1) {
  svg.replaceChildren();
  const g = el('g');
  const axisX = clamp(0, plot.xmin, plot.xmax);
  const axisY = clamp(0, plot.ymin, plot.ymax);
  const axisSvg = mapPoint({x:axisX, y:axisY}, plot);
  for (let x = Math.ceil(plot.xmin); x <= Math.floor(plot.xmax); x += xStep) {
    const p1 = mapPoint({x, y: plot.ymin}, plot), p2 = mapPoint({x, y: plot.ymax}, plot);
    g.append(el('line', {x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,class:Math.abs(x-axisX)<EPS?'svg-axis':'svg-grid-line'}));
    if (Math.abs(x-axisX)>EPS && (xStep >= 2 || Math.abs(x % 2)<EPS)) g.append(el('text', {x:p1.x,y:axisSvg.y+18,class:'svg-axis-label','text-anchor':'middle'}, String(x)));
  }
  for (let y = Math.ceil(plot.ymin); y <= Math.floor(plot.ymax); y += yStep) {
    const p1 = mapPoint({x: plot.xmin, y}, plot), p2 = mapPoint({x: plot.xmax, y}, plot);
    g.append(el('line', {x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,class:Math.abs(y-axisY)<EPS?'svg-axis':'svg-grid-line'}));
    if (Math.abs(y-axisY)>EPS && (yStep >= 2 || Math.abs(y % 2)<EPS)) g.append(el('text', {x:axisSvg.x-9,y:p1.y+4,class:'svg-axis-label','text-anchor':'end'}, String(y)));
  }
  svg.append(g);
}
function drawPoint(svg, point, label, className = 'svg-point-main', dataPoint = '') {
  const p = mapPoint(point);
  const circle = el('circle', {cx:p.x,cy:p.y,r:8,class:className});
  if (dataPoint) circle.dataset.point = dataPoint;
  svg.append(circle, el('text', {x:p.x+12,y:p.y-12,class:'svg-point-label'}, label));
  return circle;
}
function lineClipFromPointDir(point, dir, plot = PLOT) {
  const candidates = [];
  if (Math.abs(dir.x) > EPS) {
    for (const x of [plot.xmin, plot.xmax]) { const t = (x - point.x) / dir.x; const y = point.y + t * dir.y; if (y >= plot.ymin-EPS && y <= plot.ymax+EPS) candidates.push({x,y}); }
  }
  if (Math.abs(dir.y) > EPS) {
    for (const y of [plot.ymin, plot.ymax]) { const t = (y - point.y) / dir.y; const x = point.x + t * dir.x; if (x >= plot.xmin-EPS && x <= plot.xmax+EPS) candidates.push({x,y}); }
  }
  const unique = candidates.filter((p,i,a) => a.findIndex(q => Math.hypot(q.x-p.x,q.y-p.y)<1e-6) === i);
  return unique.length >= 2 ? [unique[0], unique[1]] : null;
}
function pointOnImplicit(a,b,c) { if (Math.abs(b) > EPS) return {x:0,y:-c/b}; if (Math.abs(a) > EPS) return {x:-c/a,y:0}; return null; }
function drawLineFromPointDir(svg, point, dir, className = 'svg-line-main') { const clip = lineClipFromPointDir(point,dir); if (!clip) return; const p1=mapPoint(clip[0]),p2=mapPoint(clip[1]); svg.append(el('line',{x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,class:className})); }
function drawImplicit(svg,a,b,c,className='svg-line-main') { const p=pointOnImplicit(a,b,c); if (!p) return; drawLineFromPointDir(svg,p,{x:b,y:-a},className); }
function drawSegment(svg,p1,p2,className='svg-line-guide') { const a=mapPoint(p1),b=mapPoint(p2); svg.append(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:className})); }
function addArrowDefs(svg) {
  const defs = el('defs');
  const marker = el('marker',{id:'svgArrow',markerWidth:10,markerHeight:10,refX:8,refY:5,orient:'auto'});
  marker.append(el('path',{d:'M0,0 L10,5 L0,10 Z',fill:'#157347'})); defs.append(marker); svg.append(defs);
}
function normalizeLine(a,b,c) {
  const norm = Math.hypot(a,b); if (norm < EPS) return null;
  let aa=a/norm, bb=b/norm, cc=c/norm;
  if (aa < -EPS || (Math.abs(aa)<EPS && bb < 0)) { aa=-aa; bb=-bb; cc=-cc; }
  return {a:aa,b:bb,c:cc};
}

/* --------------------------------------------------------------------------
   Navegación y progreso
   -------------------------------------------------------------------------- */
function showModule(id) {
  document.querySelectorAll('.module').forEach(section => { const active = section.id === id; section.hidden = !active; section.classList.toggle('active', active); });
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.target === id));
  $('sidebar').classList.remove('open'); $('mobileOverlay').hidden = true; $('menuButton').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'smooth'});
}
function updateProgress() {
  const count = MODULE_KEYS.filter(key => completed.has(key)).length;
  const percent = Math.round(count / MODULE_KEYS.length * 100);
  $('progressText').textContent = `${percent}%`; $('progressBar').style.width = `${percent}%`;
  $('progressDetail').textContent = `${count} de ${MODULE_KEYS.length} módulos revisados.`;
  document.querySelectorAll('[data-complete]').forEach(button => {
    const done = completed.has(button.dataset.complete); button.classList.toggle('done',done); button.textContent = done ? 'Módulo revisado ✓' : 'Marcar módulo como revisado';
  });
}
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => showModule(button.dataset.target)));
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showModule(button.dataset.go)));
  document.querySelectorAll('[data-complete]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.complete; completed.has(key) ? completed.delete(key) : completed.add(key); saveJson(STORAGE_KEY,[...completed]); updateProgress();
  }));
  $('menuButton').addEventListener('click', () => { const open = !$('sidebar').classList.contains('open'); $('sidebar').classList.toggle('open',open); $('mobileOverlay').hidden = !open; $('menuButton').setAttribute('aria-expanded',String(open)); });
  $('mobileOverlay').addEventListener('click', () => { $('sidebar').classList.remove('open'); $('mobileOverlay').hidden=true; });
  $('printButton').addEventListener('click', () => { document.querySelectorAll('.module').forEach(s=>s.hidden=false); setTimeout(()=>window.print(),80); setTimeout(()=>showModule(document.querySelector('.nav-item.active')?.dataset.target || 'inicio'),200); });
  $('resetProgressButton').addEventListener('click', () => { if (!confirm('¿Querés borrar el progreso guardado de esta unidad?')) return; try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(TP_STORAGE_KEY); } catch { /* Sin almacenamiento disponible. */ } completed.clear(); updateProgress(); initChecklist(); toast('Progreso reiniciado'); });
  updateProgress();
}

/* --------------------------------------------------------------------------
   Conversor de ecuaciones
   -------------------------------------------------------------------------- */
function updateConverter() {
  const x0=num($('convX0')),
        y0=num($('convY0')),
        ux=num($('convUx')),
        uy=num($('convUy'));
  const out=$('converterResults'), status=$('converterStatus');
  if (Math.hypot(ux,uy) < EPS) {
    status.textContent='Director nulo'; status.classList.add('warning'); out.innerHTML='<article><h4>No hay recta</h4><p>El vector director debe ser distinto de \(\vec0\).</p></article>'; typeset(out); return;
  }
  status.textContent='Datos válidos'; status.classList.remove('warning');
  const a=uy, b=-ux, c=ux*y0-uy*x0;
  const vectorial=`L:(x,y)=(${fmt(x0)},${fmt(y0)})+\\lambda(${fmt(ux)},${fmt(uy)})`;
  const param=`\\begin{cases}x=${fmt(x0)}${signed(ux)}\\lambda\\\\y=${fmt(y0)}${signed(uy)}\\lambda\\end{cases}`;
  let cart, explicit, pointSlope;
  if (Math.abs(ux)>EPS && Math.abs(uy)>EPS) cart=`\\frac{x-${fmt(x0)}}{${fmt(ux)}}=\\frac{y-${fmt(y0)}}{${fmt(uy)}}`;
  else if (Math.abs(ux)<EPS) cart=`x=${fmt(x0)}`;
  else cart=`y=${fmt(y0)}`;
  if (Math.abs(ux)>EPS) {
    const m=uy/ux, n=y0-m*x0; explicit=`y=${fmt(m)}x${signed(n)}`; pointSlope=`y-${fmt(y0)}=${fmt(m)}(x-${fmt(x0)})`;
  } else { explicit='\\text{No existe forma explícita }y=mx+n'; pointSlope=`x=${fmt(x0)}`; }
  out.innerHTML=`
    <article><h4>Vectorial</h4>\\[${vectorial}.\\]</article>
    <article><h4>Paramétrica</h4>\\[${param}.\\]</article>
    <article><h4>Cartesiana / especial</h4>\\[${cart}.\\]</article>
    <article><h4>Punto–pendiente</h4>\\[${pointSlope}.\\]</article>
    <article><h4>Explícita</h4>\\[${explicit}.\\]</article>
    <article><h4>Implícita</h4>\\[${fmt(a)}x${signed(b)}y${signed(c)}=0.\\]<p>Normal: \((${fmt(a)},${fmt(b)})\).</p></article>`;
  typeset(out);
}
function initConverter() { ['convX0','convY0','convUx','convUy'].forEach(id => $(id).addEventListener('input',updateConverter)); $('converterUpdate').addEventListener('click',updateConverter); updateConverter(); }

/* --------------------------------------------------------------------------
   Constructor de rectas
   -------------------------------------------------------------------------- */
let lineDrag = '';
function updateLineBuilder() {
  const svg=$('lineBuilderSvg'); drawAxes(svg); addArrowDefs(svg);
  const p0={x:num($('lineX0')),
            y:num($('lineY0'))}, d={x:num($('lineUx')),
            y:num($('lineUy'))}, lambda=num($('lineLambda'),1);
  $('lambdaValue').textContent=fmt(lambda,2);
  if (Math.hypot(d.x,d.y)<EPS) { $('lineBuilderStatus').textContent='Director nulo'; $('lineBuilderOutput').innerHTML='<p>El vector director debe ser no nulo.</p>'; drawPoint(svg,p0,'P₀','svg-point-main','P0'); return; }
  $('lineBuilderStatus').textContent='Recta definida'; drawLineFromPointDir(svg,p0,d,'svg-line-main');
  const q={x:p0.x+d.x,y:p0.y+d.y}, p={x:p0.x+lambda*d.x,y:p0.y+lambda*d.y};
  const a=mapPoint(p0), b=mapPoint(q); svg.append(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'svg-vector','marker-end':'url(#svgArrow)'}));
  drawSegment(svg,p,{x:p.x,y:0},'svg-line-guide'); drawSegment(svg,p,{x:0,y:p.y},'svg-line-guide');
  drawPoint(svg,p0,'P₀','svg-point-main','P0'); drawPoint(svg,q,'Q','svg-point-secondary','Q'); drawPoint(svg,p,'P(λ)','svg-point-danger');
  const m=Math.abs(d.x)>EPS?d.y/d.x:null, aa=d.y,bb=-d.x,cc=d.x*p0.y-d.y*p0.x;
  $('lineBuilderOutput').innerHTML=`<p><strong>Punto actual:</strong> \(P(${fmt(lambda)})=(${fmt(p.x)},${fmt(p.y)})\).</p><p><strong>Implícita:</strong> \(${fmt(aa)}x${signed(bb)}y${signed(cc)}=0\).</p><p><strong>Pendiente:</strong> \(${m===null?'\\text{no definida}':fmt(m)}\).</p>`;
  typeset($('lineBuilderOutput'));
}
function initLineBuilder() {
  ['lineX0','lineY0','lineUx','lineUy','lineLambda'].forEach(id=>$(id).addEventListener('input',updateLineBuilder));
  $('lineReset').addEventListener('click',()=>{ $('lineX0').value=-2;$('lineY0').value=-1;$('lineUx').value=5;$('lineUy').value=2;$('lineLambda').value=1;updateLineBuilder(); });
  const svg=$('lineBuilderSvg');
  svg.addEventListener('pointerdown',e=>{ const target=e.target.closest('[data-point]'); if (!target) return; lineDrag=target.dataset.point; target.setPointerCapture?.(e.pointerId); });
  svg.addEventListener('pointermove',e=>{ if (!lineDrag) return; const math=unmapPoint(pointerToSvg(svg,e)); const x=snap(clamp(math.x,PLOT.xmin,PLOT.xmax)), y=snap(clamp(math.y,PLOT.ymin,PLOT.ymax)); if(lineDrag==='P0'){ $('lineX0').value=x;$('lineY0').value=y; } else { const x0=num($('lineX0')),y0=num($('lineY0'));$('lineUx').value=fmt(x-x0,2);$('lineUy').value=fmt(y-y0,2); } updateLineBuilder(); });
  ['pointerup','pointercancel','pointerleave'].forEach(type=>svg.addEventListener(type,e=>{ if(type!=='pointerleave'||e.buttons===0) lineDrag=''; }));
  updateLineBuilder();
}

/* --------------------------------------------------------------------------
   Posición relativa
   -------------------------------------------------------------------------- */
function updatePositionLab() {
  const svg=$('positionSvg'); drawAxes(svg);
  const v1=$('posVertical1').checked,v2=$('posVertical2').checked,m1=num($('posM1')),m2=num($('posM2')),n1=num($('posN1')),n2=num($('posN2'));
  if(v1) drawLineFromPointDir(svg,{x:n1,y:0},{x:0,y:1},'svg-line-main'); else drawLineFromPointDir(svg,{x:0,y:n1},{x:1,y:m1},'svg-line-main');
  if(v2) drawLineFromPointDir(svg,{x:n2,y:0},{x:0,y:1},'svg-line-secondary'); else drawLineFromPointDir(svg,{x:0,y:n2},{x:1,y:m2},'svg-line-secondary');
  let kind='', intersection=null;
  if(v1&&v2) kind=Math.abs(n1-n2)<EPS?'Coincidentes':'Paralelas no coincidentes';
  else if(v1&&!v2){ kind=Math.abs(m2)<EPS?'Secantes perpendiculares':'Secantes'; intersection={x:n1,y:m2*n1+n2}; }
  else if(!v1&&v2){ kind=Math.abs(m1)<EPS?'Secantes perpendiculares':'Secantes'; intersection={x:n2,y:m1*n2+n1}; }
  else if(Math.abs(m1-m2)<EPS) kind=Math.abs(n1-n2)<EPS?'Coincidentes':'Paralelas no coincidentes';
  else { intersection={x:(n2-n1)/(m1-m2),y:m1*((n2-n1)/(m1-m2))+n1}; kind=Math.abs(m1*m2+1)<1e-7?'Secantes perpendiculares':'Secantes'; }
  if(intersection && intersection.x>=PLOT.xmin&&intersection.x<=PLOT.xmax&&intersection.y>=PLOT.ymin&&intersection.y<=PLOT.ymax) drawPoint(svg,intersection,'I','svg-point-danger');
  const d1=v1?{x:0,y:1}:{x:1,y:m1}, d2=v2?{x:0,y:1}:{x:1,y:m2}; const cos=Math.abs(d1.x*d2.x+d1.y*d2.y)/(Math.hypot(d1.x,d1.y)*Math.hypot(d2.x,d2.y)); const angle=Math.acos(clamp(cos,-1,1))*180/Math.PI;
  $('positionStatus').textContent=kind;
  $('positionOutput').innerHTML=`<p><strong>Clasificación:</strong> ${kind}.</p><p><strong>Ángulo menor:</strong> \(${fmt(angle,2)}^\\circ\).</p>${intersection?`<p><strong>Intersección:</strong> \((${fmt(intersection.x)},${fmt(intersection.y)})\).</p>`:''}`;
  typeset($('positionOutput'));
}
function initPositionLab() { ['posVertical1','posVertical2','posM1','posM2','posN1','posN2'].forEach(id=>$(id).addEventListener('input',updatePositionLab)); updatePositionLab(); }

/* --------------------------------------------------------------------------
   Distancia punto–recta
   -------------------------------------------------------------------------- */
let distanceDrag=false;
function updateDistanceLab() {
  const svg=$('distanceSvg'); drawAxes(svg);
  const a=num($('distA')),b=num($('distB')),c=num($('distC')),P={x:num($('distPx')),y:num($('distPy'))};
  if(Math.hypot(a,b)<EPS){ $('distanceStatus').textContent='Recta inválida'; $('distanceOutput').innerHTML='<p>Los coeficientes a y b no pueden ser ambos cero.</p>'; drawPoint(svg,P,'P','svg-point-danger','P'); return; }
  drawImplicit(svg,a,b,c,'svg-line-main');
  const t=(a*P.x+b*P.y+c)/(a*a+b*b), H={x:P.x-a*t,y:P.y-b*t}, distance=Math.abs(a*P.x+b*P.y+c)/Math.hypot(a,b);
  drawSegment(svg,P,H,'svg-segment-distance'); drawPoint(svg,H,'H','svg-point-foot'); drawPoint(svg,P,'P','svg-point-danger','P');
  $('distanceStatus').textContent=distance<EPS?'P pertenece a L':'Distancia positiva';
  $('distanceOutput').innerHTML=`<p><strong>Pie:</strong> \(H=(${fmt(H.x)},${fmt(H.y)})\).</p><p>\[d(P,L)=\\frac{|${fmt(a)}(${fmt(P.x)})${signed(b)}(${fmt(P.y)})${signed(c)}|}{\\sqrt{${fmt(a*a+b*b)}}}=\\boxed{${fmt(distance)}}.\]</p>`;
  typeset($('distanceOutput'));
}
function initDistanceLab(){ ['distA','distB','distC','distPx','distPy'].forEach(id=>$(id).addEventListener('input',updateDistanceLab)); const svg=$('distanceSvg'); svg.addEventListener('pointerdown',e=>{ if(e.target.dataset.point==='P'){distanceDrag=true;e.target.setPointerCapture?.(e.pointerId);} }); svg.addEventListener('pointermove',e=>{if(!distanceDrag)return;const p=unmapPoint(pointerToSvg(svg,e));$('distPx').value=snap(clamp(p.x,PLOT.xmin,PLOT.xmax));$('distPy').value=snap(clamp(p.y,PLOT.ymin,PLOT.ymax));updateDistanceLab();}); ['pointerup','pointercancel','pointerleave'].forEach(type=>svg.addEventListener(type,e=>{if(type!=='pointerleave'||e.buttons===0)distanceDrag=false;})); updateDistanceLab(); }

/* --------------------------------------------------------------------------
   Mediatriz
   -------------------------------------------------------------------------- */
let bisDrag='';
function updateBisectorLab(){
  const svg=$('bisectorSvg');drawAxes(svg); const A={x:num($('bisAx')),y:num($('bisAy'))},B={x:num($('bisBx')),y:num($('bisBy'))},t=num($('bisT'),.5);$('bisTValue').textContent=fmt(t,1);
  const dx=B.x-A.x,dy=B.y-A.y,len=Math.hypot(dx,dy); if(len<EPS){$('bisectorStatus').textContent='A y B coinciden';$('bisectorOutput').innerHTML='<p>Dos puntos coincidentes no determinan una mediatriz única.</p>';drawPoint(svg,A,'A=B','svg-point-main','A');return;}
  const M={x:(A.x+B.x)/2,y:(A.y+B.y)/2},perp={x:-dy/len,y:dx/len},P={x:M.x+2*t*perp.x,y:M.y+2*t*perp.y};
  drawSegment(svg,A,B,'svg-segment-base'); drawLineFromPointDir(svg,M,perp,'svg-line-secondary'); drawSegment(svg,P,A,'svg-line-guide');drawSegment(svg,P,B,'svg-line-guide');
  drawPoint(svg,A,'A','svg-point-main','A');drawPoint(svg,B,'B','svg-point-secondary','B');drawPoint(svg,M,'M','svg-midpoint');drawPoint(svg,P,'P','svg-point-danger');
  const dA=Math.hypot(P.x-A.x,P.y-A.y),dB=Math.hypot(P.x-B.x,P.y-B.y),a=dx,b=dy,c=-(dx*M.x+dy*M.y);
  $('bisectorStatus').textContent=Math.abs(dA-dB)<1e-7?'Equidistancia verificada':'Revisar';
  $('bisectorOutput').innerHTML=`<p><strong>Punto medio:</strong> \(M=(${fmt(M.x)},${fmt(M.y)})\).</p><p><strong>Mediatriz:</strong> \(${fmt(a)}x${signed(b)}y${signed(c)}=0\).</p><p>\(d(P,A)=${fmt(dA)}\) y \(d(P,B)=${fmt(dB)}\).</p>`;typeset($('bisectorOutput'));
}
function initBisectorLab(){ ['bisAx','bisAy','bisBx','bisBy','bisT'].forEach(id=>$(id).addEventListener('input',updateBisectorLab));$('bisReset').addEventListener('click',()=>{$('bisAx').value=-1;$('bisAy').value=-2;$('bisBx').value=3;$('bisBy').value=6;$('bisT').value=.5;updateBisectorLab();});const svg=$('bisectorSvg');svg.addEventListener('pointerdown',e=>{if(e.target.dataset.point){bisDrag=e.target.dataset.point;e.target.setPointerCapture?.(e.pointerId);}});svg.addEventListener('pointermove',e=>{if(!bisDrag)return;const p=unmapPoint(pointerToSvg(svg,e)),x=snap(clamp(p.x,PLOT.xmin,PLOT.xmax)),y=snap(clamp(p.y,PLOT.ymin,PLOT.ymax));if(bisDrag==='A'){$('bisAx').value=x;$('bisAy').value=y;}else{$('bisBx').value=x;$('bisBy').value=y;}updateBisectorLab();});['pointerup','pointercancel','pointerleave'].forEach(type=>svg.addEventListener(type,e=>{if(type!=='pointerleave'||e.buttons===0)bisDrag='';}));updateBisectorLab();}

/* --------------------------------------------------------------------------
   Área del triángulo
   -------------------------------------------------------------------------- */
let triDrag=''; let triStep=0;
const triangleSteps=[
  `Tomamos como base \(\overline{AB}\): \[b=d(A,B)=\sqrt{(4-1)^2+(-1-2)^2}=\sqrt{18}=3\sqrt2.\]`,
  `La recta que pasa por \(A=(1,2)\) y \(B=(4,-1)\) tiene dirección \((3,-3)\) y ecuación: \[\boxed{L_{AB}:x+y-3=0}.\]`,
  `La altura es la distancia de \(C=(5,2)\) a \(L_{AB}\): \[h=\frac{|5+2-3|}{\sqrt{1^2+1^2}}=\frac4{\sqrt2}=2\sqrt2.\]`,
  `Finalmente: \[\mathcal A=\frac{b\,h}{2}=\frac{(3\sqrt2)(2\sqrt2)}2=\boxed{6\text{ unidades cuadradas}}.\]`
];
function updateTriangleLab(){
  const svg=$('triangleSvg');drawAxes(svg);const A={x:num($('triAx')),y:num($('triAy'))},B={x:num($('triBx')),y:num($('triBy'))},C={x:num($('triCx')),y:num($('triCy'))};
  const dx=B.x-A.x,dy=B.y-A.y,base=Math.hypot(dx,dy); if(base<EPS){$('triangleStatus').textContent='Base degenerada';$('triBaseValue').textContent='0';$('triHeightValue').textContent='—';$('triAreaValue').textContent='0';drawPoint(svg,A,'A=B','svg-point-main','A');drawPoint(svg,C,'C','svg-point-danger','C');return;}
  const a=A.y-B.y,b=B.x-A.x,c=A.x*B.y-B.x*A.y,signedVal=a*C.x+b*C.y+c,t=signedVal/(a*a+b*b),H={x:C.x-a*t,y:C.y-b*t},height=Math.abs(signedVal)/Math.hypot(a,b),area=base*height/2;
  drawLineFromPointDir(svg,A,{x:dx,y:dy},'svg-line-guide');const pa=mapPoint(A),pb=mapPoint(B),pc=mapPoint(C);svg.append(el('polygon',{points:`${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y}`,class:'svg-triangle'}));drawSegment(svg,A,B,'svg-segment-base');drawSegment(svg,C,H,'svg-segment-height');
  drawPoint(svg,H,'H','svg-point-foot');drawPoint(svg,A,'A','svg-point-main','A');drawPoint(svg,B,'B','svg-point-secondary','B');drawPoint(svg,C,'C','svg-point-danger','C');
  $('triangleStatus').textContent=area<EPS?'Puntos alineados':'Triángulo no degenerado';$('triBaseValue').textContent=fmt(base);$('triHeightValue').textContent=fmt(height);$('triAreaValue').textContent=fmt(area);
}
function updateTriangleStep(){ const content=$('triangleStepContent'),button=$('triangleNextStep'); if(triStep===0){content.innerHTML='<p class="step-placeholder">La resolución aparecerá paso a paso.</p>';button.textContent='Mostrar paso 1';}else{content.innerHTML=`<div class="step-item"><span class="step-number">${triStep}</span><div>${triangleSteps[triStep-1]}</div></div>`;button.textContent=triStep<triangleSteps.length?`Mostrar paso ${triStep+1}`:'Reiniciar resolución';}typeset(content);}
function initTriangleLab(){ ['triAx','triAy','triBx','triBy','triCx','triCy'].forEach(id=>$(id).addEventListener('input',updateTriangleLab));$('triangleReset').addEventListener('click',()=>{[['triAx',1],['triAy',2],['triBx',4],['triBy',-1],['triCx',5],['triCy',2]].forEach(([id,v])=>$(id).value=v);updateTriangleLab();});$('triangleNextStep').addEventListener('click',()=>{triStep=triStep>=triangleSteps.length?0:triStep+1;updateTriangleStep();});const svg=$('triangleSvg');svg.addEventListener('pointerdown',e=>{if(e.target.dataset.point){triDrag=e.target.dataset.point;e.target.setPointerCapture?.(e.pointerId);}});svg.addEventListener('pointermove',e=>{if(!triDrag)return;const p=unmapPoint(pointerToSvg(svg,e)),x=snap(clamp(p.x,PLOT.xmin,PLOT.xmax)),y=snap(clamp(p.y,PLOT.ymin,PLOT.ymax));$(`tri${triDrag}x`).value=x;$(`tri${triDrag}y`).value=y;updateTriangleLab();});['pointerup','pointercancel','pointerleave'].forEach(type=>svg.addEventListener(type,e=>{if(type!=='pointerleave'||e.buttons===0)triDrag='';}));updateTriangleLab();updateTriangleStep();}

/* --------------------------------------------------------------------------
   Applet petrolero
   -------------------------------------------------------------------------- */
function updateOilLab(){
  const svg=$('oilSvg'),plot={width:720,height:460,left:62,right:30,top:30,bottom:52,xmin:1,xmax:10,ymin:500,ymax:1020};drawAxes(svg,plot,1,100);
  const month=num($('oilMonth'),9),production=-50*month+1050;$('oilMonthValue').textContent=fmt(month,2);$('oilProduction').textContent=`${fmt(production)} bbl/d`;
  const p1=mapPoint({x:1,y:1000},plot),p2=mapPoint({x:10,y:550},plot);svg.append(el('line',{x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,class:'svg-oil-line'}));
  [{x:2,y:950,l:'(2,950)'},{x:7,y:700,l:'(7,700)'},{x:month,y:production,l:`P(${fmt(month)})`}].forEach(p=>{const q=mapPoint(p,plot);svg.append(el('circle',{cx:q.x,cy:q.y,r:7,class:'svg-oil-point'}),el('text',{x:q.x+10,y:q.y-10,class:'svg-point-label'},p.l));});
  const cur=mapPoint({x:month,y:production},plot),axis=mapPoint({x:month,y:plot.ymin},plot);svg.append(el('line',{x1:cur.x,y1:cur.y,x2:axis.x,y2:axis.y,class:'svg-oil-guide'}));
}
function initOilLab(){ $('oilMonth').addEventListener('input',updateOilLab);$('oilSolveTarget').addEventListener('click',()=>{const target=num($('oilTarget'),850),month=(1050-target)/50;$('oilOutput').innerHTML=`<p>\[-50x+1050=${fmt(target)}\quad\Longrightarrow\quad \boxed{x=${fmt(month)}}.\]</p>${month<1||month>10?'<p>El valor queda fuera del intervalo de modelización solicitado en el TP.</p>':''}`;typeset($('oilOutput'));});updateOilLab();}

/* --------------------------------------------------------------------------
   Resoluciones guiadas
   -------------------------------------------------------------------------- */
function openStepper(key){
  const data=steppers[key],mount=$('stepperMount'); if(!data)return; let index=0;
  mount.hidden=false; mount.innerHTML=`<article class="stepper-stage"><div class="stepper-header"><div><p class="kicker">${data.tag}</p><h3>${data.title}</h3></div><button class="button ghost" id="closeStepper" type="button">Cerrar</button></div><p class="stepper-intro">${data.intro}</p><div id="guidedStep" class="step-content"><p class="step-placeholder">Intentá plantear una estrategia antes de mostrar el primer paso.</p></div><div class="work-controls"><button class="button primary" id="nextGuidedStep" type="button">Mostrar paso 1</button><button class="button secondary" id="resetGuidedStep" type="button">Reiniciar</button></div></article>`;
  const render=()=>{const box=$('guidedStep');if(index===0)box.innerHTML='<p class="step-placeholder">Intentá plantear una estrategia antes de mostrar el primer paso.</p>';else box.innerHTML=`<div class="step-item"><span class="step-number">${index}</span><div>${data.steps[index-1]}</div></div>`;$('nextGuidedStep').textContent=index<data.steps.length?`Mostrar paso ${index+1}`:'Resolución completa ✓';$('nextGuidedStep').disabled=index>=data.steps.length;typeset(mount);};
  $('nextGuidedStep').addEventListener('click',()=>{if(index<data.steps.length)index++;render();if(index===data.steps.length&&data.complete){completed.add(data.complete);saveJson(STORAGE_KEY,[...completed]);updateProgress();}});$('resetGuidedStep').addEventListener('click',()=>{index=0;$('nextGuidedStep').disabled=false;render();});$('closeStepper').addEventListener('click',()=>{mount.hidden=true;});render();mount.scrollIntoView({behavior:'smooth',block:'start'});
}
function initSteppers(){document.querySelectorAll('.open-stepper').forEach(button=>button.addEventListener('click',()=>openStepper(button.dataset.stepper)));}

/* --------------------------------------------------------------------------
   Checklist TP
   -------------------------------------------------------------------------- */
function initChecklist(){
  const saved=new Set(loadJson(TP_STORAGE_KEY,[])),mount=$('tpChecklist');mount.innerHTML='';
  for(let i=1;i<=18;i++){const label=document.createElement('label');label.className='tp-check-item';label.innerHTML=`<input type="checkbox" value="${i}" ${saved.has(i)?'checked':''}><span><strong>Ejercicio ${i}</strong><small>${i<=3?'Formas y pertenencia':i<=6?'Parámetros y posiciones':i<=8?'Equidistancia':i<=11?'Ángulos':i<=16?'Distancias y áreas':'Haces de rectas'}</small></span>`;mount.append(label);}
  const update=()=>{const values=[...mount.querySelectorAll('input:checked')].map(x=>Number(x.value));saveJson(TP_STORAGE_KEY,values);$('tpProgressText').textContent=`${values.length}/18`;};mount.querySelectorAll('input').forEach(input=>input.addEventListener('change',update));update();
}

/* --------------------------------------------------------------------------
   Autoevaluación
   -------------------------------------------------------------------------- */
let currentQuiz = [];
function startQuiz() {
  currentQuiz = shuffle(quizBank).slice(0, 10);
  const form = $('quizForm');
  form.hidden = false;
  $('quizResult').hidden = true;
  form.innerHTML = currentQuiz.map((item, index) => `
    <article class="quiz-question-card" data-answer="${item.answer}">
      <fieldset>
        <legend>${index + 1}. ${item.q}</legend>
        ${renderChoiceCards(
          `q${index}`,
          item.options.map((label, value) => ({value, label})),
          `Opciones de la pregunta ${index + 1}`,
          'choice-cards--quiz'
        )}
      </fieldset>
    </article>`).join('') + `<button class="button primary" type="submit">Corregir autoevaluación</button>`;
  typeset(form);
}
function evaluateQuiz(event) {
  event.preventDefault();
  const form = $('quizForm');
  const cards = [...form.querySelectorAll('.quiz-question-card')];
  let score = 0;

  cards.forEach((card, index) => {
    const item = currentQuiz[index];
    const chosen = card.querySelector(`input[name="q${index}"]:checked`);
    const correct = Boolean(chosen) && Number(chosen.value) === item.answer;
    card.classList.toggle('correct', correct);
    card.classList.toggle('incorrect', !correct);
    clearChoiceState(card);
    markChoiceState(card, item.answer, chosen?.value ?? '', true);
    if (correct) score++;

    let explanation = card.querySelector('.quiz-explanation');
    if (!explanation) {
      explanation = document.createElement('div');
      explanation.className = 'quiz-explanation';
      card.append(explanation);
    }
    const status = correct ? 'Correcto' : chosen ? 'Revisá esta respuesta' : 'Sin responder';
    explanation.innerHTML = `<strong>${status}.</strong> ${item.exp}`;
  });

  const result = $('quizResult');
  result.hidden = false;
  result.innerHTML = `<div class="quiz-score">${score}/10</div><h3>${score >= 8 ? 'Muy buen dominio' : score >= 6 ? 'Buen avance' : 'Conviene revisar algunos módulos'}</h3><button class="button secondary" id="newQuiz" type="button">Generar otra evaluación</button>`;
  $('newQuiz').addEventListener('click', startQuiz);
  completed.add('autoevaluacion');
  saveJson(STORAGE_KEY, [...completed]);
  updateProgress();
  typeset(form);
  result.scrollIntoView({behavior: 'smooth', block: 'center'});
}
function initQuiz() {
  $('startQuiz').addEventListener('click', startQuiz);
  $('quizForm').addEventListener('submit', evaluateQuiz);
}

/* --------------------------------------------------------------------------
   Inicio
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded',()=>{
  initNavigation();initConverter();initLineBuilder();initPositionLab();initDistanceLab();initBisectorLab();initTriangleLab();initOilLab();initSteppers();initChecklist();initQuiz();
});
