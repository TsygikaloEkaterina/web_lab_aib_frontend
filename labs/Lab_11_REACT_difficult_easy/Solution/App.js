import moment from "moment";
import { useState } from "react";
import styled from 'styled-components';
import { Monitor } from "./components/Monitor";
import { CalendarGrid } from "./components/CalendarGrid";
import { Header } from "./components/Header";

const ShadowWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border-top:1px solid #737373 ;
  border-left: 1px solid #434343;
  border-right:1px solid #434343 ;
  border-bottom:1px solid #434343 ;
  box-shadow: 0 0 0 1px #1a1a1a, 0 0px 20px 6px #888;
`;

const FormPositionWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  min-width: 320px;
  height: 132px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow: 0 0 0 1px #1a1a1a, 0 0px 20px 6px orange;
  box-shadow:unset;
`;

const EventTitle = styled.input`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled('textarea')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

const ButtonsWrapper = styled.div`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled('button')`
  color: ${props => props.danger ? '#1E1F21' : '#1E1F21'};
  border: 1px solid ${props => props.danger ? '#ff9900' : '#1E1F21'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
  border-radius: 5px;
  background-color: ${props => props.danger ? '#ff9900' : '#e6e6e6'};
`;


function App() {
  const [events, setEvents]=useState([
    {'id':1,'title':'дело1','description':'дело1','date':1702106497 },
    {'id':2,'title':'дело2','description':'дело2','date':1703106599 },
    {'id':3,'title':'дело3','description':'дело3','date':1703110597 },
    {'id':4,'title':'дело4','description':'дело4','date':1704109597 }
  ]);
  const [event, setEvent]=useState();
  const [isShowForm, setShowForm]=useState(false);
  const [method, setMethod] = useState(null)

  moment.updateLocale("en", { week: { dow: 1 } });
  const [today,setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = ()=> setToday(prev=>prev.clone().subtract(1,'month'));
  const curHandler = ()=> setToday(moment());
  const nextHandler = ()=> setToday(prev=>prev.clone().add(1,'month'));

  const openFopmHandler = (method, event) =>{
    setShowForm(true);
    method==='Create'?setToday(event):setEvent(event);
    setMethod(method);
  }

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  }

  const changeEventHandler = (text, field) => {
    if(method === 'Update')
      setEvent(prevState => ({
        ...prevState,
        [field]: text
    }))
    else{
      setEvent(prev=>({...prev, [field]: text, 'date': today.format('X'), 'id':moment().format('X')}))
    }
  }

  const eventAddHandler = ()=>{
    if(method==='Update'){
      setEvents(events.map(e=>{
        if(e.id === event.id){
          e['title'] = event['title'];
          e['description'] = event['description'];
        }
        return e;
      }));
    }else{
      setEvents([...events, event]);
    }
    setShowForm(false);
  }

  const removeEventHandler = ()=>{
    setEvents(events.filter(e=>e.id!==event.id));
    setShowForm(false);
  }

  return (
    <>
      {
        isShowForm
        ?(
          <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={e=>e.stopPropagation()}>
              <EventTitle
                value={event?event.title:null}
                onChange={e=>changeEventHandler(e.target.value,'title')}
                placeholder="title"
              />
              <EventBody
               value={event?event.description:null}
               onChange={e=>changeEventHandler(e.target.value,'description')}
               placeholder="description"
              />
              <ButtonsWrapper>
                <ButtonWrapper onClick={cancelButtonHandler} >Cancel</ButtonWrapper>
                <ButtonWrapper onClick={eventAddHandler}>{method}</ButtonWrapper>
                {
                  method === 'Update' ? (
                    <ButtonWrapper danger={true} onClick={removeEventHandler}>Remove</ButtonWrapper>
                  ) : null
                }
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
        )
        :null
      }
      <ShadowWrapper>
          <Header/>
          <Monitor
            today={today}
            prevHandler={prevHandler}
            curHandler={curHandler}
            nextHandler={nextHandler}
          />
          <CalendarGrid
            startDay={startDay}
            today={today}
            events={events}
            openFormHandler ={openFopmHandler}
          />
      </ShadowWrapper>
    </>
  );
}

export default App;