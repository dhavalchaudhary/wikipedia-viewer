$('document').ready(function(){
    var query = "";
    $("#searchicon").click(function(){
        query = $("#search-query").val();
        $("#results").empty();
        dataDisplay(query);
    });
    $('#search-query').keypress(function(e){
        if(e.which == 13){
            $('#searchicon').click();        }
    });
   function dataDisplay(query){
       var sendRequest = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query+"&callback=?";
       $.getJSON(sendRequest, function(resultData){
           var j = resultData[1].length;
           for(var i=0;i<j;i++){
               var title = resultData[1][i];
               title = title.replace(/['"]+/g, '');
               var desc = resultData[2][i];
               desc = desc.replace(/['"]+/g, '');
               var link = resultData[3][i];
               link = link.replace(/['"]+/g, '');
               displayResults(title,desc,link);
           };
       });
       function displayResults(title,desc,link){
           $("#results").append('<div class="row animated slideInUp result-box">\<a href="' + link + '" target="_blank"><h3>' + title + '</h3>\<p>' + desc + '</p>\</a>\</div>');
       };
   };
});