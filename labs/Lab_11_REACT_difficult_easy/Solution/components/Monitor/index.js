import React from 'react';
import styled from 'styled-components';

const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: #dddcdd;
  background-color: #2c3e50;
  padding: 16px;
`;

const TextWrapper = styled.span`
    font-size: 32px;
    font-weight: bold;
`;

const TitleWrapper = styled(TextWrapper)`
    margin: 8px;
    color: white;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonWrapper = styled('button')`
  color: ${props => props.danger ? '#1E1F21' : '#1E1F21'};
  border: 1px solid ${props => props.danger ? '#b50d26' : '#1E1F21'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
  border-radius: 5px;
  background-color: ${props => props.danger ? '#b50d26' : '#3498db'};
`;

const TodayButton = styled(ButtonWrapper)`
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
  background-color: #b50d26;
`;

const Krujok = styled(TextWrapper)`
color: #b50d26;
`;

const Monitor = ({ today, prevHandler, curHandler, nextHandler }) => {
    return (
        <DivWrapper>
            <div>
                <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
                <Krujok>
                    <TextWrapper>{today.format('YYYY')}</TextWrapper>
                </Krujok>
            </div>
            <ButtonsWrapper>
                <ButtonWrapper onClick={prevHandler}><FaChevronLeft /></ButtonWrapper>
                <TodayButton onClick={curHandler}>today</TodayButton>
                <ButtonWrapper onClick={nextHandler}><FaChevronRight /></ButtonWrapper>
            </ButtonsWrapper>
        </DivWrapper>
    );
}

export { Monitor };