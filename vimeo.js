//Coding Videos Pause when lightbox is close functions
function pause_video() {
  var player = document.getElementById("vimeovid1");
  var data = { method: "pause" };
  player.contentWindow.postMessage(JSON.stringify(data), "*");

  var player = document.getElementById("vimeovid2");
  var data = { method: "pause" };
  player.contentWindow.postMessage(JSON.stringify(data), "*");

  var player = document.getElementById("vimeovid3");
  var data = { method: "pause" };
  player.contentWindow.postMessage(JSON.stringify(data), "*");
}

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

//Video Section Playlist
var apiEndpoint = "http://vimeo.com/api/v2/";
var oEmbedEndpoint = "http://vimeo.com/api/oembed.json";
var oEmbedCallback = "switchVideo";
var videosCallback = "setupGallery";
// var vimeoUsername = "21631645";

// Get the user's videos
$(document).ready(function () {
  $.getScript(apiEndpoint + "channel/" + "611445" + "/videos.json?callback=" + videosCallback);
});

function getVideo(url) {
  var clientWidth = document.getElementById("videoEmbed").clientWidth;
  $.getScript(oEmbedEndpoint + "?url=" + url + `&width=${clientWidth}` + "&callback=" + oEmbedCallback);

  window.addEventListener("resize", function (event) {
    var clientWidth = document.getElementById("videoEmbed").clientWidth;
    $.getScript(oEmbedEndpoint + "?url=" + url + `&width=${clientWidth}` + "&callback=" + oEmbedCallback);
  });
}

function setupGallery(videos) {
  // Load the first video
  getVideo(videos[0].url);

  // Add the videos to the gallery
  for (var i = 0; i < videos.length; i++) {
    var html =
      '<li><a href="' + videos[i].url + '"><img src="' + videos[i].thumbnail_medium + '" class="videoThumb" />';

    $("#videoThumbs ul").append(html);
  }

  // Switch to the video when a thumbnail is clicked
  $("#videoThumbs a").click(function (event) {
    event.preventDefault();
    getVideo(this.href);
    return false;
  });
}

function switchVideo(video) {
  $("#videoEmbed").html(unescape(video.html));
}

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

Vlitejs.registerProvider("vimeo", VlitejsVimeo);

new Vlitejs("#player", {
  options: {
    controls: true,
    autoplay: false,
    playPause: true,
    progressBar: true,
    time: true,
    volume: true,
    fullscreen: true,
    poster: "https://yoriiis.github.io/cdn/static/vlitejs/demo-poster.jpg",
    bigPlay: true,
    playsinline: true,
    loop: false,
    muted: false,
    autoHide: true,
    providerParams: {},
  },
  provider: "vimeo",
  onReady: function (player) {
    console.log(player);

    player.on("play", () => console.log("play"));
    player.on("pause", () => console.log("pause"));
    player.on("progress", () => console.log("progress"));
    player.on("timeupdate", () => console.log("timeupdate"));
    player.on("volumechange", () => console.log("volumechange"));
    player.on("enterfullscreen", () => console.log("enterfullscreen"));
    player.on("exitfullscreen", () => console.log("exitfullscreen"));
    player.on("ended", () => console.log("ended"));
  },
});
