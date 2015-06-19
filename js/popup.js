/**
* Function ready() is load always when load popup.js
* it get html page kinopoisk.ru and parse it by tag
*/
$(document).ready(function(){
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.kinopoisk.ru/afisha/new/", true);
    xhr.send(null);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.responseText){
                var data = xhr.responseText;
                //delete animation when load in off
                $('#load').remove();

                //today in cinema
                var todayCinema = [];
                //list of new films in cinema
                var first_track;
                //list of tags with images of films
                var images;
                //array of images of films
                var imagesArray = [];
                //list of tags with content for inset panel
                var inset;
                var menu;
                //name of films for premiere and soon 
                var value;
                //list of tags with date of premiere
                var premieres;
                //array with date of premeire 
                var premiereCinema = [];
                //list of tags with cost of films
                var cost;
                //array with cost of films
                var cinemaCost = [];
                //list of tags with rating of films
                var rating;
                //array with rating of films
                var ratingCinema = [];
                //list with tags of directors of films
                var director;
                //array with directors of films
                var directorCinema = [];
                //soon in cinema
                var soonCinema = [];
                var nameCinemaCost = [];
                //information about actors
                var actorList = [];
                //information about actors and deirectors
                var actoDirectorLinkList = [];
                var actorLinkList = [];
                var directorLinkList = [];
                //information about directors
                var directorList = [];

                first_track = $('.filmsListNew', data).children('div');

                images = first_track.children('.poster').children('a').children('img');

                inset = $('.news', data).children('span').children('a');
                menu = $('.menu', data);
                //pout insets
                pouringInset();
                //search films by types
                typeOfFilms(data);

                value = $('.dl', data).children('a').children('i').children('s');
                //premiere new films
                premieres = $('.dl', data).children('a').children('u');
                //cost fo films
                cost = $('.dl', data).children('a').children('u');
                rating = $('.dl', data).children('a').children('u');
                //director
                director = $('.gray', data).children('span:even');
                
                
                //pour information about directors and actors
                pouringDirectorsAndActors(inset, actoDirectorLinkList, actorList, actorLinkList, directorList, directorLinkList);

                createRatingOfFilms(todayCinema, ratingCinema, value, rating);

                director.each(function(i){
                    directorCinema.push($(this).text());
                });
                for (var m = 5; m < 10; m++){
                    soonCinema.push(value[m].innerText);
                    premiereCinema.push(premieres[m].innerText);
                }
                for (var m = 15; m < 20; m++){
                    cinemaCost.push(cost[m].innerText);
                    nameCinemaCost.push(value[m].innerText);
                }
                //pour table soon in cinema
                createSoonInCinema(soonCinema, premiereCinema);
                //pour table cost of films
                createCostOfFilm(nameCinemaCost, cinemaCost);

                var names = first_track.children('.info').children('.name').children('a');
                var linkfilm = first_track.children('.info').children('.name').children('a');
                var links = first_track.children('.poster').children('a').children('img');

                var a = [];
                var linkarray = [];
                
                //images of films
                images.each(function(index){
                    imagesArray.push($( this ).attr('src'));
                });

                linkfilm.each(function(index){
                    linkarray.push($( this ).attr('href'));
                });
                //pour table lider of cinema
                createLiderInCinema(names, a, imagesArray, linkarray, directorCinema);

            }
        }
    }
})

/**
* Function add type films on search panel in 3 columns for search films by type
*
* @param String data       Save code of html page http://www.kinopoisk.ru/afisha/new
* @return void             This function nothing to return
*
*/
function typeOfFilms(data){
    var typeslinks = $('.list', data).children('tbody').children('tr').children('td').children('ul').children('li').children('a');
    typeslinks.each(function(i){
        if (i < 5){
            var type = '<a href="http://www.kinopoisk.ru' + $(this).attr('href') + 
                '" target="_blank">' + $(this).text() + '</a>';
            $('#searchfirst').append(type + '</br>');
        }
        if (i > 5 && i < 11){
            var type = '<a href="http://www.kinopoisk.ru' + $(this).attr('href') + 
                '" target="_blank">' + $(this).text() + '</a>';
            $('#searchsecond').append(type + '</br>');
        }
        if (i > 11 && i < 17){
            var type = '<a href="http://www.kinopoisk.ru' + $(this).attr('href') + 
                '" target="_blank">' + $(this).text() + '</a>';
            $('#searchthird').append(type + '</br>');
        }
        });
}

/**
* Function need to pour insets that contains link of inset in kinopoisk.ru
*
* @param void     This function nothing to get params;
* @return void    This function nothing to return;
*
*/
function pouringInset(){
    $('#ratingfun').change(function(){
        window.open("http://www.kinopoisk.ru/votes/", "_blank", "");
    });
    $('#cinemamap').change(function(){
        window.open("http://www.kinopoisk.ru/map/", "_blank", "");
    });
    $('#cinemaevent').change(function(){
        window.open("http://www.kinopoisk.ru/events/", "_blank", "");
    });
    $('#allcinema').change(function(){
        window.open("http://www.kinopoisk.ru/cinemas/", "_blank", "");
    });
}

/**
* Function create information about directors and actors of films and show it on table
*
* @param Object inset                   Array save tags which has all information about actors and directors; 
* @param Object actoDirectorLinkList    Array save link on information about actors and directoes;
* @param Object actorList                Array save name of famous actors;
* @param Object actorLinkList            Array save link on information about actors on array actorList; 
* @param Object directorList             Array save name of directors of films;
* @param Object directorLinkList         Array save link on infromation about directors from array directorList;
* @return void                          This function nothing to return;
*
*/
function pouringDirectorsAndActors(inset, actoDirectorLinkList, actorList, actorLinkList, directorList, directorLinkList){
    inset.each(function(index){
        actoDirectorLinkList.push($(this).attr('href'));
    });
    for (var i = 0; i < 15; i++){
        actorList.push(inset[i].innerText);
        actorLinkList.push(actoDirectorLinkList[i]);
    }
    for (var i = 15; i < 30; i++){
        directorList.push(inset[i].innerText);
        directorLinkList.push(actoDirectorLinkList[i]);
    }
    //pouring tables actors and directors
    for (var m = 0; m < actorList.length; m++){
        //pouring table of actors
        $('#actorfield').append('<a href="http://www.kinopoisk.ru' + 
        actorLinkList[m] + '" target="_blank">' + actorList[m] + '</a>' + '<br>');
    }
    for (var m = 0; m < directorList.length; m++){
        //pouring table of directors
        $('#directorfield').append('<a href="http://www.kinopoisk.ru' + directorLinkList[m] + '" target="_blank">' + 
        directorList[m] + '</a>' + '<br>');
    }

}

/**
* Function create and show information about films and them rating
*
* @param Object todayCinema     Array for saved name of films;
* @param Object ratingCinema    Array for saved rating films;
* @param Object value           Array with saved name of films;
* @param Object rating          Array with saved rating of this films;
* @return void                 This function nothing to return; 
*
*/
function createRatingOfFilms(todayCinema, ratingCinema, value, rating){
    for (var m = 0; m < 5; m++){
        todayCinema.push(value[m].innerText);
        ratingCinema.push(rating[m].innerText);
        /*$('#tdname').append('</br>' + todaycinema[m]);
        $('#tdrating').append('</br>' + ratingcinema[m]);*/
        var table = document.getElementById('cinema'); 
        var rowCount = table.rows.length; 
        var row = table.insertRow(rowCount); 
        var cell1 = row.insertCell(0);
        cell1.style.textAlign = "left";
        cell1.style.display = "block";
        cell1.style.width = "300px";
        cell1.style.height = "55px";
        cell1.style.color = "#3e94ec";  
        cell1.style.textDecoration = "none";
        cell1.style.fontWeight = "700"; 
        cell1.innerText = todayCinema[m];
        var cell2 = row.insertCell(1);
        cell2.style.textAlign = "center";
        cell2.style.display = "block";
        cell2.style.width = "120px";
        cell2.style.height = "55px";
        cell2.style.color = "#3e94ec";  
        cell2.style.textDecoration = "none";
        cell2.style.fontWeight = "700";  
        cell2.innerText = ratingCinema[m];
    }
}

/**
* Create and show information about films and them rating
*
* @param Object soonCinema       Array with saved name of films than soon would be in cinema;
* @param Object premiereCinema   Array with saved date of premiere;
* @return void                  This function nothing to return;
*
*/
function createSoonInCinema(soonCinema, premiereCinema){
    for (var n = 0; n < soonCinema.length; n++){
        /*$('#soonname').append('</br>' + sooncinema[n]);
        $('#soondate').append('</br>' + premierecinema[n]);*/
        var table = document.getElementById('soonincinema'); 
        var rowCount = table.rows.length; 
        var row = table.insertRow(rowCount); 
        var cell1 = row.insertCell(0); 
        cell1.style.textAlign = "left";
        cell1.style.display = "block";
        cell1.style.width = "300px";
        cell1.style.height = "55px";
        cell1.style.color = "#3e94ec";  
        cell1.style.textDecoration = "none";
        cell1.style.fontWeight = "700"; 
        cell1.innerText = soonCinema[n];
        var cell2 = row.insertCell(1);
        cell2.style.textAlign = "center";
        cell2.style.display = "block";
        cell2.style.width = "120px";
        cell2.style.height = "55px";
        cell2.style.color = "#3e94ec";  
        cell2.style.textDecoration = "none";
        cell2.style.fontWeight = "700";   
        cell2.innerText = premiereCinema[n];
    }
}

/**
* Create and show information about films and them rating
*
* @param Object nameCinemaCost     Array with saved name of films;
* @param Object cinemaCost         Array with saved date cost of each film;
* @return void                    This function nothing to return;
*
*/
function createCostOfFilm(nameCinemaCost, cinemaCost){
    for (var n = 0; n < cinemaCost.length; n++){
        var table = document.getElementById('cost'); 
        var rowCount = table.rows.length; 
        var row = table.insertRow(rowCount); 
        var cell1 = row.insertCell(0);
        cell1.style.textAlign = "left";
        cell1.style.display = "block";
        cell1.style.width = "300px";
        cell1.style.height = "55px";
        cell1.style.color = "#3e94ec";  
        cell1.style.textDecoration = "none";
        cell1.style.fontWeight = "700";  
        cell1.innerText = nameCinemaCost[n];
        var cell2 = row.insertCell(1);
        cell2.style.textAlign = "center";
        cell2.style.display = "block";
        cell2.style.width = "120px";
        cell2.style.height = "55px";
        cell2.style.color = "#3e94ec";  
        cell2.style.textDecoration = "none";
        cell2.style.fontWeight = "700";  
        cell2.innerText = cinemaCost[n];
    }

}

/**
* Create infromation about liders film in cinema
* @param Object names             Array of tags with saved name of films;
* @param Object a                 Array with saved name of films;
* @param Object imagesArray       Array with saved images of each film;
* @param Object linkArray         Array with links on films on site kinopoisk.ru;
* @param Object directorCinema    Array with names of directors of films;
* @return void                   This function nothing to return;
*
*/
function createLiderInCinema(names, a, imagesArray, linkArray, directorCinema){
    names.each(function(index){
        a.push($( this ).text());
        var title = '<a href="http://www.kinopoisk.ru' + linkArray[index] + '" target="_blank">' + a[index] + '</a>';
        var im = '<img src="' + imagesArray[index] + '" height="70" width="70"></img>';
        var table = document.getElementById('lidercinema'); 
        var rowCount = table.rows.length; 
        var row = table.insertRow(rowCount); 
        var cell1 = row.insertCell(0);
        cell1.style.textAlign = "center";
        cell1.style.display = "block";
        cell1.style.width = "300px";
        cell1.style.height = "55px";
        cell1.style.color = "#3e94ec";  
        cell1.style.textDecoration = "none";
        cell1.style.fontWeight = "700";
        cell1.innerHTML = $( this ).text() + '</br>' + directorCinema[index];
        var cell2 = row.insertCell(1);
        cell2.style.textAlign = "center";
        cell2.style.display = "block";
        cell2.style.width = "120px";
        cell2.style.height = "55px";
        cell2.style.color = "#67acc2";  
        cell2.style.textDecoration = "none";
        cell2.style.fontWeight = "700";
        cell2.innerHTML = title + '</br>' + im;
    });

}



