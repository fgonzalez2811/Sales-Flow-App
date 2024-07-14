function update_progress() {
    // Get all div elements that contain a month sheet
    const month_divs = document.querySelectorAll("." + "month-div");

    // Calculate porcentage of execution for each month div
    month_divs.forEach(month => {
        const tabs = month.querySelectorAll("." + "tab-pane");
        tabs.forEach(tab => {
            if (tab.dataset.field == 'efect') {
                const exec_element = tab.querySelector('#exec-number')
                const goal_element = tab.querySelector('#goal-number')
                const exec_number = parseInt(exec_element.querySelector('#num-span').innerHTML)
                const goal_number = parseInt(goal_element.querySelector('#num-span').innerHTML)
                var data = [10, 40, 50]
                var value = (exec_number / goal_number) * 25
                if (value >= 50) {
                    value = 49;
                } else if (value == 0) {
                    value = 1;
                }
                var config = {
                    type: 'gauge',
                    data: {
                        labels: ['',`${goal_number}%`,''],
                        datasets: [{
                            data: data,
                            value: value,
                            backgroundColor: ['red', 'green', 'red'],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: false,
                        },
                        layout: {
                            padding: {
                                bottom: 0
                            }
                        },
                        needle: {
                            radiusPercentage: 2.5,
                            widthPercentage: 3.2,
                            lengthPercentage: 110,
                            color: 'rgba(0, 0, 0, 1)'
                        },
                        valueLabel: {
                            display: false
                        },
                        plugins: {
                            datalabels: {
                                display: true,
                                formatter: function (value, context) {
                                    return context.chart.data.labels[context.dataIndex];
                                },
                                color: 'rgba(255, 255, 255, 0.85)',
                                backgroundColor: null,
                                font: {
                                    size: 10,
                                    weight: 'light',
                                }
                            }
                        },
                        tooltips: {
                            enabled: false // Disable tooltips
                        }
                    }
                };

                var ctx = document.getElementById(`${month.dataset.monthName}-chart`).getContext("2d");
                window.myGauge = new Chart(ctx, config);

            } else {
                const progressCircle = tab.querySelector('#progress-circle');
                const progressFill = progressCircle.querySelector('circle.progress-fill');
                const percentageText = progressCircle.querySelector('span.percentage-text');
                const goal_col = tab.querySelector('#goal-col');
                const goal = parseInt(goal_col.querySelector('#num-span').innerHTML);
                const exec_col = tab.querySelector('#exec-col');
                const exec = parseInt(exec_col.querySelector('#num-span').innerHTML);

                var percentage = (exec / goal) * 100;
                percentage = percentage.toFixed(0);

                // Calculate stroke-dasharray based on percentage
                const dashArrayLength = Math.PI * 2 * 40;
                var dashOffset = 0;
                if (percentage < 100) {
                    dashOffset = dashArrayLength * (100 - percentage) / 100;
                } else {
                    dashOffset = 0;
                };
                progressFill.style.strokeDasharray = `${dashArrayLength}, ${dashArrayLength}`;
                progressFill.style.strokeDashoffset = dashOffset;

                // Update percentage text content
                percentageText.textContent = percentage + '%';
            }
        })

    });
}

function edit_exec(month_field, month_id, field) {
    const field_tab = document.querySelector(`${month_field}`);
    const number = field_tab.querySelector('#exec-div');
    const edit_form = field_tab.querySelector('#edit-exec-form');
    number.style.display = 'none';
    edit_form.style.display = 'flex';

    edit_form.addEventListener('submit', function (event) {
        event.preventDefault();

        // update execution number in database
        const field_tab = document.querySelector(`${month_field}`);
        const number = field_tab.querySelector('#exec-div');
        const edit_form = field_tab.querySelector('#edit-exec-form');
        const formData = new FormData(edit_form);

        const new_current_value = formData.get('new_current');
        const csrf_token = formData.get('csrfmiddlewaretoken');
        const month_pk = month_id;
        const data_field = field;

        fetch('edit_month_data', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                new_data: new_current_value,
                month_id: month_pk,
                field: data_field
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .then(() => {
                number.querySelector('#num-span').innerHTML = new_current_value
                edit_form.style.display = 'none';
                number.style.display = 'flex';
                update_progress();
                update_efect(month_pk);
            })
    })
}

function update_efect(month_pk) {

    fetch(`get_monthsheet/${month_pk}`)
        .then(response => response.json())
        .then(data => {
            const month_data = data.month_data
            const month_name = month_data.month_name
            const opt_current = month_data.opt_current
            const fact_current = month_data.fact_current
            const efect_value = opt_current > 0 ? (fact_current / opt_current) * 100 : 0;
            const month = document.querySelector(`#${month_name}-card`);
            const efect_tab = month.querySelector(`#${month_name}-efect`);
            const exec_efect_div = efect_tab.querySelector('#exec-number');
            exec_efect_div.querySelector('#num-span').innerHTML = Math.round(efect_value).toString();
        })
}

function edit_goal(month_field, month_id, field) {
    const field_tab = document.querySelector(`${month_field}`);
    const number = field_tab.querySelector('#goal-div');
    const edit_form = field_tab.querySelector('#edit-goal-form');
    number.style.display = 'none';
    edit_form.style.display = 'flex';

    edit_form.addEventListener('submit', function (event) {
        event.preventDefault();

        // update execution number in database
        const field_tab = document.querySelector(`${month_field}`);
        const number = field_tab.querySelector('#goal-div');
        const edit_form = field_tab.querySelector('#edit-goal-form');
        const formData = new FormData(edit_form);

        const new_goal_value = formData.get('new_goal');
        const csrf_token = formData.get('csrfmiddlewaretoken');
        const month_pk = month_id;
        const data_field = field;

        fetch('edit_month_data', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                new_data: new_goal_value,
                month_id: month_pk,
                field: data_field
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .then(() => {
                number.querySelector('#num-span').innerHTML = new_goal_value
                edit_form.style.display = 'none';
                number.style.display = 'flex';
                update_progress();
            })
    })
}

function add_edit_btn(month_field) {
    //Get the edit button for the month and the field indicated
    const field_tab = document.querySelector(`${month_field}`);

    //Add event listener to the edit buttons for goal number:
    const edit_goal_btn = field_tab.querySelector('#edit-goal-btn');
    edit_goal_btn.addEventListener('click', function () {
        const field_tab = document.querySelector(`${month_field}`);
        const edit_btn = field_tab.querySelector('#edit-goal-btn');
        const month_id = edit_btn.dataset.month;
        const field = edit_btn.dataset.field;
        edit_goal(month_field, month_id, field);
    });

    //Add event listener to the edit buttons for executed number:
    const edit_exec_btn = field_tab.querySelector('#edit-exec-btn');
    edit_exec_btn.addEventListener('click', function () {
        const field_tab = document.querySelector(`${month_field}`);
        const edit_btn = field_tab.querySelector('#edit-exec-btn');
        const month_id = edit_btn.dataset.month;
        const field = edit_btn.dataset.field;
        edit_exec(month_field, month_id, field);
    });

}



document.addEventListener('DOMContentLoaded', function () {
    const months_row = document.querySelector('#months-row');
    months_row.style.animationPlayState = 'running';

    update_progress();

    // Add event listeners to each field button to trigger the update of the progress circle
    const month_divs = document.querySelectorAll("." + "month-div");
    month_divs.forEach(month => {
        update_efect(month.dataset.month_id);
        const field_buttons = month.querySelectorAll("." + "nav-link");
        field_buttons.forEach(button => {

            // Add update_progress function to every click on a nav link tab
            button.addEventListener('click', function () {
                update_progress()
            });

            // Add an edit button to every tab
            const month_field = button.dataset.bsTarget;
            add_edit_btn(month_field);
        });
    });


});