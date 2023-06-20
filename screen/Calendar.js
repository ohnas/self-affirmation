import React from 'react';
import { styled } from 'styled-components/native';
import { Calendar } from 'react-native-calendars';


const Container = styled.View`
  flex: 1;
  background-color: '#fff';
  align-items: center;
  justify-content: center;
`;

function CalendarScreen() {
  return(
      <Container>
        <Calendar />
      </Container>
  );
}

export default CalendarScreen;