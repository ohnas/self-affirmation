import React from 'react';
import { styled } from 'styled-components/native';
import { Calendar } from 'react-native-calendars';
import { Dimensions } from 'react-native';
import { DBContext, Affirmation } from '../context';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  background-color: '#fff';
  align-items: center;
  justify-content: center;
`;

function CalendarScreen() {
  const { useQuery } = DBContext;
  const affirmationDatas = useQuery(Affirmation);
  
  return(
    <Container>
      <Calendar 
        style={{width: windowWidth * 0.95}} 
        markingType={'custom'}
        markedDates={{
          '2023-06-19': {
            customStyles: {
              container: {
                backgroundColor: 'red'
              },
              text: {
                color: 'black'
              }
            }
          },
          '2023-06-20': {
            customStyles: {
              container: {
                backgroundColor: 'green',
              },
              text: {
                color: 'black'
              }
            }
          }
        }}
      />
    </Container>
  );
}

export default CalendarScreen;