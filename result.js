
$(document).ready(function(){
    getParams();
});

// エラーを出力する
function showError(){
    $('#result').append($('<li>Error</li>'));
}

function showNoData(){
    $('#result').append($('<li>No data</li>'));
}

var search_address = 'https://www.facebook.com/search/?type=users&q=';
function makeALink(word)
{
    var address = search_address += query;
    var link = $('<a>').attr('href', address).text(query);
    var li = $('<li>');
}

function showWords(words){
    //単語をすべて表示する
    var query = '';
    for(var i=0; i<words.length; i++){
        var child = $('<li>' + words[i] + '</li>');
        $('#debug').append(child);
        query += words[i];
    }
    $('#debug').listview('refresh');

    var address = search_address += query;
    console.log(address);
    var link = $('<a>').attr('href', address).text(query);

    var li = $('<li>');
    //li.append($('<a>').attr('href');
    $('#result').append($('<li>').append(link));
    $('#result').listview('refresh');
}

function splitParams(url){
    var idx = url.lastIndexOf('?');
    if(idx == -1){
        //クエリがない
        showNoData();
        return [];
    }
    var substr = url.slice(idx+1, url.length);
    var words = substr.split('&');
    console.log(words);
    return words;
}

// urlからパラメータを解析する
function getParams(){
    var url = location.href;
    console.log(url);

    try{
        console.log(decodeURI(url));
        var decoded = decodeURI(url);
        console.log(decoded);
    }
    catch(e){
        showError();
        console.log('URI decode error');
        console.log(e);
    }

    var words = splitParams(decoded);
    showWords(words);
}
