
   function changeText () {
    //document.getElementById("c1").innerHTML= "Paid";
    //document.getElementById("c2").innerHTML= "Paid";
    //document.getElementById("c3").innerHTML= "Paid";
    //document.getElementById("c4").innerHTML= "Paid";

    // let checkBox1 =document.getElementById("checkBox1");
    // let checkBox2 =document.getElementById("checkBox2");
    //let checkboxes =[];
    // checkbox.push( document.getElementById("checkBox1"));
    // checkbox.push((document.getElementById("checkBox2")),(document.getElementById("c2").innerHTML= "Paid"));
    // checkbox.push( document.getElementById("checkBox3"));
    // checkbox.push(document.getElementById("checkBox4"));

  for (let index = 1; index <5; index++) {
    if (document.getElementById("checkBox"+index.toString()).checked==true)
    {
      document.getElementById("c"+index.toString()).innerHTML="Paid";
      document.getElementById("checkBox"+index.toString()).disabled=true;

    }
    document.getElementById("sub_total").innerHTML="$ 0"
  }

    

  }
  function initPayPalButton() {
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'gold',
        layout: 'horizontal',
        label: 'paypal',
        tagline: false
        
      },

      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{"amount":{"currency_code":"USD","value":1400}}]
        });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
          const element = document.getElementById('paypal-button-container');
          element.innerHTML = '';
          element.innerHTML = '<h3>Thank you for your payment!</h3>';
          
        });
      },

      onError: function(err) {
        console.log(err);
      }
    }).render('#paypal-button-container');
  }
  initPayPalButton();

var form = document.getElementById("cards"),
    checkboxes = form.getElementsByTagName("input"),
    subtotal = document.getElementById("sub_total");
for(var i = 0; i <= checkboxes.length; i++){
    checkboxes[i].onchange = function(){
      var newsub_total = 0.0;
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            newsub_total += parseInt(checkboxes[i].value);
        }
    }
    subtotal.innerHTML = "$" + newsub_total.toFixed(2);
    }
  }
 