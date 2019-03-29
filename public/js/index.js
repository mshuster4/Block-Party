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

  refreshNoseyPosts();

  $(document).on("click", "#nosey-submit-button", handleNoseyPostSubmit);

  $noseyPostList.on("click", ".delete", handleNoseyDeleteBtnClick);
});

// The API object contains methods for each kind of request we'll make
var API = {
  savePost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/blockParty",
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
      url: "/api/blockParty/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshNoseyPosts = function() {
  API.getPost().then(function(data) {
    console.log(data);
    var $refresh = data.map(function(Post) {
      var $postDiv = $("<div>");
      var $headerDiv = $("<div>");
      var $bodyDiv = $("<div>");
      var $footerDiv = $("<div>");
      var $timeStamp = $("<p>");
      var $postTitle = $("<h1>");
      var $bodyText = $("<p>");
      var $button = $("<button>");

      $postDiv.addClass("card");
      $headerDiv.addClass("card-header");
      $bodyDiv.addClass("card-body");
      $footerDiv.addClass("card-footer");

      $postTitle.text(Post.title);
      $bodyText.text(Post.body);
      $timeStamp.text(Post.createdAt);
      $button.attr("data-id", Post.id);
      $button.addClass("btn btn-danger float-right delete");
      $button.text("ｘ");
      $footerDiv.append($button);

      $headerDiv.append($postTitle);
      $bodyDiv.after($headerDiv);
      $bodyDiv.append($bodyText);
      $footerDiv.after($bodyDiv);
      $button.after($timeStamp);
      $footerDiv.append($timeStamp);
      $footerDiv.append($button);

      $postDiv.append($headerDiv);
      $postDiv.append($bodyDiv);
      $postDiv.append($footerDiv);

      return $postDiv;
    });

    $noseyPostList.empty();
    $noseyPostList.append($refresh);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleNoseyPostSubmit = function(event) {
  event.preventDefault();

  var noseyPost = {
    title: $noseyPostTitle.val().trim(),
    category: $noseyPostCategory.val(),
    body: $noseyPostBody.val().trim(),
  };

  var $noseyModal = $("#nosey-modal");

  console.log(noseyPost);

  API.savePost(noseyPost).then(function() {
    $noseyModal.modal("hide");
    refreshNoseyPosts();
  });

  $noseyPostTitle.val("");
  $noseyPostCategory.val("");
  $noseyPostBody.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleNoseyDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");
  console.log(idToDelete);
  API.deletePost(idToDelete).then(function() {
    refreshNoseyPosts();
  });
};

// Add event listeners to the submit and delete buttons

$(document).on("click", "#angels-submit-button", function(event) {
  event.preventDefault();
  console.log("clicked");
});

$(document).on("click", "#beggars-submit-button", function(event) {
  event.preventDefault();
  console.log("clicked");
});
