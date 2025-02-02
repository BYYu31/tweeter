/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  loadtweets();
  $("#error-nothing").hide();
  $("#error-too-long").hide();
  // something happens when you submit
  $("form").on("submit", (event) => {
    event.preventDefault();
    if (!$("#tweet-text").val() || $("#tweet-text").val().trim() === "") {
      $('#error-nothing').slideDown('slow');
      $("#error-too-long").hide();
    } else if ($("#tweet-text").val().length > 140) {
      $("#error-too-long").slideDown('slow');
      $("#error-nothing").hide();
    } else {
      $("#error-nothing").hide();
      $("#error-nothing").hide();
      postTweetData();
    }
  });
});


// post tweets
const postTweetData = () => {
  const data = $("form").serialize();
  //console.log(data);
  $.post("/tweets/", data).then((result) => {
    //console.log(result);
    
    loadtweets();
    $(".counter").html('140');
    $("#error-nothing").hide();
    $("#error-too-long").hide();
    $("form")[0].reset();
  });
};

const createTweetElement = function(tweet) {
  const $tweetElement = `
  <article class="tweet">
    <header class="tweet-header">
      <div>
        <img class="display" src="${tweet.user.avatars}" />
        <h3>${tweet.user.name}</h3>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <span class="tweet">
      ${escape(tweet.content.text)}
    </span>
    <footer class="tweet-footer" >
    <span class="timeago">${timeago.format(tweet.created_at)}</span>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
    </article>
  `;
  return $tweetElement;
};

const renderTweets = function(tweetArr) {
  $(".tweets-container").empty();
  for (let tweet of tweetArr) {
    let $tweetElement = createTweetElement(tweet);
    $('.tweets-container').prepend($tweetElement);
  }
};

// get tweets
const loadtweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: (result) => {
      // console.log(result);
      // console.log('yes sir~');
      renderTweets(result);
    },
    error: (error) => {
      console.log("lolz you have failed, ", error);
    }
  });
};
