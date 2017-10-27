var bigImg = document.querySelector('.bigImg');
var thumbnails = document.querySelector('.thumbnails');
var btn = document.getElementById('bgLight');

// fill the thumbnails div
for (var i = 1; i <= 5; i++) {
  // add thumbnails
  var smallImg = document.createElement('img');
  smallImg.setAttribute('src', 'images/pic' + i + '.jpg');
  thumbnails.appendChild(smallImg);
  // add event handler to thumbnails
  smallImg.onclick = function(e){
    var smallImgSrc = e.target.getAttribute('src');
    bigImg.setAttribute('src', smallImgSrc);
  }
}

// make the background dark or light - button
btn.onclick = function() {
  if (btn.getAttribute('class') === 'dark') {
    document.body.style.backgroundColor = 'rgba(0,0,0,0.6)';
    btn.setAttribute('class', 'light');
    btn.textContent = 'Make the background light';
  } else {
    document.body.style.backgroundColor = 'rgba(0,0,0,0)';
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Make the background dark';
  }
}
