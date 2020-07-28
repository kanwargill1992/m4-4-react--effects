import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";

import Item from "./Item";
import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(1000);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  useEffect(() => {
    document.title = `${numCookies.toLocaleString(
      "en-CA"
    )} cookies - Cookie Clicker`;
  }, [numCookies]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies((numCookies) => numCookies + numOfGeneratedCookies);
  }, 1000);

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalCookiesPerTick = 0;
    items.forEach(
      (item) => (totalCookiesPerTick += purchasedItems[item.id] * item.value)
    );
    return totalCookiesPerTick;
  };

  const handleCookieClick = () => {
    setNumCookies((numCookies) => numCookies + 1);
  };

  const handleItemClick = ({ id, name, cost, value }) => {
    if (numCookies >= cost) {
      setNumCookies((numCookies) => numCookies - cost);
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
    } else {
      window.alert(`You can't afford ${name} yet!`);
    }
  };

  const handleKeydown = (ev) => {
    ev.preventDefault();
    ev.code === "Space" && handleCookieClick();
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>

        <Button onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            cost={item.cost}
            value={item.value}
            numOwned={purchasedItems[item.id]}
            handleItemClick={() => handleItemClick(item)}
          />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
const Cookie = styled.img`
  width: 200px;
`;
const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;
const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;
const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;
const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;
export default Game;
