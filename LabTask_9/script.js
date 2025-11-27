document.getElementById('student-form').addEventListener('submit', addStudent);
 
function addStudent(event) {
    event.preventDefault(); // Prevent form submission
 
    let studentName = document.getElementById('student-name').value;
    if (studentName === '') {
        alert('Please enter a student name');
        return;
    }
 
    // Create a new student element
    let li = document.createElement('li');
    li.classList.add('student-item');
   
    // Create a span for the student's name
    let span = document.createElement('span');
    span.textContent = studentName;
 
    // Create an edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn-edit');
    editButton.addEventListener('click', function() { editStudent(li, span); });
 
    // Create a delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn-delete');
    deleteButton.addEventListener('click', function() { deleteStudent(li); });
 
    // Append the name and buttons to the list item
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
 
    // Append the list item to the student list
    document.getElementById('student-list').appendChild(li);
 
    // Clear the input field after adding
    document.getElementById('student-name').value = '';
}
 
function deleteStudent(studentElement) {
    // Remove the student from the list
    studentElement.remove();
}
 
function editStudent(studentElement, studentNameElement) {
    let newName = prompt('Enter the new name:', studentNameElement.textContent);
    if (newName !== null && newName !== '') {
        studentNameElement.textContent = newName;
    }
}
 
// Example of updating the list style
function changeListStyle() {
    let students = document.querySelectorAll('.student-item');
    students.forEach(student => {
        student.classList.toggle('highlight'); // Toggle highlight on each student item
    });
}
 
// Add a button to change styles for practice
let changeStyleButton = document.createElement('button');
changeStyleButton.textContent = 'Highlight Students';
changeStyleButton.addEventListener('click', changeListStyle);
document.body.appendChild(changeStyleButton);