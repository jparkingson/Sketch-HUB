window.addEventListener('DOMContentLoaded', () => {
    fetch('/etiquetas')
      .then(response => response.json())
      .then(etiquetas => {
        console.log(JSON.stringify(etiquetas)); // Mostrar el valor del objeto etiquetas
        const etiquetasContainer = document.querySelector('.etiquetas-container');
        const etiquetasValues = Object.values(etiquetas); // Obtener los valores del objeto
        const etiquetasText = etiquetasValues.join(' '); // Unir los valores en una cadena separada por comas
        const etiquetasElement = document.createElement('h3');
        etiquetasElement.textContent = etiquetasText;
        etiquetasContainer.appendChild(etiquetasElement);

      })
      .catch(error => {
        console.error('Error al obtener las etiquetas:', error);
      });
  });

