function create_new_year() {
    //get the form data:
    const form = document.getElementById('new_year_form');
    const formData = new FormData(form);

    //Store the obtained data in variables:
    var year = formData.get('year');
    var opt_goal = formData.get('opt_goal');
    var sales_goal = formData.get('sales_goal');
    var fact_goal = formData.get('fact_goal');
    var efect_goal = formData.get('efect_goal');
    var td_goal = formData.get('td_goal');

    loader(true)
    // Send API post request to the backend:    
    fetch('new_year',{
        method: 'POST',
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            year: year,
            opt_goal: opt_goal,
            sales_goal: sales_goal,
            fact_goal: fact_goal,
            efect_goal: efect_goal,
            td_goal: td_goal
        })
    })
    .then(response => {
        loader(false)
        return response.json();
    })
    .then(data => {
        loader(false)
        window.location.href = `${year}`;
    })
};

function loader(state) {
    const submit_button = document.querySelector('#new_year_submit');
    const loader = document.querySelector('#new_year_loader');
    const inputs = document.querySelector('#new_year_inputs');
    const placeholders = document.querySelector('#new_year_placeholders');

    if (state) {
        submit_button.classList.remove('d-block');
        submit_button.classList.add('d-none');
        loader.classList.remove('d-none');
        loader.classList.add('d-block');

        inputs.classList.remove('d-flex');
        inputs.classList.add('d-none');
        placeholders.classList.remove('d-none');
        placeholders.classList.add('d-block');

    } else {
        submit_button.classList.remove('d-none');
        submit_button.classList.add('d-block');
        loader.classList.remove('d-block');
        loader.classList.add('d-none');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tooltip:
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    const form = document.getElementById('new_year_form'); 
    const year_list = form.dataset.yearList;

    // Wait for a new year submission:
        form.addEventListener('submit', function(event) {
            const year_to_create = form.querySelector('#year').value;
            if (year_list.includes(year_to_create)){
                event.preventDefault();
                alert(`El año ${year_to_create} ya existe en su cuenta`);             
            } else {
                event.preventDefault();
                create_new_year();
            }
        });
});