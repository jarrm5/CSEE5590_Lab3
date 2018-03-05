//AIzaSyACJ3-axivUfOUzQH2R9BxDW6UE-DLeRtU

$(function() {
    //When the search button is clicked, request using youtube client
    $("form").on("submit", function(e) {
       //don't allow the default behavior when submitting a form.
       e.preventDefault();
       //Request using q argument
       //supply the query argument from the form
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount"
       }); 
       //Execute the request and iterate over the results
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
              //Load the results into html template
            $.get("video.html", function(data) {
                $("#results").append(buildHTML(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
       });
    });
});

//Initialize the YT client
function loadYTAPI() {
    gapi.client.setApiKey("AIzaSyACJ3-axivUfOUzQH2R9BxDW6UE-DLeRtU");
    gapi.client.load("youtube", "v3", function() {
        console.log("Youtube Client Ready!");
    });
}

//Inject the response results into HTML template for display
function buildHTML(e,t){
    result=e;
    for(var n=0;n<t.length;n++){
        result=result.replace(/\{\{(.*?)\}\}/g,function(e,r){
            return t[n][r];
        });
    }
    return result;
}