const btn = document.querySelector('button');
const imgs = document.querySelectorAll('.imgContainer');
let _filename = null;

// Image selection handler
imgs.forEach((img) => {
  img.addEventListener('click', (event) => {
    imgs.forEach((img) => img.classList.remove('active')); 
    event.currentTarget.classList.toggle('active');
    _filename = event.currentTarget.getAttribute('data-filename');
    document.querySelector('.chosenImg span').textContent = _filename;
  });
});

btn.addEventListener('click', (e) => {
  if (!_filename) {
    alert('Please select an image first.');
    return;
  }
  resizeImage(_filename);
});

async function resizeImage(filename) {
  const width = document.querySelector('.width').value;
  const height = document.querySelector('.height').value;

  if (!width || !height) {
    alert('Please enter both width and height.');
    return;
  }

  try {
    const url = `http://localhost:3000/api/images/resize?filename=${encodeURIComponent(filename)}&width=${width}&height=${height}`;
    Swal.fire({
      title: 'The image saved successfully!',
      icon: 'success',
      draggable: true,
    });
    // Create image element
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Resized Image';
      img.style.maxWidth = '100%'; 
      img.style.height = 'auto'; 
    }, 2000); 
    img.onerror = () => {
      resultDiv.innerHTML =
        '<p class="error">❌ Failed to load resized image. Please check your parameters.</p>';
    };
  } catch (error) {
    console.error('Error resizing image:', error);
    document.getElementById('result').innerHTML =
      '<p class="error">❌ An error occurred while processing your request.</p>';
  }
}
