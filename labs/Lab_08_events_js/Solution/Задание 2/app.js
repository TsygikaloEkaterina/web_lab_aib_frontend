 document.addEventListener("DOMContentLoaded", function() {
     const colorArea = document.getElementById("color-area");
     const redInput = document.getElementById("red");
     const greenInput = document.getElementById("green");
     const blueInput = document.getElementById("blue");

     function isValidNumber(colorInt)
     {
       if (colorInt>255){
         alert("Код цвета не должен превышать 255!")
         return false;
       }
     return true;
     }

       function changeColor() {
           const red = parseInt(redInput.value) || 0;
           const green = parseInt(greenInput.value) || 0;
           const blue = parseInt(blueInput.value) || 0;
           if (isValidNumber(red) &&
           isValidNumber(green) &&
           isValidNumber(blue)){
            colorArea.style.backgroundColor =
            `rgb(${red}, ${green}, ${blue})`;
           }
       }

    redInput.addEventListener("input", changeColor);
     greenInput.addEventListener("input", changeColor);
     blueInput.addEventListener("input", changeColor);

   });