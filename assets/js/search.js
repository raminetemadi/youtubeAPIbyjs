/**
 * Created by etema on 6/09/2016.
 */
function getRes(response) {
    apiresults = response.items;
    $("#search-results").empty();
    var searchresults=$("#search-results");
    var pagingnext=$("#paging-next");
    var pagingprev=$("#paging-prev");

    apiresults.forEach(function(video){
        searchresults.append("<div class='video-items' itemprop='video' itemscope itemtype='http://schema.org/VideoObject'><h2><span itemprop='name'>"+video.snippet.title+"</span> </h2><img src='"+video.snippet.thumbnails.medium.url+"' alt='"+video.snippet.title+"'><span itemprop='description'>"+video.snippet.description+"</span><meta itemprop='contentURL' content='https://www.youtube.com/watch?v="+video.id.videoId+"' /><a href='https://www.youtube.com/watch?v="+video.id.videoId+"' target='_blank'>watch</a></div>");

    });
    if (response.nextPageToken)
        pagingnext.append("<div class='paging'><a id='next' data-id='"+response.nextPageToken+"' href='#'>Next Page &laquo;</a></div>");
    if (response.prevPageToken)
        pagingprev.append("<div class='paging'><a id='prev' data-id="+response.prevPageToken+" href='#'>&raquo;Previous Page</a> </div>");
}

//initialize
function init() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}


function onYouTubeApiLoad() {
    //your API key
    gapi.client.setApiKey('you_API_access_key');
}

function search(nexprev) {
    // API call
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: $("input[name=ykeyword]").val(),
        maxResults:20,
        pageToken:nexprev
    });

    // Send to server,
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    getRes(response);
}
//add event listener on elements that dynamically created
document.addEventListener('click', function (e) {
    if(e.target.id=="next"){
        //next page clicked
        search(e.target.getAttribute('data-id'));
    }
}, false);
document.addEventListener('keyup', function (e) {
    if(e.target.name=="ykeyword" ){
        if (e.target.value)
        //textbox has value
            document.getElementById("search-button").disabled=false;
        else
        //textbox is empty
            document.getElementById("search-button").disabled=true;

    }
}, false);