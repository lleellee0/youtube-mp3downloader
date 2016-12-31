const fs          = require('fs');
const http        = require('http');

let inputFakePath = document.getElementById("fake-path");
let inputRealPath = document.getElementById("path");

// Add Event Lintener
$(inputFakePath).on('click', function() {
  $(inputRealPath).click();
});

$(inputRealPath).on('change', function(event) {
  event.preventDefault();
  $(inputFakePath).val(inputRealPath.files[0].path);
});

var youtubeUrl    = 'https://www.youtube.com';
var aTags;
var targetUrls    = new Array();

function processDownload() {
  loadPlayList();
  return false;
}

function loadPlayList() {
  // 1. 목록 불러오기
  $('#playlist').load($('#url').val() + ' #playlist-autoscroll-list', '', function() {
    makePlaylistTags();
  });
}

function makePlaylistTags() {
  // 2. 목록 만들기
  aTags           = $('#playlist').find('li');
  for(var i       = 0, len = aTags.length; i < len; i++) {
    targetUrls.push(youtubeUrl + '/watch?v=' + $(aTags[i]).attr('data-video-id'));
  }
  for(var i       = 0, len = targetUrls.length; i < len; i++) {
    console.log(targetUrls[i]);
  }

  // 3. 배열 생성할 문자열 만들기

  var toArrString = 'var targetUrls = [';

  for(var i       = 0, len = targetUrls.length; i < len; i++)
    toArrString += '"' + targetUrls[i] + '", ';

  toArrString += '];'

  // 4. 3 에서 만들어진 배열 복사 붙여넣기, jquery 붙여넣기 http://code.jquery.com/jquery.min.js
  var code        = "";

  for(var i       = 0, len = targetUrls.length; i < len; i++) {
    code += i + '.<a href="' + targetUrls[i] + '" target="_blank" rel="nofollow" class="y2m">link</a><br>';
  }

  $('#linklist').html(code);

  // 5. 실행하기 ()
  for(let i = 0, len = targetUrls.length; i < len; i++) {
     setTimeout(function() {
       $('#linklist a')[i].click();
     }, i * 300);
  }
}
