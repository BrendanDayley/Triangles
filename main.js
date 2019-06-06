function isValid(side) {
    removeError(side.id)
    $("#message").remove();
    
    error = "";
    valid = true;
    if (side.value == ""){
        error = "must contain a value"
    } else if (isNaN(side.value)) {
        error = "Must input a number"
    }

    //check all inputs for ints before going to the valid triangle function
    $("input").each(function() {
        var element = $(this);
        if (element.val() == ""){
            valid = false;
        } else if (isNaN(element.val())){
            valid = false;
        }
    })
    var message = "";
    if (valid) {
        message = validTriangle()
    } else {
        addError(side, error);
    }

    if (message != "") {
        $("#sides").after("<p id='message' class='message'>"+message+"</p>")
    }
}

function addError(elem, error){
    $("#" + elem.id).after("<span class='error'>"+error+"</span>")
}

function removeError(side){
    $("#" + side).next('.error').remove();
}

function validTriangle(){
    sideA = parseInt($("#sideA").val());
    sideB = parseInt($("#sideB").val());
    sideC = parseInt($("#sideC").val());

    if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) { 
        return "Not a valid triangle";
    } else {
        type = classifyTriangle(sideA, sideB, sideC);
        return "These side lengths produce a valid " + type + " triangle";
    }
}

function classifyTriangle(sideA, sideB, sideC) {
    if (sideA === sideB && sideB === sideC) {
        return 'equilateral'
    } else if (sideA === sideB || sideA === sideC || sideB === sideC) {
        return 'isosceles'
    } else if (pythag(sideA, sideB, sideC)){
        return 'Right'
    } else {
        return '';
    }
}

// test for right triangles
function pythag(sideA, sideB, sideC) {
    if(sideA * sideA + sideB * sideB == sideC * sideC) {
        return true;
    }
    if(sideC * sideC + sideB * sideB == sideA * sideA) {
        return true;
    }
    if(sideA * sideA + sideC * sideC == sideB * sideB) {
        return true;
    }

    return false;
}