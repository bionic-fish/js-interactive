// Remove and Complete icons from [font-awesome]
var removeIcon = document.getElementById('removeIcon');
var completeIcon = document.getElementById('completeIcon');

// user clicked on th add task button
// if there is text inside thee input field, add text to the task list below
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
if (value) {
    addTaskItem(value);
    }  
});
// remove task items function
function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    
    parent.removeChild(item);
    // console.log(this.parentNode.parentNode);
} 
// move "complete" items into the complete div area
function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
// check if the item should be added to completed
    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

}
// removeItem() ends here
// TaskApp : 
// get user input and create a todo list
    // Components on create
    //  get #todo
    //  create list with user input
    //  create div
    //  create buttons and append to parent [div]
    // buttons created = [remove] & [complete]
// Task App Main function
function addTaskItem(text) {
    var list = document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
    // create a delete button inside the list container
    var remove = document.createElement('button');
    remove.classList.add("remove", "far", "fa-trash-alt");
    remove.innerHTML = '';
    // add click event to remove task items
    remove.addEventListener('click', removeItem);

    // add hover state for delete button
    remove.addEventListener('mouseover', function() {
        remove.style.color = 'red';
    });
    remove.addEventListener('mouseleave', function() {
        remove.style.color = "#333";
    });
    
    // create a complete button inside the list container 
    var complete = document.createElement('button');
    complete.classList.add("fas", "fa-check");
    complete.innerHTML = '';
    // add click event to complete task items
    complete.addEventListener('click', completeItem);
    // add an active state to the complete button
    complete.addEventListener('click', function() {
    complete.classList.add('active');
    });

    // append created html elements to appropriate parentNodes
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}
