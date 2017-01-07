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
var targetArray;
//var targetUrls    = new Array();

function processDownload() {
  loadPlayList();
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
  targetArray = new Array();
  for(var i       = 0, len = aTags.length; i < len; i++) {
//    targetUrls.push(youtubeUrl + '/watch?v=' + $(aTags[i]).attr('data-video-id'));
      var liObject = new Object();
      liObject.thumbnail = $(aTags[i]).attr('data-thumbnail-url');
      liObject.index = $(aTags[i]).attr('data-index');
      liObject.title = $(aTags[i]).attr('data-video-title');
      liObject.url = youtubeUrl + '/watch?v=' + $(aTags[i]).attr('data-video-id');
      targetArray.push(liObject);
  }
  for(var i       = 0, len = targetArray.length; i < len; i++) {
    console.log(targetArray[i]);
  }

  // 3. 배열 생성할 문자열 만들기

  var toArrString = 'var targetArray = [';

  for(var i       = 0, len = targetArray.length; i < len; i++)
    toArrString += '"' + targetArray[i].url + '", ';

  toArrString += '];'

  // 4. 3 에서 만들어진 배열 복사 붙여넣기, jquery 붙여넣기 http://code.jquery.com/jquery.min.js
  var code        = "";

  for(var i       = 0, len = targetArray.length; i < len; i++) {
    code += '<div class="download-link-box"><div class="url-link-wrapper">';
    code += '<div class="checkbox is-checked"></div><img src="' + targetArray[i].thumbnail + '">';
    code += '<a href="' + targetArray[i].url + '" target="_blank" rel="nofollow" class="y2m">' + targetArray[i].title +'</a></div></div>';
  }

  $('#linklist').html(code);

  addCheckBoxEventListener();
  addDownloadButtonEventListener();
  drawCheckboxCount();
}

function showDownloadModal() {
  $('#download-modal').removeClass('z-minus1');
  $('#download-modal').addClass('z-2');
  $('#download-modal').css('opacity', '0.9');

  loadPlayList();

  return false;
}

function addCheckBoxEventListener() {
  $('.checkbox').on('click', function(event) {
    let $eventTarget = $(event.target);
    console.log($eventTarget.hasClass('is-checked'));
    if($eventTarget.hasClass('is-checked'))
      $eventTarget.removeClass('is-checked');
    else
      $eventTarget.addClass('is-checked');
    drawCheckboxCount();
  });
}

function addDownloadButtonEventListener() {
  $('#download-button').on('click', function() {
    // 5. 다운로드하기
    var $downloadList = $('#linklist .is-checked ~ a');
    for(let i = 0, len = $downloadList.length; i < len; i++) {
       setTimeout(function() {
         $downloadList[i].click();
       }, i * 300);
    }
    $('#download-button').off('click');
  });
}

function drawCheckboxCount() {
  $('#checked-checkbox-count').text($('.is-checked').length);
  $('#checkbox-count').text($('.checkbox').length);
}

function disposeModal() {
  $('#download-modal').removeClass('z-2');
  $('#download-modal').removeAttr('style');
  setTimeout(function() {
    $('#download-modal').addClass('z-minus1');
  }, 1000);
}








exports.disposeModal = disposeModal;
