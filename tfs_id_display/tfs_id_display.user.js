// ==UserScript==
// @name         TFS ID Display
// @namespace    http://www.jaison.org
// @version      0.1
// @description  Displays the Story IDs and Task IDs in task board. Tested only with TFS 2012.
// @author       Bejoy Jaison
// @match        *_boards
// @grant        none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    jQ( "#taskboard" ).ready(function() {
        // Update the parent user stories
        jQ( ".taskboard-parent .witTitle" ).each(function () {
            // Find the HTML attribute "id" of the closest element with the ID
            var storyElemId = String(jQ (this).closest(".taskboard-parent").attr("id"));

            // The task id is the number part from the HTML "id" attribute
            var storyId     = String(storyElemId.match(/[0-9]+/g)); 

            jQ (this).prepend (storyId + ": ");
        });
        
        // Update the task tiles. Note that tasks are update independently
        // (meaning not within the story element) so that the same code
        // could be used for both the 'backlog items' view and 'team members' view.
        jQ( ".tbTile .witTitle" ).each(function () {
            var taskElemId   = String(jQ (this).closest(".tbTile").attr("id"));
            var taskId       = String(taskElemId.match(/[0-9]+/g));
            jQ (this).prepend (taskId + ": ");
            
            // Find the story Id and update it.
            // !!! Problems in team members view, since it is not possible to map the 
            //     task back to story.
            /*
            var storyElemId  = String(jQ (this).closest(".taskboard-row").children(".taskboard-parent").attr("id"));
            jQ (this).prepend (String(storyElemId.match(/[0-9]+/g)) + "/");
            */
        });
    });    
}


// load jQuery and execute the main function
addJQuery(main);