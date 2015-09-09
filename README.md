# Course Catalog Open API

The New School's Course Catalog is a Node application run off of the Meteor platform and MongoDB. The Course Catalog may be found here: [https://courses.newschool.edu](https://courses.newschool.edu).

One of the many features of the Course Catalog is an Open API. These docs will help walk through the process of using the API.

## How it Works

The API is run through an Iron Router route. Iron Router is a package that extends the Meteor framework. 

To query the API, you may access the data with any URL method (e.g., cURL, GET). The return result will be a JSON file with the data for a specific course.

### The Query

#### Example Queries

##### Command Line

```javascript
curl 'https://courses.newschool.edu/api/PLFS4017'
```

##### jQuery

```javascript
$.getJSON('https://courses.newschool.edu/api/PLFS4017', function(data) { 
	console.log(data);
});
```

##### In Browser
To test the query in the browser, you can just visit the URL for the course you want to query and the result will be JSON.

#### How the Query Works

When making the query the URL can be broken down into two parts:

1. The routing URL to the Course Catalog (https://courses.newschool.edu/api/), and
2. The course information which is represented by a 'subject code' and a 'course code.'

```javascript
var ccSource = 'https://courses.newschool.edu/api/';
var ccSubjCode = 'PLFS';
var ccCourseCode = '4017';

var ccAPIQuery = ccSource + ccSubjCode + ccCourseCode;
});
```

### The Data

Any of the data available in the Course Catalog is also available in the JSON values returned. What elements are available should be self-evident, but here is a brief explanation of what is presented.

1. Top Level Course Data

There is information that is universal to all courses of this title across all sections. This is where the 'course level data' comes into play.

Example: 

```javascript
$.getJSON('https://courses.newschool.edu/api/PLFS4017', function(data) { 
	console.log(data.CRSE_TITLE); //returns 'A Cultural History of Denim'
});
```

2. Section Level Data

Most relevant data exists at the section level. A section is just one instance of the course. You will need to loop (each/for) through the sections in order to make sure you're returning all of the results.

Example: 

```javascript
$.getJSON('https://courses.newschool.edu/api/PLFS4017', function(data) { 
	$.each(data.vix_sections, function(key, value) {
		console.log(value.DEPT_DESC); //returns 'Art and Design History'
	})
});
```

3. Sub-Section Level Data

Sometimes there are multple occurrences of a course at the section level (multiple class times, etc.) so there is a sub-section level of data. Using JSON dot notation, you can access this fairly easily in a loop (each/for) to ensure you are getting the full scope of data. 

Example:

```javascript
$.getJSON('https://courses.newschool.edu/api/PLFS4017', function(data) { 
	$.each(data.vix_sections, function(key, value) {
		$.each(value.ix_section_meeting_times, function(meetingKey, meetingValue) {
			console.log(meetingValue.BEGIN_TIME); //returns '1900'
	})
});
```
