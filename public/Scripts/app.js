/* // File Name : Assignment1  */
/* // Student's Name : JiHyeok Kim  */
/* // StudentID : 301105279  */
/* // Date : 10/8/2020  */


// IIFE -- Immediately Invoked Function Expression
//  is a way to execute functions immediately


(function(){


    function start(){
        console.log("App Started....");
        
        //Steps for preventing process from quick confirming
        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click',(event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/business-list');
                }
            });
        }

        //capture the information entered
        if(document.title == "Contact")
        {
            let sendButton = document.getElementById("sendButton");
            let cancelButton = document.getElementById("cancelButton");
            let form = document.forms[0];

            sendButton.addEventListener("click",(event) => {
                event.preventDefault();

                let fullName = document.getElementById("fullName").value;
                let contactNumber = document.getElementById("contactNumber").value;
                let emailAddress = document.getElementById("emailAddress").value;
                let message = document.getElementById("message").value;

                console.info(`Full Name : ${fullName} 
                Contact Number : ${contactNumber} 
                Email Address : ${emailAddress} 
                Message : ${message}`);

                form.reset();
                fullName="";
                contactNumber="";
                emailAddress="";
                message="";


            });

            cancelButton.addEventListener("click",(event) => {
                event.preventDefault();
                if(confirm("Are you Sure to come back to Home page?"))
                {
                    location.href = "/home";
                }
            });
        }

    }

    window.addEventListener('load',start);


})();