const btn = document.querySelector('button');
const imgs = document.querySelectorAll('.imgContainer');
let _filename = null;

imgs.forEach((img) => {
  img.addEventListener('click', (event) => {
    imgs.forEach((img) => img.classList.remove('active')); 
    event.currentTarget.classList.toggle('active');
    _filename = event.currentTarget.getAttribute('data-filename');
    document.querySelector('.chosenImg span').textContent = _filename;
  });
});

btn.addEventListener('click', (e) => {
  const width = parseInt(document.querySelector('.width').value);
  const height = parseInt(document.querySelector('.height').value);
  
  if (!_filename) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<p>Why do I have this issue?</p><br/> <p class="error">❌ Please select an image to resize.</p>',
    });
    return;
  }
  
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<p>Why do I have this issue?</p><br/> <p class="error">❌ Please enter valid width and height (positive numbers).</p>',
    });
    return;
  }
  
  if (width > 500 || height > 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<p>Why do I have this issue?</p><br/> <p class="error">❌ The height and width must be under 500.</p>',
    });
    return;
  }
  
  resizeImage(_filename, width, height);
});

async function resizeImage(filename, width, height) {
  try {
    const url = `http://localhost:3000/api/images/resize?filename=${encodeURIComponent(filename)}&width=${width}&height=${height}`;
    
    // Show success message
    await Swal.fire({
      title: 'Processing your image...',
      icon: 'info',
      timer: 2000,
      showConfirmButton: false
    });
    

    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Resized Image';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    img.onload = () => {
      Swal.fire({
        title: 'The image was resized successfully!',
        icon: 'success',
        draggable: true,
      });
      resultDiv.appendChild(img);
    };
    
    img.onerror = () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load resized image.",
        footer: '<p>Please check your parameters and try again.</p>',
      });
      resultDiv.innerHTML = '<p class="error">❌ Failed to load resized image.</p>';
    };
    
  } catch (error) {
    console.error('Error resizing image:', error);
    Swal.fire({ 
      icon: "error",
      title: "Oops...",
      text: "An error occurred while processing your request.",
    });
  }
}
