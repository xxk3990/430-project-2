const handleError = (message) => {
    $("#movieMessage").css('visibility', 'visible');
    $("#errorMessage").text(message);
};

const redirect = (response) => {
    $("#movieMessage").css('visibility', 'hidden');
    window.location = response.redirect;
}
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function(xhr, status, error) {
            let messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    })
}