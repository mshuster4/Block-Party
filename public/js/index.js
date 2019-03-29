var $noseyPostTitle;
var $noseyPostBody;
var $noseyPostCategory;
var $noseyPostList;

$(document).ready(function() {
  // Get references to page elements
  $noseyPostTitle = $("#nosey-title");
  $noseyPostBody = $("#nosey-body");
  $noseyPostCategory = $("#nosey-category");
  $noseyPostList = $("#nosey-posts-list");
  refreshPosts();
});

// The API object contains methods for each kind of request we'll make
var API = {
  savePost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/blockParty",
      data: JSON.stringify(post)
    });
  },
  getPost: function() {
    return $.ajax({
      url: "/api/blockParty",
      type: "GET"
    });
  },
  deletePost: function(id) {
    return $.ajax({
      url: "api/blockParty" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshPosts = function() {
  API.getPost().then(function(data) {
    console.log(data);
    var $refresh = data.map(function(Post) {
      var $div = $("<div>");
      var $h1 = $("<h1>");
      var $p = $("<p>");
      var $h2 = $("<h2>");
      /*
        .attr({
          class: "list-group-item",
          "data-id": Post.id
        })
      */
      $h1.text("title: " + Post.title);
      $h2.text("category: " + Post.category);
      $p.text("body: " + Post.body);
      /*
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");
      $li.append($button);
      */
      $h1.append($h2);
      $h2.append($p);
      $div.append($h1);


      return $div;
    });

    $noseyPostList.empty();
    $noseyPostList.append($refresh);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var val = $noseyPostTitle.val();
  var noseyPost = {
    title: val.trim(),
    category: $noseyPostCategory.val(),
    body: $noseyPostBody.val().trim()
  };

  console.log(noseyPost);

  /*
  if (!(noseyPost.text && noseyPost.description)) {
    alert("You must enter an example text and description!");
    return;
  }
  */

  API.savePost(noseyPost).then(function() {
    refreshPosts();
  });

  $noseyPostTitle.val("");
  $noseyPostCategory.val("");
  $noseyPostBody.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
/*
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
*/

$(document).on("click", "#angels-submit-button", function(event) {
  event.preventDefault();
  console.log("clicked");
});

$(document).on("click", "#beggars-submit-button", function(event) {
  event.preventDefault();
  console.log("clicked");
});

$(document).on("click", "#nosey-submit-button", handleFormSubmit);
