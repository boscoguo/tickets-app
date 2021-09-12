import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEvent } from "../../action/eventsAction";
import CardsContainer from "./cardsContainer";
import BottomPart from "./bottomPart";
import "./leftPanel.scss";

const LeftPanel = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvent(0));
  },[])
  return (
    <div className="left">
      <CardsContainer />
      <BottomPart />
    </div>
  );
};
export default LeftPanel;
