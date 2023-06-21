import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { Calendar } from 'react-native-calendars';
import { Dimensions } from 'react-native';
import { DBContext, Achievement } from '../context';

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
  const achievementDatas = useQuery(Achievement);
  const [marking, setMarking] = useState({});
  useEffect(() => {
    let markingObj = {};
    achievementDatas.forEach((achievementData) => {
      if(achievementData.success === true) {
        markingObj[achievementData.date] = {
          customStyles: {
            container: {
              backgroundColor: '#78e08f'
            },
            text: {
              color: 'black'
            }
          }
        };
      } else if(achievementData.success === false) {
        markingObj[achievementData.date] = {
          customStyles: {
            container: {
              backgroundColor: '#eb2f06',
            },
            text: {
              color: 'black'
            }
          }
        };
      }
    });
    setMarking(markingObj);
  }, [achievementDatas]);
  return(
    <Container>
      <Calendar 
        style={{width: windowWidth * 0.95}} 
        markingType={'custom'}
        markedDates={marking}
      />
    </Container>
  );
}

export default CalendarScreen;