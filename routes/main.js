function Search() {
    var searchInput = document.getElementById("search");
    var searchFilter = searchInput.value.toUpperCase();
    var searchItems = gameTable.getElementsByTagName("tr");
  
    for(var i = 0; i < searchItems.length; i++) {
      var searchItem = searchItems[i].getElementsByTagName("td")[1];
      var searchText = searchItem.textContent || searchItem.innerText;
  
      if (searchText.toUpperCase().indexOf(searchFilter) > -1) {
        searchItems[i].style.display = "";
      } else {
        searchItems[i].style.display = "none";
      }
    }
  }