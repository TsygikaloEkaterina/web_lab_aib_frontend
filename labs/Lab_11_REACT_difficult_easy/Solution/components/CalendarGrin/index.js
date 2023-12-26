import React from 'react';
import styled from 'styled-components';
import moment from "moment";

const GredWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-gap: 1px;
    background-color:${props=>props.isHeader?'#1e1f21':'#404040'};
    ${props=>props.isHeader&& 'border-bottom:1px solid #404040 '};
`;

const CellWrapper = styled.div`
    min-width : 140px;
    min-height : ${props=>props.isHeader?'24px':'80px'};
    background-color: ${props=>props.isWeekend?'#272829':'#1e1f21'};
    color: ${props=>props.isSelected?'#dddcdd':'#555759'};
`;

const RowInCell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props=>props.justifyСontent?props.justifyСontent:'flex-start'};
    ${props=>props.pr && `padding-left:${props.pr}px`};
`;

const DayWrapper = styled.div`
    height: 33px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    cursor: pointer;
`;

const ShowDayWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const EventListWrapper = styled.ul`
    margin: unset;
    list-style-position: inside;
    padding-left: 4px;
`;

const EventButtonWrapper = styled.button`
    position: relative;
    left: -14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 114px;
    border: unset;
    background: unset;
    color: #dddddd;
    cursor: pointer;
    margin: 0;
    padding: 0;
`;


const CurDay = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #b50d26;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const CalendarGrid = ({ startDay, today, events, openFormHandler }) => {
    const totalDays = 42;
    const day = startDay.clone().subtract(1,'day');
    const daysArray = [...Array(totalDays)].map(()=>day.add(1,'day').clone());
    const isCurrentDay = (day)=>moment().isSame(day, 'day');
    const isSelected = (day)=>today.isSame(day, 'month');
    return(
        <>
           <GredWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader isSelected key={i}>
                        <RowInCell justifyСontent={'flex-end'} pr={8}>
                            <CurDay>{moment().day(i + 1).format('ddd')}</CurDay>
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GredWrapper>
            <GredWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            key={dayItem.unix()}
                            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                            isSelected={isSelected(dayItem)}
                        >
                            <RowInCell justifyСontent={'flex-end'}>
                                <ShowDayWrapper>
                                    <DayWrapper onClick={() => openFormHandler('Create', dayItem)}>
                                        {
                                            isCurrentDay(dayItem)
                                                ? <CurDay>{dayItem.format('D')}</CurDay>
                                                : dayItem.format('D')
                                        }
                                    </DayWrapper>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        events
                                            .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                            .map(event => (
                                                <li key={event.id}>
                                                    <EventButtonWrapper onClick={() => openFormHandler('Update', event)}>
                                                        {event.title}
                                                    </EventButtonWrapper>
                                                </li>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </GredWrapper>
        </>
    );
}

export { CalendarGrid };