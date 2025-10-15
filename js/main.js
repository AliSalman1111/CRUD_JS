var ProductName=document.getElementById("ProductName");
var ProductPrice=document.getElementById("ProductPrice");
var ProductCategory=document.getElementById("ProductCategory");
var ProductDescription=document.getElementById("ProductDescription");
var ProductImage=document.getElementById("ProductImage");

console.log(ProductName);
var addbtn=document.getElementById("addbtn");
var updatebtn=document.getElementById("updatebtn");
var updateIndex;
var products=[];


if(localStorage.getItem("products")){
products=JSON.parse(localStorage.getItem("products"))
display(products)
}

function addproduct(){

if( IsProductValid(productRegex.productname,ProductName) && IsProductValid(productRegex.productprice,ProductPrice) && IsProductimageValid() ){
  console.log(ProductImage.files[0]);

    var product={
name:ProductName.value,
price :ProductPrice.value,  
category:ProductCategory.value,
description:ProductDescription.value,
image: ProductImage.files[0]?.name,




}

products.push(product);

localStorage.setItem("products",JSON.stringify(products));
console.log(products)

display(products);
//console.log(products);

ResetAllInput();
}
else{
  alert("enter vaild data")
}
}

function ResetAllInput() {
    ProductName.value="";

      ProductPrice.value="";

        ProductCategory.value="";
          ProductDescription.value="";
            ProductImage.value="";

 ProductName.classList.remove("is-valid","is-invalid");
 ProductImage.classList.remove("is-valid","is-invalid");
  ProductPrice.classList.remove("is-valid","is-invalid");
}



function display(targetlist) {


    var cartona ="";

    for (var i = 0; i < targetlist.length; i++) {
       cartona += `
       
       
         <div class="col-md-6 col-lg-4 col-xl-3">
<div class="card my-5" >

<div class="img">  <img src="./images/${targetlist[i].image}"  style="width: 100% ;height:300px;" class="card-img-top" alt="..."></div>
  <div class="card-body"> 
    <h5 class="card-title">${targetlist[i].name}</h5>
    <p class="card-text"> ${targetlist[i].description}</p>
     <h5 class="card-title h6"><span class="fw-bold">category :</span> ${targetlist[i].category}</h5>
       <h5 class="card-title h6"><span class="fw-bold">Price :</span> ${targetlist[i].price} ENG</h5>
  </div>
  <div class="card-footer text-body-secondary">
 <button onclick="ReturnAllDataToInput( ${ targetlist.length < products.length ? targetlist[i].oldindex : i })" class="btn btn-warning me-3" >Update </button>
  <button onclick="deleteprodect( ${ targetlist.length < products.length ? targetlist[i].oldindex : i })" class="btn btn-danger"> Delete</button>
  </div>

</div>


  </div>

       `

    }


    document.getElementById("item").innerHTML=cartona;
    
}


function deleteprodect(index) {

    products.splice(index,1);

    localStorage.setItem("products",JSON.stringify(products));
    display(products);
}

function search(searchInput){
var searchList=[]
  var searchValue=searchInput.value;
   

    for (var i = 0; i < products.length; i++) {
  if(products[i].name.toLowerCase().includes(searchValue.toLowerCase())){

    products[i].oldindex=i;
    searchList.push(products[i]);
   
  }

    }
console.log(searchList)
display(searchList);
  

}


function ReturnAllDataToInput(index) {

updateIndex=index;
     ProductName.value=products[index].name;

      ProductPrice.value=products[index].price;

        ProductCategory.value=products[index].category;
          ProductDescription.value=products[index].description;
          //  ProductImage.value="";


          addbtn.classList.add("d-none")
          updatebtn.classList.remove("d-none")
}



function updateproduct() {
  
products[updateIndex].name=ProductName.value;
products[updateIndex].category=ProductCategory.value;

products[updateIndex].price=ProductPrice.value;
products[updateIndex].description=ProductDescription.value;

if(ProductImage.files.length>0){

  products[updateIndex].image=ProductImage.files[0]?.name
}

 addbtn.classList.remove("d-none")
  updatebtn.classList.add("d-none")
//products[updateIndex].name=ProductName.value;

localStorage.setItem("products",JSON.stringify(products));
console.log(products)

display(products);

ResetAllInput();



}







var productRegex ={

  productprice: /^[1-9][0-9]{2,6}$/,

   productname: /^[A-Z][\sa-z0-9_]{2,}$/


}

function IsProductValid(regex,productInput) {

  //var regex=/^[1-9][0-9]{2,6}$/;

  if(  regex.test(productInput.value)  ){

   productInput.classList.add("is-valid")
  productInput.classList.remove("is-invalid")

  return true;
  }
     else{

  productInput.classList.add("is-invalid")
  productInput.classList.remove("is-valid")
  return false;
    }
}


function IsProductimageValid() {

  //var regex=/^[1-9][0-9]{2,6}$/;

  if( ProductImage.files.length>0 )  {
   


  return true;
  }
     else{

            alert("enter image")

  return false;
    }
}