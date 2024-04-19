var selectDropdown = document.getElementById("wordclouds");
var displayedImage = document.getElementById("wcs");

selectDropdown.addEventListener("change", function() {
    // find selected neighborhood
    var selectedValue = selectDropdown.value;
    
    // update image
    displayedImage.src = selectedValue;
});
