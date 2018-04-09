// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
    $(".btn-save").on("click", function (event) {
        var id = $(this).data("id");
        var state = $(this).data("saved");
        var newState = {
            saved: state
        };
        //   Send the PUT request.
        $.ajax(`/api/news/${id}`,{
            type: "PUT",
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
});

//     $.ajax({
//         url: `/api/products/${id}`,
//         method: "DELETE"
//     }).then(result=> $(`#${id}`).remove());
// })


// $(".btn").on("click", function () {
//     var id;
//     var btnstate = $(this).data("state");
//     if (btnstate === 0) {
//         $(this).text("Saved To Your Trip");
//         $(this).css('background-color', '#0275d8');
//         $(this).css('border', '2px solid #0275d8');
//         $(this).css('border-color', '#0275d8');
//         $(this).data("state", 1);
//         var info = {
//             name: $(this).data("activityname"),
//             photo: $(this).data("activityphoto"),
//             url: $(this).data("activityurl"),
//             description: $(this).data("activitydescription"),
//             directions: $(this).data("activitydirections"),
//             TripId: tripId
//         };
//         $.post("/api/activity", info, (result) => {
//             id = result.id;
//             $(this).data("activityid", id);
//         })

//     } else {
//         $(this).text("+ Add To My Trip");
//         $(this).css('background-color', '');
//         $(this).css('border', '');
//         $(this).css('border-color', '');
//         $(this).data("state", 0);
//         var info = {
//             name: $(this).data("activityname"),
//             photo: $(this).data("activityphoto"),
//             url: $(this).data("activityurl"),
//             description: $(this).data("activitydescription"),
//             directions: $(this).data("activitydirections"),
//             TripId: tripId
//         };
//         var id = $(this).data("activityid");
//         $.ajax({
//             url: `/api/activity/${id}`,
//             method: "DELETE"
//         }).then(() => {
//             console.log("deleted");
//         });
//     }