// --------------------- Global Data 
var productNameInput = document.getElementById("productName"); //Input kolo
var productPriceInput = document.getElementById("productPrice"); //Input kolo
var productCategoryInput = document.getElementById("productCategory"); //Input kolo
var productDescriptionInput = document.getElementById("productDescription"); //Input kolo

var searchInput = document.getElementById("searchInput");

var updateBtn = document.getElementById("updateBtn"); //
var addBtn = document.getElementById("addBtn"); //

var indexUpdate = 0;

var productContainer = []; // {} {}

///  true found data in local
if (localStorage.getItem("products") != null) {
///  false not found data in local -- and don't do any thing
   productContainer = JSON.parse(localStorage.getItem("products"));
   displayData();
}


// ------------------ Functions 

function addProduct() {
   //function scope - local
   var product = {
      name: productNameInput.value, //ahmed
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescriptionInput.value,
   };
   //object product

   productContainer.push(product);

   localStorage.setItem("products", JSON.stringify(productContainer));

   displayData();

   clearForm();
}

function clearForm() {
   productNameInput.value = "";
   productPriceInput.value = "";
   productCategoryInput.value = "";
   productDescriptionInput.value = "";
}

function displayData() {
   var cartona = "";
   for (var i = 0; i < productContainer.length; i++) {
      cartona += `
        <tr>
        <td>  ${productContainer[i].name}  </td>
        <td> ${productContainer[i].price} </td>
        <td> ${productContainer[i].category} </td>
        <td> ${productContainer[i].desc} </td>
        <td>
           <button class="btn btn-outline-warning btn-sm fs-6" onclick="setData(${i})"  >
           Update
           <i class="fa-solid fa-edit"></i>

           </button>


      

           <button class="btn btn-outline-danger btn-sm fs-6" onclick="deleteProduct(${i})" >
           
           Delete
           <i class="fa-solid fa-trash"></i>

           </button>
        </td>
     </tr>


        `;
   }

   document.getElementById("tableData").innerHTML = cartona;
}

function deleteProduct(elementNumber) {
   productContainer.splice(elementNumber, 1); //[]

   localStorage.setItem("products", JSON.stringify(productContainer));

   displayData();
}

function searchProduct() {
   var term = searchInput.value;

   var cartona = "";
   for (var i = 0; i < productContainer.length; i++) {
      if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
         cartona += `
                    <tr>
                    <td>  ${productContainer[i].name}  </td>
                    <td> ${productContainer[i].price} </td>
                    <td> ${productContainer[i].category} </td>
                    <td> ${productContainer[i].desc} </td>
                    <td>
                        <button class="btn btn-outline-warning btn-sm">Update</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})" >Delete</button>
                    </td>
                </tr>
            
            
                    `;
      }
   }

   document.getElementById("tableData").innerHTML = cartona;
}

function setData(index) {
   //index ===

   indexUpdate = index;

   var curentProduct = productContainer[index]; //

   productNameInput.value = curentProduct.name;
   productPriceInput.value = curentProduct.price;
   productCategoryInput.value = curentProduct.category;
   productDescriptionInput.value = curentProduct.desc;

   updateBtn.classList.remove("d-none");
   addBtn.classList.add("d-none");
}

function updateProduct() {
   var product = {
      name: productNameInput.value, //ahmed
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescriptionInput.value,
   };

   //                               0
   productContainer.splice(indexUpdate, 1, product);

   localStorage.setItem("products", JSON.stringify(productContainer));
   displayData();

   updateBtn.classList.add("d-none");
   addBtn.classList.remove("d-none");

   clearForm();
}
