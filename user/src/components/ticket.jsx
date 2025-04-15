import React from 'react';
import styled from 'styled-components';
import QRCode from "react-qr-code";
const TicketCard = ({ image, eventName, status, date, hostedBy }) => {
  return (
    <TicketWrapper>
      <Ticket>
        <LeftSection>
          <EventImage src={image} alt="event" />
        </LeftSection>

        <Divider>
          <TopCut />
          <BottomCut />
        </Divider>

        <MiddleSection>
          <EventName>{eventName}</EventName>
          <StatusBadge status={status}>{status}</StatusBadge>
          <EventDate>{new Date(date).toLocaleString()}</EventDate>
          <HostedBy>Hosted by <strong>{hostedBy}</strong></HostedBy>
        </MiddleSection>

        <Divider>
          <TopCut />
          <BottomCut />
        </Divider>

        <RightSection>
          <QRCode value={`${eventName}-${date}`} size={64} />
        </RightSection>
      </Ticket>
    </TicketWrapper>
  );
};

export default TicketCard;



const TicketWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  `;
  
  const Ticket = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 150px;
  background: #fff;
  width: 700px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: 'Segoe UI', sans-serif;
`;

const LeftSection = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EventImage = styled.img``;

const Divider = styled.div`
  width: 20px;
  position: relative;
  background: #f5f5f5;
`;

const TopCut = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
`;

const BottomCut = styled.div`
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
`;

const MiddleSection = styled.div`
  flex: 2;
  padding: 20px;
`;

const EventName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const StatusBadge = styled.div`
  display: inline-block;
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 20px;
  text-transform: uppercase;
  color: white;
  background-color: ${({ status }) =>
    status === 'Live' ? '#27ae60' :
    status === 'Upcoming' ? '#f39c12' :
    '#7f8c8d'};
`;

const EventDate = styled.p`
  margin: 16px 0 8px;
  color: #555;
`;

const HostedBy = styled.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
`;

const RightSection = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
