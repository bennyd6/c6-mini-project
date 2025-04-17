import React from 'react';
import styled from 'styled-components';

const EventCard = ({ image, eventName, hostedBy, date, venue, onBookNow }) => {
  return (
    <Card>
      <EventImage src={image} alt={eventName} />
      <CardContent>
        <EventName>{eventName}</EventName>
        <EventDetails>
          <Label>Hosted by:</Label> <span>{hostedBy}</span>
        </EventDetails>
        <EventDetails>
          <Label>Date:</Label> <span>{new Date(date).toLocaleString()}</span>
        </EventDetails>
        <EventDetails>
          <Label>Venue:</Label> <span>{venue}</span>
        </EventDetails>
        <BookButton onClick={onBookNow}>Book Now</BookButton>
      </CardContent>
    </Card>
  );
};

export default EventCard;



const Card = styled.div`
  width: 320px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 0px 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: #fff;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const EventName = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
`;

const EventDetails = styled.p`
  margin: 8px 0;
  color: #555;
  font-size: 0.95rem;
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

const BookButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 10px;
  background-color: #ff5a5f;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e74c3c;
  }
`;
