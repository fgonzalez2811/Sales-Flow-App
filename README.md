# **Sales Flow**
#### Harvard's CS50W final project

#### Video Demo: https://youtu.be/AxE4D_U2V7I

## Table of Contents

1. [Project Description](#description)
2. [Features](#features)
3. [Technologies Used](#tech)
4. [Distinctiveness and Complexity](#d&c)
5. [Overview of Project Files](#files)
6. [Installation](#installation)
7. [Usage](#usage)

<a name="description"></a>
## 1. Project Description

The Sales Flow Dashboard App is designed to help car sales personnel efficiently manage and track their daily activities. This web application allows users to quickly save data related to various sales activities, monitor their progress across different categories, and download comprehensive reports in Excel format. The app aims to streamline the workflow for sales professionals, providing them with valuable insights into their performance and helping them achieve their sales targets.

The app was built using the Django framework, with SQLite serving as the database. On the front end, Bootstrap was implemented to provide a responsive and intuitive user interface, while Chart.js was used to generate interactive and attractive graphs. For generating Excel reports, the Openpyxl library was employed.

<a name="features"></a>
## 2. Features

* Quick Data Entry: Easily record new opportunities, sales, test drives, and other activities with a user-friendly interface.

* Progress Tracking: View real-time progress for each activity category to stay on top of your goals.

* Comprehensive Reports: Generate and download detailed Excel reports containing all recorded data for in-depth analysis.

* User Dashboard: Personalized dashboard for each salesperson to visualize their performance metrics and progress.

* Responsive Design: Accessible on various devices, including desktops, tablets, and smartphones.

<a name="tech"></a>
## 3. Technologies Used

* Frontend: HTML, CSS, Bootstrap, Chart.js
* Backend: Django, python on server side and javascript on client side
* Database: SQLite
* Excel Generation: Openpyxl library

<a name="d&c"></a>
##  4. Distinctiveness and Complexity

When comparing this app to the network app and the commerce app, several key features and complexities highlight why my project stands out.

### Data management:

Unlike the social network and e-commerce apps, which primarily focus on user interactions through posts, likes, follows, listings, and offers, the SalesFlow app manages a broader spectrum of data. Users can:

* Create and manage multiple dashboards for different years of sales.
* Store detailed information about prospects, sales, test drives, and effectiveness rates.
* Continuously update this data to reflect ongoing sales activities and progress.

### Advanced data visualization:

One of the standout features of my app is the use of interactive charts built with Chart.js. This adds a layer of complexity not present in the other projects:

* Real-time Progress Tracking: Users can visualize their sales progress dynamically, seeing updates in real-time as new data is entered.
* Customizable Charts: The charts can be customized to display various metrics, providing deeper insights into sales performance.

### Enhanced user experience with responsiveness:

My app is designed to be fully responsive, ensuring a seamless user experience across different devices and screen sizes. This involves:

* Responsive design: Using CSS, bootstrap components and Javascript to adapt the layout and components for optimal viewing on desktops, tablets, and smartphones.
* User-friendly interface: Ensuring that all features, from data entry to chart viewing and report exporting, are easily accessible and intuitive to use.

### Integration with excel for data export:

A unique and highly useful feature of my app is the ability to export results to an Excel file using OpenPyXL. This functionality provides:

* Data Portability: Users can easily transfer their sales data to Excel for further analysis or reporting.
* Professional Reporting: The ability to generate professional, formatted reports that can be shared with stakeholders or used for presentations.

### Conclusion:

While the network and commerce apps are valuable in their own right, my sales tracking app offers a distinct and more complex solution by integrating advanced data management, interactive visualization, responsive design, Excel export functionality. These features not only enhance the functionality of the app but also demonstrate a higher level of technical complexity and versatility.

<a name="files"></a>
## 5. Overview of project files

Inside the 'Capstone' directory, you will find the basic structure of a Django project, which includes two main directories: 'Capstone,' containing the project configuration files such as settings.py and urls.py, and 'SalesFlow,' which holds all the files for the SalesFlow app, including URL paths, models, views, templates, and static files. Let's discuss these directories in detail.

* **Capstone/settings.py**: This file contains all the default django settings with the addition of the 'SalesFlow' app in the `INSTALLED_APPS` list and the `AUTH_USER_MODEL` set to "SalesFlow.User"

* **Capstone/urls.py**: In this file, the path to the admin site and to the SalesFlow app urls is added:
```
urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("SalesFlow.urls")),
]
```

* **SalesFlow/models.py**: This file contains the 3 models used to store all the data needed for the app, here is a brief description of each:

1. User model: This model extends Django's built-in AbstractUser model. It doesn't add any additional fields or methods but allows for future customization.

2. YearSheet model: This model represents a yearly sales sheet. Each YearSheet is associated with a specific user and contains a year and a creation date. The related_name="user_yearsheets" allows for reverse relationship queries from the User model to YearSheet.

3. MonthSheet model: This model represents a monthly breakdown of the sales sheet within a specific year. Each MonthSheet is linked to a YearSheet. It includes the month, and various goal and current values for different fields such as 'oportunities', 'sales', 'registrations', 'efectivity rate' and 'test drives'. These fields track different metrics related to the sales goals and current statuses.

* **SalesFlow/urls.py**: This file defines the URL paths for each view function, all of which will be detailed in the description of the views.py file below.

* **SalesFlow/views.py**: This file contains all the view functions used for the correct operation of the app. They work as follows:

    1. `def start(request)`: Redirects the user to the main index page, determining the appropriate year to display based on the current year and the user's existing year sheets.

    2. `def index(request, req_year)`: Renders the main dashboard page, displaying the user's year sheets and their corresponding month sheets for the requested year.

    3. `def edit_month_data(request)`: Updates the data for a specified month sheet based on the received JSON data from the client.

    4. `def delete_year(request, year)`: Deletes a specific year sheet associated with the logged-in user and redirects to the start page.

    5. `def login_view(request)`: Handles user authentication. If the request method is POST, it attempts to log the user in. If successful, redirects to the start page; otherwise, it shows an error message. For GET requests, it renders the login page.

    6. `def logout_view(request)`: Logs the user out and redirects to the main index page.

    7. `def register(request)`: Handles user registration. If the request method is POST, it attempts to create a new user and log them in. If successful, redirects to the index page. For GET requests, it renders the registration page.

    8. `def new_year(request)`: Handles the creation of a new year sheet and its associated month sheets for the logged-in user. If the request method is POST, it saves the new year and month data. For GET requests, it renders the new year creation page.

    9. `def get_monthsheet(request, pk)`: Retrieves data for a specific month sheet by its primary key and returns the data as a JSON response. This view is intended for GET requests.

    10. `def excel(request)`: Generates and returns an Excel file with year and month sheet data for a specified year, formatted and styled appropriately for the authenticated user.

Inside the `SalesFlow/templates` directory are all the HTML files for the app's pages:

 - `layout.html`: This template provides a structured layout for the application. It includes links to external stylesheets and JavaScript libraries from Bootstrap and Chart.js, and connects to a custom stylesheet and a favicon. The template features a fixed-top header and dynamic content insertion through Django template blocks. 

 - `index.html`: This template is the main dashboard of the app, it extends from 'layout.html' and includes javascript from 'index.js', modals for confirming year deletions, and dynamic content for displaying and managing sales data for different months and years. It uses Bootstrap for styling and modal functionality and includes Django template tags to insert dynamic content.

 - `login.html`:This template also extends from 'layout.html' and displays a login form that allows users to log into their accounts. It includes javascript from 'login.js'.

 - `new_year.html`: This template extends from 'layout.html' and displays a form that allows users to create a new year sheet by providing all the monthly goals for the new year. Upon completion, it redirects to 'index.html'. The template also includes javascript from 'new_year.html'.

 - `register.html`: This template extends from 'layout.html' and displays a form that allows users to create a new account by providing their name, email, and password. Upon completion, it redirects users to the 'index.html' page.

Inside the `SalesFlow/static` directory, you will find the 'styles.css' file, the 'favicon.ico' file, the 'images' directory containing the 'logo.png' image, and the following javascript files:

- `index.js`: This file has code that ensures that the index dashboard is interactive, allowing users to edit their goals and execution numbers while providing visual feedback on their progress. It includes several functions described below:

    1. `document.addEventListener('DOMContentLoaded', function ())`: This function initializes the dashboard when the DOM content is loaded. It starts the animation for the months row, calls 'update_progress()' to initialize the progress indicators, and adds event listeners to each field button to update progress indicators and allow editing.

    2. `update_progress()`: This function updates the progress indicators for each month sheet displayed on the dashboard. It selects all div elements with the class 'month-div' and calculates the execution percentage by comparing the execution number with the goal number. For effectiveness fields, it configures and renders a gauge chart using Chart.js. For other fields, it updates a progress circle's visual representation and percentage text.

    3. `edit_exec(month_field, month_id, field)`: This function allows users to edit the execution number for a specific month and field. It displays the edit form and hides the current execution number. Upon form submission, it sends a POST request to update the execution number in the database. The function then updates the displayed execution number and calls 'update_progress()' and 'update_efect()' to refresh the indicators.

    4. `update_efect(month_pk)`: This function updates the effectiveness value for a specific month. It sends a GET request to retrieve the month sheet data and calculates the effectiveness value based on the retrieved data. The function then updates the displayed effectiveness value on the dashboard.

    5. `edit_goal(month_field, month_id, field)`: This function allows users to edit the goal number for a specific month and field. It displays the edit form and hides the current goal number. Upon form submission, it sends a POST request to update the goal number in the database. The function then updates the displayed goal number and calls 'update_progress()' to refresh the indicators.

    6. `add_edit_btn(month_field)`: This function adds event listeners to the edit buttons for the execution and goal numbers. It selects the field tab based on the provided month_field and adds click event listeners to the edit buttons for the execution and goal numbers, linking them to the corresponding 'edit_exec' and 'edit_goal' functions.


- `login.js`: This code waits until the DOM is fully loaded, then attaches an event listener to the close button of an error message that is displayed in case of an error when trying to log in.

- `new_year.js`: This code is responsible for creating a new year entry in the dashboard. It handles form submission, sends data to the backend, and manages the display of loading indicators. Each of its functions is described below: 

    1. `document.addEventListener('DOMContentLoaded', function ())`: This function initializes the form and sets up event listeners when the DOM content is fully loaded. It initializes tooltips. It also sets up a submit event listener for the form. Before submitting, it checks if the year already exists in the user's account. If the year exists, it prevents form submission and shows an alert. Otherwise, it prevents the default form submission and calls the 'create_new_year()' function to handle the new year creation process.

    2. `create_new_year()`: This function collects form data and sends it to the backend to create a new year entry. It first retrieves the form element and gathers input values. Then, it calls the 'loader(true)' function to display the loading indicator while the API request is processed. The function sends a POST request to the backend with the collected data in JSON format. Once the response is received, it hides the loading indicator and redirects the user to the newly created year's page.

    3. `loader(state)`: This function manages the display of the loading indicator and form elements based on the provided state. When state is true, it hides the submit button and form inputs, and shows the loading indicator. When state is false, it reverses these changes, showing the submit button and form inputs while hiding the loading indicator.


<a name="installation"></a>
## 6. Installation

1.  Clone the project repository:

        git clone --branch web50/projects/2020/x/capstone --depth 1 https://github.com/me50/fgonzalez2811.git 
    

2.  Install all the dependencies in the 'requirements.txt' file using the following command:

        pip install -r fgonzalez2811/requirements.txt


3.  Go to the project folder:

        cd fgonzalez2811/Capstone


4.  Run a development server:

        python3 manage.py runserver


5.  Access the application by navigating to 'http://127.0.0.1:8000'


<a name="usage"></a>
## 7. Usage

1. Login/Register: Sales personnel can register for an account or log in using their credentials.

2. Create a year: Create a new year dashboard. Add the requested data: Year and monthly goals, then save it.

3. Record Activities: Use the dashboard to quickly log new opportunities, sales, test drives, etc.

4. Track Progress: View the progress charts and metrics on the dashboard to stay updated on your performance.

5. Generate Reports: Download an Excel file containing all your data for the selected period.


