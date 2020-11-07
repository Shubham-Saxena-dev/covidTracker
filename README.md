## How to execute the project

## Pre Requisite
1. Gradle
2. Mongo DB(Used default configuration  Make sure the mongo db server is running on port 27017 and have default db test and no user authentication

## Steps to execute:
1. Go to Base directory of the project
2. From CMD Run command `gradle bootRun`
3. Browse on http://localhost:8080/home
4. No Error Page configuration has been done. So you may see if you try to browse wrong url


Jukin Application Development Assignment
--------
###Description

We have shared a sample application with you written in **AngularJS, Java, Spring, Spring Data and MongoDB**.  
As part of this assignment, you are expected to run the given application and make the changes as requested.
You are expected to do:
- Code Changes (code changes): make the requested code changes. Some on UI and some on Backend.
- Code Review (no code changes): find issues in the code and share the list of identified issues.
- Testing (code changes): add unit and integration tests for the given application using any testing framework like **Mockito or Spock**.
- Design Strategy (no code changes): Define a strategy to decide when to hit the Rapid API web service or Database while fetching the covid data. 
- New Requirement (no code changes): Give the design strategy how to integrate with another similar web service on the same lines.

### Important Instructions (before you start)
1. Fork the shared repo to make your changes.
2. Create a PR (Pull Request) and share with me (saurabh-jain-jukin) and Dan (dprski33) to review the code changes.
3. Keep making changes and pushing code in the forked repo via a PR so that we can determine when and which modules you were able to complete.
4. Test the application either in `incognito mode` or with `caching disabled`, to ensure the JS is always loaded from disk and no caching takes place.

####CODE CHANGES
#####UI issues
- In countries list page, bring the 'Back' button on top. Also add back button on remaining screens which takes them to the 'Home' screen.
- While navigating to Covid Details by Country Code or Name: display Submit button next to the Dropdown.
- Remove the annoying alerts when we take action on UI.
- Log meaningful data in UI console log for debugging purpose.
- In screens 'Covid Details by Country Code' and 'Covid Details by Country Name', sort the drop downs.
- Can we handle which page to display or hide in a better way? Using templates?
- Adding 'comment for a country' fails when there are spaces or other special char in comment box. Fix this.
- Also, always load the comments on UI if they are present for a country in DB.
- Improve error handling in Angular code, make the errors more meaningful.
- Application doesn't load correctly when there is no Internet, can we fix this?

#####Backend issues
- Sort countries list based on the favorite
- Update methods in CovidDataRepository and CovidRestRepository to make them more meaningful
- While doing `loadCntryData` in the `covidController.js`, in backend, we are making 2 DB call, is this correct? Can we fix this?
- When Internet or Rapid API is down, show correct error message on UI to make the user aware what went wrong.
- In CovidRestRepositoryImpl, map fields, annotated with @Value, using application.properties instead of Strings.

#####Good to have
- Create UI templates for list of countries, details by country code and name instead of all dumped in the single page and we show/hide components

#### NEW REQUIREMENT
**NOTE:** No integration needed, only provide down the design and strategy.
- Integrate with 1 more new web service API which also provides the Covid details.
- Its input and output is different from the currently integrated web service API.
- New API provides data for all countries but in a different format. It also provides data for India only.

How would you design and integrate to give the **best user experience** in terms of *accurate data, speed of delivery, continuity of services* etc.

#####Sample request - with url and headers to be used
```OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder()
	.url("https://corona-virus-world-and-india-data.p.rapidapi.com/api")
	.get()
	.addHeader("x-rapidapi-host", "corona-virus-world-and-india-data.p.rapidapi.com")
	.addHeader("x-rapidapi-key", "<use existing key from the code>")
	.build();

Request request = new Request.Builder()
	.url("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline")
	.get()
	.addHeader("x-rapidapi-host", "corona-virus-world-and-india-data.p.rapidapi.com")
	.addHeader("x-rapidapi-key", "<use existing key from the code>")
	.build();
```
