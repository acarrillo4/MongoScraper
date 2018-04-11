$(document).ready(function () {
    $(".btn-save").on("click", function (event) {
        var id = $(this).data("id");
        var state = $(this).data("saved");
        var newState = {
            saved: state
        };

        $.ajax({
            url: `/api/news/${id}`,
            method: "PUT",
            data: newState
        }).then(function (dbArticle) {
            location.reload();
        });
    });

    $(".btn-delete").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax({
            url: `/api/news/${id}`,
            method: "DELETE"
        }).then(function () {
            location.reload();
        });
    });

    $(".btn-comment").on("click", function (event) {
        var id = $(this).data("id");
        $(".btn-submit").data("id", id);
        $(".note").empty();
        $("#comment").val('');
        $("#comment-modal").css("display", "block");

        $.ajax({
            url: `/api/news/comment/display/${id}`,
            method: "GET"
        }).then(function (noteArray) {
            if (noteArray.length > 0) {
                noteArray.reverse().forEach(function (note) {
                    var comment = note.comment;
                    var _id = note._id;
                    $(".note").append(`<div class="row commentDiv"><div class="col-md-2"></div><div class="col-md-1 btn-div"><button type="button" class="btn btn-info" id="comment-delete" data-id="${_id}">DELETE</button></div><div class="col-md-7 border"><p>${comment}</p></div><div class="col-md-2"></div></div>`);
                });
            } else {
                $(".note").append(`<div class="row commentDiv"><div class="col-md-3"></div><div class="col-md-9"><p>There are currently no comments on this article to display</p></div></div>`);
            }
        });

    });

    $(".btn-submit").on("click", function (event) {
        event.preventDefault()
        var id = $(this).data("id");
        
        $.ajax({
            url: `/api/news/comment/save/${id}`,
            method: "POST",
            data: {
                comment: $("#comment").val().trim()
            }
        }).then(function (data) {
            $("#comment").val('');
            $(".note").empty();
            $.ajax({
                url: `/api/news/comment/display/${id}`,
                method: "GET"
            }).then(function (noteArray) {
                if (noteArray.length > 0) {
                    noteArray.reverse().forEach(function (note) {
                        var comment = note.comment;
                        var _id = note._id;
                        $(".note").append(`<div class="row commentDiv"><div class="col-md-2"></div><div class="col-md-1 btn-div"><button type="button" class="btn btn-info" id="comment-delete" data-id="${_id}">DELETE</button></div><div class="col-md-7 border"><p>${comment}</p></div><div class="col-md-2"></div></div>`);
                    });
                } else {
                    $(".note").append(`<div class="row commentDiv"><div class="col-md-3"></div><div class="col-md-9"><p>There are currently no comments on this article to display</p></div></div>`);
                }
            });
        });
    });

    $(".close").on("click", function (event) {
        $("#comment-modal").css("display", "none");
    });
});

$(document).on("click", "#comment-delete", function (event) {
    event.preventDefault();
    var id = $(this).data("id");

    $.ajax({
        url: `/api/news/comment/delete/${id}`,
        method: "DELETE"
    }).then(function (data) {
        location.reload();
    });
});