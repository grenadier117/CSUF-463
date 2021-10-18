import React from 'react';
import styled from 'styled-components';

export function PageNotFound() {
  return (
    <Wrapper>
      <Title>
        4
        <span role="img" aria-label="Crying Face">
          😢
        </span>
        4
      </Title>
      <p>{'Page Not Found'}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;
  span {
    font-size: 3.125rem;
  }
`;
