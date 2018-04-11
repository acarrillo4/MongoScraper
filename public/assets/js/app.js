// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {
    $(".btn-save").on("click", function (event) {
        var id = $(this).data("id");
        var state = $(this).data("saved");
        var newState = {
            saved: state
        };
        //   Send the PUT request.
        $.ajax({
            url: `/api/news/${id}`,
            method: "PUT",
            data: newState
        }).then(function () {
            // Reload the page to get the updated list
            location.reload();
            console.log("Successfully saved");
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
        console.log(id);
        console.log(this);
        $(".btn-submit").data("id", id);
        
        $.ajax({
            url: `/comment/display/${id}`,
            method: "GET"})
        .then(function (data) {
            $("#comment-modal").css("display", "block");
            // $(".note").append(`<p>${data.note}</p>`)
            console.log(data);
        });  
    });


    $(".btn-submit").on("click", function(event) {
        event.preventDefault()
        var id = $(this).data("id");

        $.ajax({
            url: `/api/news/comment/save/${id}`, 
            method: "POST",
            data: {
                comment: $("#comment").val().trim()
            }
            }).then(function (data) {
            console.log("note added");
            console.log(data);
        });
        console.log("Comment after");
    });
    // jQuery used to remove data from modal on close
    $(".close").on("click", function (event) {
        $("#comment-modal").css("display", "none");
        $("#comment").empty();
    });
});

