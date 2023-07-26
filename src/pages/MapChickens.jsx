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
                return [29, 47.7];
                break;
            case 'winston-salem':
                return [29, 43.7];
                break;
            case 'raleigh':
                return [34.5, 59.6];
                break;
        }
        
        // else, return 0-85% Y, 0-90% X
        return [Math.random()*85, Math.random()*90]
    }
  
    useEffect(getNewChicken, []);
    
    function Pin({ chicken }) {
        const coords = getChickenCoordinate(chicken);

        return (
            <div className="MY-pin-container" style={{top: (coords[0]) + "%", left: coords[1] + "%"}}>
                <img src="src\assets\pin.png" alt="pin image" className="MY-pin" />
                <div className="MY-pin--chicken">
                    <img src={chicken.imgurl} alt="chicken image" />
                </div>
            </div>
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
                        {_.map(chickens, c => <Pin chicken={c}/>)}
                        <img src="src\assets\nc-map.png" alt="north carolina map" className="MY-map" />
                    </div>
                    
                </>    
            ) : (
            "No more chickens to rate."
            )}
        </div>
    );
}

export default MapChickens;