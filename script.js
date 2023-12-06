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
      selectElement.length = 1;
      data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.productName;
        optionElement.value = option.productId;
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
      selectElement.length = 1;
      data.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.locationName;
        optionElement.value = option.locationId;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error(error));
}

function showModal(message) {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerText = message;
  modal.style.display = 'block';
}

function hideModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  fetchProductOptions();
  fetchLocationOptions();
  document.querySelector('#productSelect').addEventListener('change', function () {
    setSelection1(this.options[this.selectedIndex].innerText);
  });
  document.querySelector('#locationSelect').addEventListener('change', function () {
    setSelection2(this.options[this.selectedIndex].innerText);
  });

  const orderForm = document.querySelector('#orderForm');
  orderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(orderForm);
    fetch('insertOrder.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showModal(data.error);
      } else if (data.success) {
        showModal(data.success);
      }
    })
    .catch(error => {
      console.error(error);
      showModal("Failed to place order due to an error.");
    });
  });

  const closeButton = document.querySelector('.modal-close-button');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      hideModal();
    });
  }

  const modal = document.querySelector('.modal');
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      hideModal();
    }
  });
});
