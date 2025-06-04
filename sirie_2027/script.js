// Menu hamburguesa toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Cargar capítulos desde JSON 
fetch('capitulos.json')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('capitulos');
    
    // Solo tomar los primeros 3 capítulos
    const capitulosLimitados = data.capitulos.slice(0, 6);

    capitulosLimitados.forEach(cap => {
      const card = document.createElement('div');
      card.className = 'card';
      card.onclick = () => window.location.href = `serie.html?cap=${cap.id}`;
      card.innerHTML = `
        <img src="${cap.thumbnail || 'img/default.png'}" alt="${cap.titulo}">
        <div class="info">
          <h3>${cap.titulo}</h3>
          <p>${cap.descripcion}</p>
        </div>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch(err => console.error('Error cargando capítulos:', err));