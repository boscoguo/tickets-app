import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../../store/store";
import EventCard from "./eventCard";
import { setMovieId, getEventDetails } from "../../../action/eventsAction";
import { Link } from "react-router-dom";
import "./cardsContainer.scss";

const CardsContainer = () => {
  const eventsState = useSelector(
    (state: RootStore) => state.events.event?.data._embedded.events
  )
  const pageSize = useSelector(
    (state: RootStore) => state.events.event?.data.page.size
  )

  const searchLoading = useSelector((state: RootStore) => state.events.loading);
  const dispatch = useDispatch();

  const handleClick = (id: string) => {
    dispatch(getEventDetails(id));
  };
  const setCurrentItemArr = () => {
    if (eventsState !== undefined) {
      const currentArr = eventsState.map(item => {
        const obj = { id: "", isActive: false };
        obj.id = item.id;
        return obj;
      });
      return currentArr;
    }
  };

  const currentItems = setCurrentItemArr();
  const [card, setCard] = useState(currentItems && [...currentItems]);

  useEffect(() => {
    if (!card && currentItems) {
      setCard(currentItems);
    }
  }, [card, currentItems]);

  return (
    <div className="cards">
      <div className="cards__title">
        <h4 className="cards__title-text">Events</h4>
        <h4 className="cards__title-num">{pageSize}</h4>
      </div>
      {eventsState
        ? eventsState.map((item, index) => {
          const { name, id, dates, _embedded } = item;
          const { venues } = _embedded;
          const { start } = dates;
          const { localDate } = start;
          return (
            <Link to={`/${id}`} key={index}>
              <div onClick={() => handleClick(id)}
              >
                <EventCard
                  name={name}
                  localDate={localDate}
                  venues={venues[0].name}
                  id={id}
                  index={index}
                  card={card}
                />
              </div>
            </Link>
          );
        })
        : searchLoading
          ? "Loading..."
          : "no results"}
    </div>
  );
};

export default CardsContainer;
