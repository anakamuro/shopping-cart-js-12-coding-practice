// let cart = []
// let item = {name: "Apple", cost: 1.99, count: 2}

// // for (let key in obj){
// //     console.log(key+" "+obj[key])
// // }
// cart.push(item)

// console.log(cart[0])

// function myFunction(message, count){
//     for(let i=0; i < count ; i++){
//         console.log(message)
//     }
// }
// myFunction("Hello World", 1);
// myFunction("FooBar", 5)
// myFunction("AAA", 3)
// myFunction("BBB", 3)

// let a = new Item("Aki", 3.99, 1)
// cart.push( new Item("Apple", 2.13, 1))
// cart.push(a)
// console.log(cart)

// let array = listCart()
// console.log(array)

 $(".add-to-cart").click(function(){
    event.preventDefault()
    let name = $(this).attr("data-name");
    let price  = Number($(this).attr("data-price"));

    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
 })

 $("#clear-cart").click(function(event){
    shoppingCart.clearCart();
    shoppingCart.displayCart();
 })

 function displayCart(){
    let cartArray = shoppingCart.listCart()
    let output = ""
    for( let i in cartArray){
     output += "<li>"
     +cartArray[i].name
     + " <input class='item-count' type='number' data-name='"
     +cartArray[i].name+
     "' value='"+cartArray[i].count+"' >"
     +" x "+cartArray[i].price
     +" = "+cartArray[i].total
     +" <button class='plus-item' data-name='"
     +cartArray[i].name+"'>+</button>"
     +" <button class='subtract-item' data-name='"
     +cartArray[i].name+"'>-</button>"
     +" <button class='delete-item' data-name='"
     +cartArray[i].name+"'>X</button>"
     +"</li>";
    }
    $("#show-cart").html(output)
    $("#count-cart").html(shoppingCart.countCart())
    $("#total-cart").html(shoppingCart.totalCart())
 }

$("#show-cart").on("click", ".delete-item", function(event){
    let name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
   });
  
   $("#show-cart").on("click", ".subtract-item", function(event){
      let name = $(this).attr("data-name");
      shoppingCart.removeItemFromCart(name);
      displayCart();
   });
  
   $("#show-cart").on("click", ".plus-item", function(event){
      let name = $(this).attr("data-name");
      shoppingCart.addItemToCart(name, 0, 1);
      displayCart();
   });

   $("#show-cart").on("click", ".item-count", function(event){
    let name = $(this).attr("data-name");
    let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
 });


let shoppingCart = (function(){
    // Private methods and properties
    let cart = [];

    function saveCart(){
        localStorage.setItem("shoppingCart", JSON.stringify(cart))
    }

    function loadCart(){
        cart = JSON.parse(localStorage.getItem('shoppingCart'))
    }

    loadCart();

     function Item(name, price, count){
        this.name = name
        this.price = price
        this.count = count
    }

    //Public methods and properties
    let obj = {};

    obj.addItemToCart = function (name, price, count){
        for (let i in cart){
            if(cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }
        let item = new Item(name, price, count);
        cart.push(item)
        saveCart()
    };

    obj.setCountForItem = function(name, count){
        for (let i in cart){
         if(cart[i].name === name){
             cart[i].count = count;
             break;
         }
        }
        saveCart()
     };

     obj.removeItemFromCart = function(name){
        for (let i in cart){
            if(cart[i].name === name) {
                cart[i].count-- ;
                if(cart[i].count === 0) {
                   cart.splice(i, 1)
                }
                break;
            }
        }
        saveCart()
    }

    obj.removeItemFromCartAll = function(name){
        for (let i in cart){
            if(cart[i].name === name){
                cart.splice(i, 1)
                break;
            }
        }
        saveCart()
      }

      obj.clearCart = function(){
        cart = [];
        this.saveCart();
      }

      obj.countCart = function(){
        let totalCount = 0;
        for( let i in cart){
          totalCount += cart[i].count;
        }
        return totalCount;
      }

      obj.totalCart = function(){
        let totalCost = 0;
        for(let i in cart){
            totalCost += cart[i].price * cart[i].count;
            n = totalCost.toFixed(2);
        }
        return n
      }

      obj.listCart =function(){
        let cartCopy = [];
        for(let i in cart){
            let item = cart[i];
            let itemCopy = {};
            for (let p in item){
                itemCopy[p] = item[p]
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
      }

    return obj
})();

displayCart();

// addItemToCart("Apple", 1.22, 1)
// addItemToCart("Pear", 1.72, 3)
// addItemToCart("Apple", 1.22, 1)
// addItemToCart("Apple", 1.22, 3)
// addItemToCart("Banana", 1.00, 1)
// addItemToCart("Car", 34.00, 1)
// addItemToCart("Plush Toy", 5.82, 1)
// addItemToCart("Sticky Notes", 4.00, 3)
// removeItemFromCartAll("Car")

console.log("shopping cart: cart")
console.log(shoppingCart.cart);


 

