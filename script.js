function setSelection2(value) {
  const selection2 = document.querySelector(".selection2");
  selection2.innerText = value;
}
function setSelection1(value) {
  const selection1 = document.querySelector(".selection1");
  selection1.innerText = value;
}
function fetchProductOptions() {
  fetch('product.php')
    .then(response => response.json())
    .then(data => {
      const selectElement = document.querySelector('.box select'); // Clear the existing options
      data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.productName;
        optionElement.value = option.productName;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error(error));
}
fetchProductOptions();

function fetchLocationOptions() {
  fetch('location.php')
    .then(response => response.json())
    .then(data => {
      const selectElement = document.querySelector('.box2 select'); // Clear the existing options
      data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.locationName;
        optionElement.value = option.locationName;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error(error));
}
fetchLocationOptions();