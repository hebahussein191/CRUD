let ProductNameInp = document.getElementById("ProductNameInp"),
  ProductPriceInp = document.getElementById("ProductPriceInp"),
  ProductCategoryInp = document.getElementById("ProductCategoryInp"),
  ProductDescInp = document.getElementById("ProductDescInp"),
  BtnAdd = document.getElementById("BtnAdd"),
  ProductsContainer;
let currentIndex = 0;

// LocalStorage
if (localStorage.getItem("myProducts") == null) {
  ProductsContainer = [];
} else {
  ProductsContainer = JSON.parse(localStorage.getItem("myProducts"));

  displayProducts();
}

BtnAdd.addEventListener("click", function () {
  if (BtnAdd.innerHTML == "Add Product") {
    addProducts();
  } else {
    saveUpdate();
  }
});

// Add Products With Input

function addProducts() {
  // Alert Danger
  if (
    ProductNameInp.value == "" ||
    ProductPriceInp.value == "" ||
    ProductCategoryInp.value == "" ||
    ProductDescInp.value == ""
  ) {
    document.getElementById(
      "error"
    ).innerHTML = `<h3 class='text-center alert alert-danger display-5'>Please Fill All Fields</h3>`;
    return false;
  }

  let product = {
    name: ProductNameInp.value,
    price: ProductPriceInp.value,
    category: ProductCategoryInp.value,
    desc: ProductDescInp.value,
  };
  //console.log(product);

  ProductsContainer.push(product);
  //console.log(ProductsContainer);

  localStorage.setItem("myProducts", JSON.stringify(ProductsContainer));
  //console.log(localStorage);

  displayProducts();
  clearAllData();

  // Alert Success
  document.getElementById(
    "error"
  ).innerHTML = `<h3 class='text-center alert alert-success display-5'>Product Updated</h3>`;
}

// Save Products With Input

function saveUpdate() {
  let product = {
    name: ProductNameInp.value,
    price: ProductPriceInp.value,
    category: ProductCategoryInp.value,
    desc: ProductDescInp.value,
  };
  //console.log(product);

  ProductsContainer[currentIndex].index = product;
  //console.log(ProductsContainer);

  localStorage.setItem("myProducts", JSON.stringify(ProductsContainer));
  //console.log(localStorage);
  displayProducts();
  clearAllData();
  BtnAdd.innerHTML = "Add Product";
}

// Function Display Products With Table

function displayProducts() {
  let temp = ``;
  for (let i = 0; i < ProductsContainer.length; i++) {
    temp +=
      `<tr>
          <td scope="row">` +
      i +
      `</td>
          <td>` +
      ProductsContainer[i].name +
      `</td>
      <td>` +
      ProductsContainer[i].price +
      `</td>
          <td>` +
      ProductsContainer[i].category +
      `</td>
          <td>` +
      ProductsContainer[i].desc +
      `</td>
          <td><button onclick='updateProduct(` +
      i +
      `)' class='btn btn-info btn-sm'>Update</button></td>
          <td><button onclick='deleteProduct(` +
      i +
      `)' class='btn btn-danger btn-sm'>Delete</button></td> 
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = temp;
}

// Function Search Product

function searchProduct(term) {
  let temp = ``;

  for (let i = 0; i < ProductsContainer.length; i++) {
    if (
      ProductsContainer[i].name.toLowerCase().includes(term.toLowerCase()) ||
      ProductsContainer[i].category
        .toLowerCase()
        .includes(term.toLowerCase()) ||
      ProductsContainer[i].price.includes(term)
    ) {
      temp +=
        `<tr>
          <td scope="row">` +
        i +
        `</td>
          <td>` +
        ProductsContainer[i].name +
        `</td>
      <td>` +
        ProductsContainer[i].price +
        `</td>
          <td>` +
        ProductsContainer[i].category +
        `</td>
          <td>` +
        ProductsContainer[i].desc +
        `</td>
          <td><button class='btn btn-info btn-sm'>Update</button></td>
          <td><button onclick='deleteProduct(` +
        i +
        `)' class='btn btn-danger btn-sm'>Delete</button></td> 
      </tr>`;
    }
    document.getElementById("tableBody").innerHTML = temp;
  }
}

// Function Update Index

function updateProduct(index) {
  currentIndex = index;
  ProductNameInp.value = ProductsContainer[index].name;
  ProductPriceInp.value = ProductsContainer[index].price;
  ProductCategoryInp.value = ProductsContainer[index].category;
  ProductDescInp.value = ProductsContainer[index].desc;
  BtnAdd.innerHTML = "Update Product";
}

// Function Delete Index

function deleteProduct(index) {
  ProductsContainer.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(ProductsContainer));
  //console.log(localStorage);

  displayProducts();
}

// Function Clear All Data

function clearAllData() {
  ProductNameInp.value = "";
  ProductPriceInp.value = "";
  ProductCategoryInp.value = "";
  ProductDescInp.value = "";
}
