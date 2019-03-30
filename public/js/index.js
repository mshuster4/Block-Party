var $noseyPostTitle;
var $noseyPostBody;
var $noseyPostCategory;
var $noseyPostList;

var $angelPostTitle;
var $angelPostBody;
var $angelPostCategory;
var $angelPostList;

var $beggarPostTitle;
var $beggarPostBody;
var $beggarPostCategory;
var $beggarPostList;

var angelURL;
var noseyURL;
var beggarURL;

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

  $beggarPostTitle = $("#beggar-title");
  $beggarPostBody = $("#beggar-body");
  $beggarPostCategory = $("#beggar-category");
  $beggarPostList = $("#beggar-posts-list");

  angelURL = "/api/angelPost/";
  noseyURL = "/api/noseyPost/";
  beggarURL = "/api/beggarPost/";

  refreshPosts($angelPostList, angelURL);
  refreshPosts($noseyPostList, noseyURL);
  refreshPosts($beggarPostList, beggarURL);

  $(document).on("click", "#angel-submit-button", handleAngelPostSubmit);
  $(document).on("click", "#nosey-submit-button", handleNoseyPostSubmit);
  $(document).on("click", "#beggar-submit-button", handelBeggarPostSubmit);

  $angelPostList.on("click", ".delete", handleAngelDeleteBtnClick);
  $noseyPostList.on("click", ".delete", handleNoseyDeleteBtnClick);
  $beggarPostList.on("click", ".delete", handleBeggarDeleteBtnClick);
});

// The API object contains methods for each kind of request we'll make
var API = {
  savePost: function(post, url) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: url,
      data: JSON.stringify(post)
    });
  },
  getPost: function(url) {
    return $.ajax({
      url: url,
      type: "GET"
    });
  },
  deletePost: function(id, url) {
    return $.ajax({
      url: url + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshPosts = function(div, url) {
  API.getPost(url).then(function(data) {
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

  API.savePost(angelPost, angelURL).then(function() {
    $angelModal.modal("hide");
    refreshPosts($angelPostList, angelURL);
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

  API.savePost(noseyPost, noseyURL).then(function() {
    $noseyModal.modal("hide");
    refreshPosts($noseyPostList, noseyURL);
  });

  $noseyPostTitle.val("");
  $noseyPostCategory.val("");
  $noseyPostBody.val("");
};

var handelBeggarPostSubmit = function(event) {
  event.preventDefault();

  var $beggarModal = $("#beggar-modal");

  var $beggarPost = {
    title: $beggarPostTitle.val().trim(),
    category: $beggarPostCategory.val(),
    body: $beggarPostBody.val().trim()
  };

  console.log($beggarPost);

  API.savePost($beggarPost, beggarURL).then(function() {
    $beggarModal.modal("hide");
    refreshPosts($beggarPostList, beggarURL);
  });

  $beggarPostTitle.val("");
  $beggarPostCategory.val("");
  $beggarPostBody.val("");
};

var handleAngelDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");
  console.log(idToDelete);
  API.deletePost(idToDelete, angelURL).then(function() {
    refreshPosts($angelPostList, angelURL);
  });
};

var handleNoseyDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");
  console.log(idToDelete);
  API.deletePost(idToDelete, noseyURL).then(function() {
    refreshPosts($noseyPostList, noseyURL);
  });
};

var handleBeggarDeleteBtnClick = function() {
  var idToDelete = $(this).attr("data-id");
  console.log(idToDelete);
  API.deletePost(idToDelete, beggarURL).then(function() {
    refreshPosts($beggarPostList, noseyURL);
  });
};
