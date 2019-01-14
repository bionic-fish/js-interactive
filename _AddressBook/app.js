window.onload = function() {
    // buttons
    var quickAddBtn = document.getElementById("QuickAdd");
    var Addbtn = document.getElementById("Add");
    var cancelBtn = document.getElementById("Cancel");
    var quickaddFormDiv = document.querySelector('.quickaddForm');
    // OR document.getElementsByClassNamee('quickaddForm") [0]

    //Form Fields
    var fullname = document.getElementById("fullname");
    var phone = document.getElementById("phone");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var email = document.getElementById("email");

    // Address Book Display
    var addBookDiv = document.querySelector(".addbook");

    // Create Storage Array
    var addressBook = [];

    // Event Listeners
    quickAddBtn.addEventListener("click", function() {
        quickaddFormDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", function() {
        quickaddFormDiv.style.display = "none";
    });

    Addbtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);

    // json function 
    function jsonStructure(fullname,phone,address,city,email) {
        this.fullname = fullname;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    function addToBook() {
        // isNull validation check on form to verify user has input appropriate data variables for form submission!
        var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' &&email.value!='';
        // console.log(isNull);
        if(isNull) {
            // Add the contents of the form to the array and localstorage
            var obj = new jsonStructure(fullname.value,phone.value,address.value,city.value,email.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            
            // hide the form panel
            quickaddFormDiv.style.display = "none";
            //clear the form
            clearForm();
            // update and display all records in the address book
            showAddressBook();
        }
    }

    function removeEntry(e) {
        if (e.target.classList.contains("delbutton")){
            var remID = e.target.getAttribute("data-id");
            // remove the jSon entry from the array with the index num = remID
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }

    }

    function clearForm() {
        var frm = document.querySelectorAll(".formFields");
        for (var i in frm) {
            frm[i].value = '';
        }

    }

    function showAddressBook() {
        // check if the key 'addbook' exists in localStorage or else create it
        // if it exists, load contents from the localStorage and loop > display it on the pagee
        if(localStorage['addbook'] === undefined) {
            localStorage['addbook'] = "[]";
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                    str += '<div class="name">' + addressBook[n].fullname + '<p></p></div>';
                    str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
                    str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                    str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
                    str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
                    str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                    str += '</div>';
                    addBookDiv.innerHTML += str;
            }
        }
    }

    showAddressBook();
}
