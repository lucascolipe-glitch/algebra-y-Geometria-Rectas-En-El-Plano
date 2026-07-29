# Unidad 5 · Rectas en el plano

Página interactiva de **Álgebra y Geometría I — Ingeniería en Petróleo**, preparada para acompañar el estudio y la resolución del **TP 5 del recursado 2026**.

## Referencias didácticas

La práctica del recursado 2026 define el alcance, el orden de los temas, los datos de los ejercicios y las actividades principales. El apunte teórico completo, la resolución del TP y las presentaciones de clase se utilizan para explicar conceptos, reconstruir procedimientos y aportar gráficos.

## Contenidos

- Punto, vector director, vector normal, pendiente y ángulo de inclinación.
- Ecuaciones vectorial, paramétrica, cartesiana, punto–pendiente, explícita, implícita y segmentaria.
- Pertenencia, alineación y transformación entre formas.
- Paralelismo, coincidencia, perpendicularidad y posición relativa.
- Ángulo entre rectas.
- Distancia punto–recta y entre rectas paralelas.
- Proyección ortogonal y punto más cercano.
- Mediatriz como lugar geométrico de equidistancia.
- Área de un triángulo usando una base y la distancia del vértice opuesto a la recta base.
- Haces de rectas.
- Modelos lineales en Ingeniería en Petróleo.

## Actividades interactivas

- Conversor entre las formas de la ecuación de una recta.
- Constructor gráfico con punto y vector director arrastrables.
- Explorador de posiciones relativas y ángulo entre dos rectas.
- Laboratorio de distancia punto–recta con proyección ortogonal.
- Applet de mediatriz con extremos móviles.
- Applet de área de triángulos con los puntos `A`, `B` y `C` móviles; usa `AB` como base y la distancia de `C` a `L_AB` como altura.
- Modelo dinámico de producción de un pozo.
- Resoluciones progresivas de ejercicios seleccionados del TP 5.
- Lista de seguimiento de los 18 ejercicios.
- Autoevaluación aleatoria de diez preguntas.
- Guardado del progreso con `localStorage`.
- Impresión completa del recorrido.

## Estructura

```text
unidad-5-rectas-plano-github/
├── index.html
├── styles.css
├── app.js
├── README.md
├── manifest.webmanifest
├── .nojekyll
├── assets/
│   └── favicon.svg
└── materiales/
    ├── tp5-recursado-2026.pdf
    ├── tp5-recursado-2026.tex
    ├── teoria-rectas-plano.pdf
    ├── resolucion-tp5.pdf
    ├── resolucion-tp5.tex
    ├── clase-rectas-parte-1.ppsx
    ├── clase-rectas-parte-2.ppsx
    └── clase-rectas-parte-3.ppsx
```

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir **el contenido interior de esta carpeta** a la raíz del repositorio.
3. Abrir `Settings` → `Pages`.
4. En `Build and deployment`, elegir `Deploy from a branch`.
5. Seleccionar la rama `main` y la carpeta `/ (root)`.
6. Guardar y esperar a que GitHub muestre la dirección publicada.

No se necesita `package.json`, Node.js ni un servidor de aplicaciones.

## Probar localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000`.

## Dependencias externas

- **MathJax 3** desde CDN para las expresiones LaTeX.
- Videos incrustados mediante `youtube-nocookie.com`.

La teoría y las actividades básicas siguen funcionando sin servidor. Para ver MathJax y los videos es necesaria una conexión a Internet.
