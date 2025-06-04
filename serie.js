function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

fetch('capitulos.json')
  .then(res => res.json())
  .then(data => {
    const capParam = getQueryParam('cap');
    const capId = parseInt(capParam, 10);

    if (isNaN(capId)) {
      alert('Capítulo inválido');
      window.location.href = 'index.html';
      return;
    }

    const capitulo = data.capitulos.find(c => c.id === capId);
    if (!capitulo) {
      alert('Capítulo no encontrado');
      window.location.href = 'index.html';
      return;
    }

    // Mostrar título y descripción
    document.getElementById('titulo-capitulo').textContent = capitulo.titulo;
    document.getElementById('descripcion-capitulo').textContent = capitulo.descripcion;

    // Mostrar video en iframe
    const iframe = document.getElementById('videoFrame');
    let videoUrl = capitulo.videoUrl;

    if (videoUrl.includes("uc?export=download&id=")) {
      const id = videoUrl.split("id=")[1];
      videoUrl = `https://drive.google.com/file/d/${id}/preview`;
    }

    iframe.src = videoUrl;

    // Navegación entre capítulos
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    const index = data.capitulos.findIndex(c => c.id === capId);
    if (index > 0) {
      prevBtn.style.display = 'inline-block';
      prevBtn.onclick = () => {
        window.location.href = `serie.html?cap=${data.capitulos[index - 1].id}`;
      };
    }

    if (index < data.capitulos.length - 1) {
      nextBtn.style.display = 'inline-block';
      nextBtn.onclick = () => {
        window.location.href = `serie.html?cap=${data.capitulos[index + 1].id}`;
      };
    }

    // Recomendaciones
    const contenedor = document.getElementById('recomendaciones');
    data.capitulos
      .filter(c => c.id !== capId)
      .forEach(c => {
        const div = document.createElement('div');
        div.className = 'recomendacion';

        div.innerHTML = `
          <img src="${c.thumbnail}" alt="${c.titulo}" />
          <h4>${c.titulo}</h4>
          <p>${c.descripcion}</p>
          <button onclick="location.href='serie.html?cap=${c.id}'">Ver capítulo</button>
        `;
        contenedor.appendChild(div);
      });
  })
  .catch(err => {
    console.error('Error cargando capítulos:', err);
    alert('Error cargando el capítulo');
    window.location.href = 'index.html';
  });
