## Project four
 
### Full stack application
 
### Bike Packed?
![bike packed main screen gif](./Project%204%20screenshots/image1.gif)

![bike packed review and comments gif](./Project%204%20screenshots/image2.gif)
 

Bike Packed? is a Full Stack review website I created for General Assembly SE Immersive project 4. Users can register on the website and review a piece of bikepacking equipment. Once uploaded the user that created the review can edit or delete their review. In addition, all users can comment on the review adding their opinion of the product. The user that added a comment can also delete it.
 
### Description
 
Project 4 took place on the final week of our course, at the end of module 4. I had just over a week to complete this project, creating an API and Front-end Application that would interact with the API.
 
### Deployment Link
 
You can find the final project deployed here.
https://bike-packed.herokuapp.com/
 
### Getting Started / Code Installation
 
My GitHub repository for Project 4:
https://github.com/markmuy40/SEI65-project-4
 
### Timeframe and Working Team

I had just under nine days to create the Full Stack application. All students had the opportunity to work solo or in a group. I worked solo as a test to see what I was capable of, and what I could achieve on my own.
 
### Technologies used:
 
#### Front-end
HTML
CSS
SASS
JavaScript
React.JS
React Bootstrap
 
#### Back-end / API
Python – server-side language.
Django – REST framework to build the API.
Heroku – Back-end deployment.
 
#### Development Tools
VSCode – Primary build tool.
Google Dev Tools
Insomnia – Testing the API for requests and Database response.
GitHub – Version control.
 
### Brief
 
The concept was to build a full stack application using a Django RESTful Framework with Python. The end user should be able to create, return, update and delete at least one data model.
 
### Planning
 
I like the idea of user driven data, where the community creates the content and other users can respond. The information grows organically and encourages a thought-provoking process with a level of freedom.
 
This helped shape my decision to create a review-based website, like a forum, but with a more informative slant.
 
The data models in an SQL database are like pivot tables where there are relationships between them. It was important to plan this out at the beginning to reduce errors and complications later in the build process.
 
ERD design to show the relationships between the models. Included pseudocode in the planning of models.
 
![ERD plan](./Project%204%20screenshots/image3.png)
 
 
 
#### Design plan
 
I wanted a simple design with the user in mind, making the data more intuitive to navigate through. Having a responsive layout was a big part of the design so users could have the ability to use the site whilst on adventures, or during some personal down time. This wasn’t implemented in my previous projects, so I was keen to use it here.
 
Planning out URL endpoints and content helped with the flow through the website. I implemented useNavigate() to move through the register and login pages. Here you can see the flow in the arrows.
 
Webpage layout and navigation.
![Webpage layout and navigation plan](./Project%204%20screenshots/image4.png)
 
 
 
 
Planning the folder and file architecture.
 
Front-end:

![Front-end file architecture](./Project%204%20screenshots/image5.png)
 
 
Back-end:

![Back-end file srchitecture](./Project%204%20screenshots/image6.png)
 
You can get an idea for the scale of the task by creating a timeline. The key is to try and stay on target, but not get disheartened if you fall behind. Just keep pushing through!
 
Timeline:

![Timeline](./Project%204%20screenshots/image7.png)
 
### Build / code process
 
Building the API was first on my agenda. As I hadn’t used Django before, I would need to set up Pip on my machine. Running the ‘pip install pipenv’ command to get it running on my machine. Then onto creating a directory and opening VSCode, to run pip install Django to get the basic wireframe to build on.
 
Django file setup:

![Django file setup](./Project%204%20screenshots/image8.png)

From here I would run a series of commands to set up the database. Firstly, using ‘pip install psycopg2’ to access PostgreSQL with Python, then installing a Python linter to catch any coding errors. Finally setting up the API to point to a PostgreSQL database.
 
From here I started to implement the Apps, starting with the reviews. Referring to my ERD plan, I built the review model.
 
ERD plan:

![ERD plan](./Project%204%20screenshots/image9.png)
 
Review model. Populated with the owner field, remembering the one-to-many relationship.
![review model](./Project%204%20screenshots/image10.png)

From here I would add in the URLs in the project folder, then onto the URLs in the reviews folder, finally adding in the endpoints in the views folder.
 
URL patterns within the project folder. Note the comments, favourites and auth(users) URLs added:
![URL patterns in project folder](./Project%204%20screenshots/image11.png)
 
URL patterns in the reviews folder:

![URL patterns in reviews folder](./Project%204%20screenshots/image12.png)

 
Apps added in the project settings folder:

![Apps in project settings folder](./Project%204%20screenshots/image13.png)
 
The endpoints for the review list view and detail view:
![Endpoints for reviews](./Project%204%20screenshots/image14.png)
 
The comments followed a very similar pattern to the reviews with the only exception being the model. There is a one-to-many relationship between the comments and reviews. 
 
The comments model:
![comments model](./Project%204%20screenshots/image15.png)
 
The favourites were slightly different as I wanted to be a function where the user could like several reviews that they could refer to in their profile. The concept being for the user to have a way of shortlisting which bag they would consider buying. For this reason, I only added a create, return, and delete option. 
 
The favourites view. In the final project the favourites endpoints would not be used. More on that later.
 
![Favourites endpoint](./Project%204%20screenshots/image16.png)
 
Adding in the jwt_auth model to have users and authenticated paths, I could test the endpoints in Insomnia to ensure I was feeding the right data into the endpoints. This would be vital in setting up axios requests later.
 
Testing the get request to return all reviews. This is not an endpoint requiring an authorised user.
 
![Insomnia endpoint get request](./Project%204%20screenshots/image17.png)
 
Testing comments endpoint, checking they populated a review:
![testing comments endpoint](./Project%204%20screenshots/image18.png)
 
Adding a comment to a review (need authorisation):
![adding comment to review in Insomnia](./Project%204%20screenshots/image19.png)
 
 
Adding the JSON Web Token:
![Adding the JSON Web Token](./Project%204%20screenshots/image20.png)
 
 
Testing registration:
![Testing registration](./Project%204%20screenshots/image21.png)
 
 
With all endpoints tested it was onto creating the front-end. I created a client folder using npm to create a React app. Using the same command line from our project 2, I could save time as this would create a boilerplate. 
I used:

**npx create-react-app client --template cra-template-seireactproject22**
 
From here I could install bootstrap, remembering to import the minified file into the index.js folder. 
 
Going back to my plan, I implemented the file structure and associated SASS files. The client folder was nested inside the project folder and sat at the same level as the API folder. This would make it easier for deployment.
 
The plan:

![Front-end folder and file planning](./Project%204%20screenshots/image22.png)
 

The components files:

![SRC components files](./Project%204%20screenshots/image23.png)
 
I initially had the same structure as the plan but decided it would be more dynamic to create a review form where I could hook in the ReviewNew and ReviewEdit files.
 
The review form:
![review form](./Project%204%20screenshots/image24.png)
 
Review new:

![review new](./Project%204%20screenshots/image25.png)
 
To improve the user experience, it would be good to have the review edit form pre-populated, so the user can edit specifically what they want rather than have to rewrite everything. I added a get request to populate the fields. The put request would then handle the data being put back into the database.
 
The useState setup for handling the edit review function.

 
The get request to populate the review in the edit function. The put request below has the authorisation header added to it.
![Axios get request](./Project%204%20screenshots/image27.png)
 
How it looks in the Front-end
![review display on webpage](./Project%204%20screenshots/image28.gif)
 
 
The ReviewSingle.js file handles the comment functionality. I created the comment form at the bottom of the review page as this would add to the user experience. Being able to read a review, the associated comments, and the ability to comment on the same page made the experience seamless.
 
 
The imports and states:
![imports and states](./Project%204%20screenshots/image29.png)
 
 
 
The return review and delete review:
![return and delete review](./Project%204%20screenshots/image30.png)
 
The comment create and delete:
![axios request for comment create adn delete](./Project%204%20screenshots/image31.png)
 
The jsx where the data is displayed. I added in conditional logic so that only the original author of the review can edit or delete their own review. The same for the comments, but I only got as far as the user being able to add or delete a comment. The buttons aren’t displayed if you are not authorised to edit or delete a review or comment.
 
The review jsx. Here you can see the conditional logic for the buttons.
![review jsx - with logic](./Project%204%20screenshots/image32.png)


The comments:

![comments jsx](./Project%204%20screenshots/image33.png)
 
I also added in a link so that new users can register, or existing users can login without having to scroll up to the top.
 
The conditional logic.
![conditional logic](./Project%204%20screenshots/image34.png)
 
 
 The view you get if logged in:
![conditional logic if logged in](./Project%204%20screenshots/image35.png)
 
The view if not logged in:
![conditional logic if not logged in](./Project%204%20screenshots/image36.png)
 
 
At this point in the project, the deadline was looming, and I still had a lot of styling to do. The app didn’t look as it does now and I wanted to give it a very tactile feel, where the app was communicating with the end users and the touch points were apparent.
 
Reading back on the brief and checking with the tutors, I had met the MVP of the project, without the functionality of the favourites feature. Rather than end up with a product that didn’t quite meet my expectations, or have a lot of functionality and poor design, I decided the best compromise would be to stick with what I have and make it feel like a complete product, focusing on the user interface.
 
Error handling for forms would add to the feedback a user would receive. During the class code along sessions, we were taught many ways of getting the information back and displaying it to the user. It was up to us to decide how we would iterate through that data to display it.
 
Using the catch in the Axios request returned mixed results in the console log. Sometimes it would work when iterating through the data other times, not. This led me to return back to the API to see how I could return the data in a way that it could be displayed consistently.
 
The register and login response in the API:
![API response for error handling](./Project%204%20screenshots/image37.png)
 

And how it looks in the front end:

![Register errors displayed in front end](./Project%204%20screenshots/image38.png)

![Register errors displayed in front end](./Project%204%20screenshots/image39.png)
 
 
 
Login:

![Login errors displayed in front end](./Project%204%20screenshots/image40.png)
 
 
Error handling in the review form.
![Error handling in the review form](./Project%204%20screenshots/image41.gif)

 
After getting this feature working, the best way of giving a tactile feel was to utilise the &:hover in CSS to get the buttons to look like they light up when you hover over them.
 
The code in the main.scss file:

![The code in the main.scss file](./Project%204%20screenshots/image42.png)
 
And in use:

![And in use](./Project%204%20screenshots/image43.gif)

![the hover in use](./Project%204%20screenshots/image44.gif)
 
 
 
From here onwards, I was seeding data using the Front-end only. It was a good test to find any bugs as well as how it would feel for an end user. 
 
I presented my work to the class at the end of the week, confident that everything works as it should and grew my confidence in doing so. I talked through my key learnings and what I would do if I had more time.

### Challenges
 
Returning data in an axios request. I found this a fun and interesting challenge to work through. I already had the answers from using Insomnia. The trick was how to do this in the Front-end. Revisiting JavaScript forms, the handleSubmit and creating helper functions to send the JWT back with the request, were all key. I particularly enjoyed working through the comment post and delete functions as I wanted to do this on the review page, adding to the user experience. Adding in conditional logic simplified things as the buttons don’t appear if you aren’t authorised to do so. 
 
The helper functions for authenticated routes.
![authenticated route functions](./Project%204%20screenshots/image45.png)
 
 
 
Your hardest times often lead to the greatest moments of your life. Keep going. Tough situations build strong people in the end. – Roy Bennet
 
Being a manager in my previous career, people came to me looking for answers to common and uncommon problems, which I had the answer to or could find relatively easily. What happens when I need an answer and can’t find it?
 
I was in the middle of creating a Full Stack Application in the same timeframe as I had for project three (just under nine days), but using two new languages, and on my own. At times this felt like a tall order and a big ask. It would be easy for me to get out of my own head and at times feel stressed. The way I solved the emotional side would be to focus on only one task at a time, exhaust my avenues of information and only then would I ask for help. It was important for me to prove I could do it all on my own. I knew I had safety nets, but I wanted those moments of self-discovery, those wins, and ultimately, to be able to look at it and say, “I did that”. There is no greater reward. I just had to remind myself to take one step at a time, because that gets me closer to the goal.
 
### Wins
 
I have made a Full Stack Application that works exactly how I wanted it to. Navigating through it feels tactile and responsive. It works on multiple platforms and uses conditional logic to let users know what they can and can’t do.
 
I didn’t have a robust design during planning, but I got inspiration along the way and came out with a strong design that matches the genre of being outdoors. I’m genuinely proud of what I have achieved.
 
### Key learnings / takeaways
 
The point of React is that you don’t reload the page. I came across this problem when deleting comments. A user could delete the comment, but it would stay there as I couldn’t reload the page. I used console logs to ensure I was getting to the useNavigate call-back function, but to no avail.
 
How it looked before:

![useNavigate being used incorrectly](./Project%204%20screenshots/image46.png)
 
 
In the console log. You can see it gets to the navigate, and past it, as both console logs are triggered. 
![useNavigate code being reached, but not working as expected](./Project%204%20screenshots/image47.png)
 

I moved the getData function outside of the useEffect so it could be called globally and used the getData call-back to reload the data rather than the page, making it more efficient and appear seamless.
 
The getData function reformatted:
![The getData function reformatted](./Project%204%20screenshots/image48.png)
 
 
And how the comment delete is set up now:
![Comment delete now refreshing data](./Project%204%20screenshots/image49.png)
 
 
### Bugs
 
As I seeded the data in the front end, any bugs would show up, but there aren’t any I could find. The only one is the data being slow to populate. This is to do with being deployed with Heroku, not the code itself.
 
### Future Improvements
 
I would create the user profile page where the user could have a view of all the reviews they favour and could delete them from favourites as they wish.
 
I would also like to have a forgotten password and email confirmation set up to verify users and help with the overall experience. 
 

