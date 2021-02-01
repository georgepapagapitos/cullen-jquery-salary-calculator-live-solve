$(document).ready(onReady);

let totalMonthlyCosts = 0;

let employees = [];

console.log('maxCosts', maxCosts);

function onReady() {
  console.log('I am ready!!!');

  $(document).on('submit', '#newEmployeeForm', onSubmit);

  $(document).on('click', '.deleteEmployeeBtn', onDeleteEmployee);
}

function onDeleteEmployee() {
  console.log(('the whole employee', $(this).data('employee')));

  // Remove employee from the array
  let indexOfEmployeeToRemove = $(this).data('index');
  if (indexOfEmployeeToRemove < 0) {
    alert('ruh-roh...');
    return;
  }
  let firstName = $(this).data('firstname');
  alert(`Bye bye, ${firstName}`);
  employees.splice(indexOfEmployeeToRemove, 1);

  // Render updated employee info
  render();
}

function onSubmit(evt) {
  evt.preventDefault();

  // Grab input values from DOM
  // ..creating an employee object
  let employee = {
    firstName: $('#firstNameInput').val(),
    lastName: $('#lastNameInput').val(),
    id: $('#idInput').val(),
    title: $('#titleInput').val(),
    annualSalary: Number($('#annualSalaryInput').val()),
  };
  console.log('new employee', employee);

  employees.push(employee);

  // Render to DOM
  render();

  // Clear form inputs
  $('#firstNameInput').val('');
  $('#lastNameInput').val('');
  $('#idInput').val('');
  $('#titleInput').val('');
  $('#annualSalaryInput').val('');
}

function render() {
  // Render employee to the DOM
  $('#employeeTable').empty();
  for (let employee of employees) {
    let index = employees.indexOf(employee); // or use for (let i ...)
    let tr = $(`
      <tr>
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.id}</td>
        <td>${employee.title}</td>
        <td>$${employee.annualSalary}</td>
        <td>
          <button class="deleteEmployeeBtn" data-index="${index}" data-firstname="${employee.firstName}"> <!-- $(this) -->
            Delete
          </button>
        </td>
      </tr>
    `);
    tr.find('button').data('employee', employee);
    $('#employeeTable').append(tr);
  }

  // Calculate monthly costs and render on DOM
  let totalMonthlyCosts = 0;
  for (let employee of employees) {
    totalMonthlyCosts += employee.annualSalary / 12;
  }
  $('#totalMonthly').text(totalMonthlyCosts.toFixed(2));

  // If we're over $20k, style it (probs red)
  if (totalMonthlyCosts > maxCosts) {
    $('#totalMonthlyCostsContainer').addClass('overBudget');
  } else {
    $('#totalMonthlyCostsContainer').removeClass('overBudget');
  }
}
