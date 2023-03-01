// fetching results based on filter params.
// need to add a section which will allow user to input params
fetch(`/cars/search?${params}`)
  .then((response) => response.json())
  .then((data) =>
    // this is where we would dynamically create the cards
    console.log(data)
  )
  .catch((error) => console.error(error));
