/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
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
        ${tweet.content.text}
      </span>
      <footer class="tweet-footer" >
      <span>${tweet.created_at}</span>
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
    for (let tweet of tweetArr) {
      let $tweetElement = createTweetElement(tweet);
      $('.tweets-container').append($tweetElement);
    } 
  };

  renderTweets(data);

  // something happens when you submit
  $("form").on("submit", (event) => {
    event.preventDefault();
    console.log("here");
    postTweetData();
  });
});


// post tweets
const postTweetData = () => {
  const data = $("form").serialize();
  console.log(data);
  $.post("/tweets/", data).then((result) => {
    console.log(result);
  })
}
