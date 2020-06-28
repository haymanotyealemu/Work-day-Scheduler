# Work-day-Scheduler

About
The work-day scheduler application is a simple daily calendar developed using the HTML5, Bootstrap along with CSS, JavaScript, Jquery and moment.js library. The application allows the user to schedule and save events for each hour of day. 
* The app is always showing the current date at the top when the user run it in the browser. The day is set up using moment.js library moment (). format (‘dddd,MMMM Do’).
* There is a time block rows displayed which contains the standard business hours (9 am-5pm), a text area for user event inputs and a button to save the events to local storage.
* In addition to the layout of the calendar, each time block rows are color coded in terms of the status of the event for that time of date. If the hour is past for that time of day, the time block reflects gray color, if else the hour is current hour it will be colored by red color otherwise, the hour is not happen yet for that time of day so it is colored with green.

* The past time events will not be updated or deleted since the corresponding text fields and buttons will be disabled which means the user could not put and save events for the past hours.
* When the event is entered and press the store buttons the local storage store events even if there are some entries from previous dates. So, if the page is refreshed, the changes persist.
* If we update any active events, we will see this update in the local storage event object values according to what we change.
* If we delete an event and press the submit button and refresh, the page and the local storage will be updated.










