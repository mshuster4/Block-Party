var $noseyPostTitle;
var $noseyPostBody;
var $noseyPostCategory;
var $noseyPostList;

var $angelPostTitle;
var $angelPostBody;
var $angelPostCategory;
var $angelPostList;

$(document).ready(function() {
  // Get references to page elements
  $noseyPostTitle = $("#nosey-title");
  $noseyPostBody = $("#nosey-body");
  $noseyPostCategory = $("#nosey-category");
  $noseyPostList = $("#nosey-posts-list");

  $angelPostTitle = $("#angel-title");
  $angelPostBody = $("#angel-body");
  $angelPostCategory = $("#angel-category");
  $angelPostList = $("#angel-posts-list");

  refreshPosts($angelPostList);
  refreshPosts($noseyPostList);

  $(document).on("click", "#angel-submit-button", handleAngelPostSubmit);
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
var refreshPosts = function(div) {
  API.getPost().then(function(data) {
    console.log(data);
    var $refresh = data.map(function(Post) {
      var $postDiv = $("<div>");
      var $headerDiv = $("<div>");
      var $bodyDiv = $("<div>");
      var $footerDiv = $("<div>");
      var $postTitle = $("<h1>");
      var $postCategory = $("<a>");
      var $timeStamp = $("<a>");
      var $linksDiv = $("<nav>");
      var $bodyText = $("<p>");
      var $button = $("<button>");

      $postDiv.addClass("card");
      $headerDiv.addClass("card-header");
      $postTitle.addClass("float-left");
      $bodyDiv.addClass("card-body");
      $footerDiv.addClass("card-footer");
      $linksDiv.addClass("card-link nav-flex-column float-right");
      $button.addClass("btn delete");
      $postCategory.addClass("nav-link nav-link:hover");
      $timeStamp.addClass("nav-link nav-link:hover");

      $postTitle.text(Post.title);
      $bodyText.text(Post.body);
      $timeStamp.attr("href", "#");
      $timeStamp.text("Created At: " + Post.createdAt);
      $postCategory.attr("href", "#");
      $postCategory.text("Category: " + Post.category);
      $button.attr("data-id", Post.id);
      $button.text("Delete");

      $bodyDiv.after($headerDiv);
      $footerDiv.after($bodyDiv);

      $bodyDiv.append($bodyText);
      $linksDiv.append($postCategory);
      $linksDiv.append($timeStamp);
      $headerDiv.append($postTitle);
      $headerDiv.append($linksDiv);
      $footerDiv.append($button);
      $postDiv.append($headerDiv);
      $postDiv.append($bodyDiv);
      $postDiv.append($footerDiv);

      return $postDiv;
    });

    div.empty();
    div.append($refresh);
  });
};

var handleAngelPostSubmit = function(event) {
  event.preventDefault();

  var $angelModal = $("#angel-modal");

  var angelPost = {
    title: $angelPostTitle.val().trim(),
    category: $angelPostCategory.val(),
    body: $angelPostBody.val().trim()
  };

  console.log(angelPost);

  API.savePost(angelPost).then(function(){
    $angelModal.modal("hide");
    refreshPosts($angelPostList);
  });

  $angelPostTitle.val("");
  $angelPostCategory.val("");
  $angelPostBody.val("");
};

var handleNoseyPostSubmit = function(event) {
  event.preventDefault();

  var $noseyModal = $("#nosey-modal");

  var noseyPost = {
    title: $noseyPostTitle.val().trim(),
    category: $noseyPostCategory.val(),
    body: $noseyPostBody.val().trim()
  };

  console.log(noseyPost);

  API.savePost(noseyPost).then(function() {
    $noseyModal.modal("hide");
    refreshPosts($noseyPostList);
  });

  $noseyPostTitle.val("");
  $noseyPostCategory.val("");
  $noseyPostBody.val("");
};

var handleNoseyDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");
  console.log(idToDelete);
  API.deletePost(idToDelete).then(function() {
    refreshPosts($noseyPostList);
  });
};
