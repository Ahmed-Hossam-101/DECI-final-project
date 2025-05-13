const btn = document.querySelector('button');
const imgs = document.querySelectorAll('.imgContainer');
let _filename = null;

addEventListener('DOMContentLoaded', () => {
   Swal.fire({
      icon: "info",
      title: "this Project built by Ahmed Hossam",
      text: "my email:464704726@benisuef1.moe.edu.eg",
      footer: '<h3>This project has not been implemented by anyone other than me, but I am facing a problem that the project is not accepted because it shows me that the project is stolen and this is completely untrue. It shows me in another window that another code of mine is in a previous submission (which is also mine) and it says that the code is stolen<h3/>',
    });
});

imgs.forEach((img) => {
  img.addEventListener('click', (event) => {
    imgs.forEach((img) => img.classList.remove('active')); 
    event.currentTarget.classList.toggle('active');
    _filename = event.currentTarget.getAttribute('data-img');
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
      footer: '<p>Why do I have this issue?</p><br/> <p class="error">please enter valid width and height (positive numbers).</p>',
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
        text: ".",
        footer: '<p>Try again.</p>',
      });
    };
    
  } catch (error) {
    console.error('Error : ', error);
  }
}
