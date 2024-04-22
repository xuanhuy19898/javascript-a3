/*Xuan Huy Pham / 000899551*/

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('container');
  const randomButton = document.getElementById('random-button');
  const refreshTime = document.getElementById('refresh-time');
  const countdown = document.getElementById('countdown');
  const imageCounter = document.getElementById('image-counter');
  
  //this constant contains all 9 images
  const images = [
    ['images/1.png', 'images/2.png', 'images/3.png'],
    ['images/4.png', 'images/5.png', 'images/6.png'],
    ['images/7.png', 'images/8.png', 'images/9.png']
  ];
  
  let imageChangeCount = 0;
  let refreshTimeout;
    
  
  //this function is to select and display random images
  function displayRandomImages() {
    //create a new array, each element in this array represents a randomly selected image from its category
    const randomImages = images.map(category => { 
      const randomIndex = Math.floor(Math.random() * category.length);
      return category[randomIndex];
    });
  
    //retrieve all 'img' elements within the 'imageContainer', selecting elements by their tag name
    //set 'src' attribute of each 'img' to the corresponding image link from 'randomImages' array.
    const imageTags = container.getElementsByTagName('img');
    for (let i = 0; i < imageTags.length; i++) {
      imageTags[i].src = randomImages[i];
    }
  
    //increment 'imageChangeCount' by 3 to track the total number of image updates
    imageChangeCount += 3;
    imageCounter.textContent = `Images Updated: ${imageChangeCount}`;
    resetCountdown();
  }


  //this function is to process image click
  function processImageClick(event) {
    const target = event.target;
    //check if the clicked element is an image, if it is, apply animation to it
    if (target.tagName === 'IMG') {
        do_animation(event);

        //select a random image from a random category
        const randomCategory = Math.floor(Math.random() * images.length);
        const randomIndex = Math.floor(Math.random() * images[randomCategory].length);
        target.src = images[randomCategory][randomIndex];
        imageChangeCount++;//increment the image change count
        imageCounter.textContent = `Images Updated: ${imageChangeCount}`;
        resetCountdown();
    }
  }

  //this function is to handle animation
  function do_animation(event) {
    const target = event.srcElement;
    target.classList.remove('spin');
    setTimeout(() => {
        target.classList.add('spin');
    }, 0);
  }

  
  //this function is to start countdown timer
  function startCountdown() {
    let time = parseInt(refreshTime.value);
    //check if time is within valid range
    if (time < 500 || time > 10000 || isNaN(time)) {
      return;
    }
  
    updateCountdownDisplay(time, 'green', 'white');
    refreshTimeout = setInterval(updateCountdown, 100);//start the countdown interval

    function updateCountdown() {
      time -= 100;
      updateCountdownDisplay(time);
      //toggle countdown color if time is within specified range
      if (time <= 2500 && time % 500 === 0) {
        toggleCountdownColor();
      }
      //end countdown and display random images if time is up
      if (time <= 0) {
        clearInterval(refreshTimeout);
        displayRandomImages();
      }
    }
  }

  //this function to update countdown display
  function updateCountdownDisplay(time, backgroundColor = null, color = null) {
    countdown.textContent = (time / 1000).toFixed(1);
    if (backgroundColor) {
      countdown.style.backgroundColor = backgroundColor;
    }
    if (color) {
      countdown.style.color = color;
    }
  }

  //this function to toggle countdown color
  function toggleCountdownColor() {
    const currentColor = countdown.style.color || 'white';
    if (currentColor === 'white') {
      updateCountdownDisplay(null, 'yellow', 'black');
    } else if (currentColor === 'black') {
      updateCountdownDisplay(null, 'red', 'black');
    } else {
      updateCountdownDisplay(null, 'green', 'black');
    }
  }

  //this function to reset countdown timer
  function resetCountdown() {
    clearInterval(refreshTimeout);
    startCountdown();
  }

  displayRandomImages();
  container.addEventListener('click', processImageClick);
  randomButton.addEventListener('click', displayRandomImages);
  refreshTime.addEventListener('change', startCountdown);

});
  