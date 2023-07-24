// Importing required modules and components
import _ from "lodash";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Alert, Button, Container, Row, Carousel, CarouselItem, CarouselIndicators, CarouselControl, CarouselCaption } from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { downdootChicken, getAllChickens, updootChicken } from "../utils/api";

// Define the main functional component RateChickens
function RateChickens() {
  // Define state variables using useState hook
  const [loading, setLoading] = useState(false); // State to track loading state
  const [chickens, setChickens] = useState([]); // State to store the array of chickens
  const [index, setIndex] = useState(0); // State to keep track of the current chicken index being rated
  const [errorMsg, setErrorMsg] = useState(null); // State to hold error message, if any
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Get the current chicken object being rated based on the current index
  const chicken = chickens[activeIndex];

  // Function to fetch a new set of shuffled chickens from the API
  function getNewChicken() {
    setErrorMsg(null); // Clear any previous error messages
    setLoading(true); // Set loading to true to show loading spinner
    // Fetch all chickens from the API and shuffle the data to get a random order
    getAllChickens()
      .then((data) => setChickens(_.shuffle(data))) // Update the chickens state with shuffled data
      .catch((e) => setErrorMsg(e)) // If an error occurs, set the error message state
      .finally(() => setLoading(false)); // Set loading to false after the API call finishes
  }

  // useEffect hook is used to fetch new chickens when the component mounts
  useEffect(getNewChicken, []);

  // Function to handle the updoot (upvoting) of the current chicken
  function handleUpdoot() {
    setErrorMsg(null); // Clear any previous error messages
    setLoading(true); // Set loading to true to show loading spinner
    // Updoot the current chicken by its ID and then move to the next one
    updootChicken(chicken.id)
      .then(() => setIndex(index + 1)) // Move to the next chicken in the array
      .catch((e) => setErrorMsg(e)) // If an error occurs, set the error message state
      .finally(() => setLoading(false)); // Set loading to false after the API call finishes
  }

  // Function to handle the downdoot (downvoting) of the current chicken
  function handleDowndoot() {
    setErrorMsg(null); // Clear any previous error messages
    setLoading(true); // Set loading to true to show loading spinner
    // Downdoot the current chicken by its ID and then move to the next one
    downdootChicken(chicken.id)
      .then(() => setIndex(index + 1)) // Move to the next chicken in the array
      .catch((e) => setErrorMsg(e)) // If an error occurs, set the error message state
      .finally(() => setLoading(false)); // Set loading to false after the API call finishes
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === chickens.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? chickens.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = chickens.map((c) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={c.imgurl}
    >
      <img src={c.imgurl} />
      <CarouselCaption
        captionText={c.description}
        captionHeader={c.name}
      />
    </CarouselItem>
  ));




  

  return (
    <div>
      <Header /> {/* Render the Header component */}
      {/* If loading state is true, show the LoadingSpinner component */}
      {loading ? <LoadingSpinner /> : null}
      {/* If errorMsg state is not null, show an error message using the Alert component */}
      {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
      {/* If loading is false, errorMsg is null, and there are chickens left to rate */}
      {!loading && !errorMsg && index <= chickens.length - 1 ? (
        // Render the container with information about the current chicken being rated
        <Container>
          <Row>
            {/* Display the image of the current chicken
            <div className="p-2 bg-light d-flex align-items-center justify-content-center">
              <div className="chikn-img d-flex align-items-center justify-content-center">
                <img src={chicken.imgurl} alt={`Chicken ${index + 1}`} />
              </div>
            </div> */}

            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              <CarouselIndicators
                items={chickens}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>

            <div style={{ height: "220px" }}>
              {/* Display the name and location of the current chicken */}
              <h2 className="mt-3 d-flex align-items-baseline">
                {chicken.name}
                <small className="text-sm text-muted ms-3 d-flex align-items-center">
                  <FaMapMarkerAlt style={{ width: 20 }} className="me-2" />
                  {chicken.location}
                </small>
              </h2>
              <hr />
              <h6>Description</h6>
              <p>{chicken.description}</p>
            </div>
            <div className="d-flex justify-content-between px-2 py-4">
              {/* Render buttons to downdoot and updoot the current chicken */}
              <Button
                outline
                color="primary"
                size="lg"
                className="shadow-sm"
                onClick={handleDowndoot}
              >
                🚫 Cool Ranch 🥶
              </Button>
              <Button
                outline
                color="danger"
                size="lg"
                className="shadow-sm"
                onClick={handleUpdoot}
              >
                ❤️ Spicy Buffalo 🥵
              </Button>
            </div>
          </Row>
        </Container>
      ) : (
        // If there are no more chickens to rate, display this message
        "No more chickens to rate."
      )}
    </div>
  );
}

// Export the RateChickens component as the default export
export default RateChickens;
