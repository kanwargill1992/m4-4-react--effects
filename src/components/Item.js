import React from "react";

import styled from "styled-components";

const Wrapper = styled.button`
  color: black;
  display: flex;
  justify-content: space-between;
  border: none;
`;

const Para = styled.p`
  font-size: 1.4em;
  font-weight: bold;
`;

const Para1 = styled.p`
  color: green;
`;

const Para2 = styled.p`
  font-size: 1.5em;
`;

const Item = ({ name, cost, value, numOwned, handleItemClick }) => {
  return (
    <Wrapper onClick={handleItemClick}>
      <div>
        <Para>{name}</Para>
        <Para1>
          Cost: {cost} cookies. Produces {value} cookie(s)/second.
        </Para1>
      </div>
      <Para2>{numOwned}</Para2>
    </Wrapper>
  );
};

export default Item;
