
function setSelection1(value) {
  const selection1 = document.querySelector(".selection1");
  selection1.innerText = value;
}

function setSelection2(value) {
  const selection2 = document.querySelector(".selection2");
  selection2.innerText = value;
}

function fetchProductOptions() {
  fetch('product.php')
    .then(response => response.json())
    .then(data => {
      const selectElement = document.querySelector('#productSelect');
      selectElement.length = 1; // Clear existing options except for the first
      data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.productName;
        optionElement.value = option.productId; // Set value to option.productId
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error(error));
}

function fetchLocationOptions() {
  fetch('location.php')
    .then(response => response.json())
    .then(data => {
      const selectElement = document.querySelector('#locationSelect');
      selectElement.length = 1; // Clear existing options except for the first
      data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.locationName;
        optionElement.value = option.locationId; // Set value to option.locationId
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', function () {
  fetchProductOptions();
  fetchLocationOptions();

  document.querySelector('#productSelect').addEventListener('change', function () {
    // Use the selected option text (productName) instead of its value (productId)
    setSelection1(this.options[this.selectedIndex].innerText);
  });

  document.querySelector('#locationSelect').addEventListener('change', function () {
    // Use the selected option text (locationName) instead of its value (locationId)
    setSelection2(this.options[this.selectedIndex].innerText);
  });
});
