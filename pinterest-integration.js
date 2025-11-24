// pinterest-integration.js

// Load Pinterest SDK asynchronously
(function(d){
  var f = d.getElementsByTagName('script')[0],
      s = d.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://assets.pinterest.com/js/pinit.js';
  f.parentNode.insertBefore(s, f);
})(document);

// Function to add a Pinterest Save button to a specific element
function addPinterestSaveButton(options) {
  const {
    url = window.location.href,
    media = '',
    description = '',
    containerId = ''
  } = options;

  const container = document.getElementById(containerId);
  if (!container) return;

  // Remove previous button if exists
  const prevBtn = container.querySelector('.pinterest-save-btn');
  if (prevBtn) prevBtn.remove();

  // Create Pinterest Save button
  const btn = document.createElement('a');
  btn.setAttribute('href', `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(description)}`);
  btn.setAttribute('data-pin-do', 'buttonPin');
  btn.setAttribute('data-pin-custom', 'true');
  btn.className = 'pinterest-save-btn';
  btn.innerHTML = '<img src="https://assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_20.png" alt="Pin it" />';

  container.appendChild(btn);

  // Re-initialize Pinterest SDK to render the button
  if (window.PinUtils && typeof window.PinUtils.build === 'function') {
    window.PinUtils.build();
  }
}


window.addPinterestSaveButton = addPinterestSaveButton;