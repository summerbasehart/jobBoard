# testApp


Registration:

    Admins can only register using an email from domain @ostadvantage.com


Front Page:

    Front Page contains tabs for either employee or contractor applications.
    All applications are stored and kept in database, and can be brought up from the admin panel.
    Contains external link to ostadvantage.com at the top of the page, under "Learn More About Us", 
    as well as icon links to social media platforms at the bottom.


Admin Panel

    The Admin Panel contains the functions to create, view, edit, and delete Job Posts and Job Categories.
    It also has the ability to view and print employee and contractor applications.
    Lastly, You can edit the Home page text from the "Home" link on the navbar.


To Install:

    Start in source folder, and then run the following commands:

    1. "npm i"
    2. "cd client"
    3. "npm i"
    4. "cd ../MongoDB"
    5a. {{Here you must run mongorestore to restore the dummy database in "DB" folder, 
       it can be edited afterwards}}
    5b. {{If mongorestore does not work, "home.json" in source folder must be added to "pages" 
       collection, and all other data can be created in app.}}
