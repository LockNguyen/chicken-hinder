import _ from "lodash";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Alert, Button, CardImg, Container, Row } from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { downdootChicken, getAllChickens, updootChicken } from "../utils/api";

function MapChickens() {
    const [loading, setLoading] = useState(false);
    const [chickens, setChickens] = useState([]);
    const [index, setIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
  
    const chicken = chickens[index];
  
    function getNewChicken() {
      setErrorMsg(null);
      setLoading(true);
      getAllChickens()
        .then((data) => setChickens(_.shuffle(data)))
        .catch((e) => setErrorMsg(e))
        .finally(() => setLoading(false));
    }

    console.log(chicken);

    function getChickenCoordinate(chicken) {
        const loc = _.toLower(chicken.location);

        // Greensboro
        // Winston-Salem
        // Raleigh
        switch (loc) {
            case 'greensboro':
                return [0, 1];
            case 'winston-salem':
                return [0, 1];
            case 'raleigh':
                return [0, 1];
        }
        
        // else, return 0-90% X, 0-90% Y
        return [Math.floor(Math.random()*90), Math.floor(Math.random()*90)]
    }
  
    useEffect(getNewChicken, []);
    
    function Pin() {
        return (
            <>
                <img src="src\assets\pin.png" alt="pin image" className="MY-pin" />
                <div className="MY-pin--chicken">
                    <img src={chicken.imgurl} alt="chicken image" />
                </div>
            </>
        )
    }

    return (
        <div>
            <Header />
            {loading ? <LoadingSpinner /> : null}
            {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
            {!loading && !errorMsg && index <= chickens.length - 1 ? (
                <>
                    <div className="MY-container">
                        <img src="src\assets\nc-map.png" alt="north carolina map" className="MY-map" />
                    </div>
                    <Pin />
                </>    
            ) : (
            "No more chickens to rate."
            )}
        </div>
    );
}

export default MapChickens;