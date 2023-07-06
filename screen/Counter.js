import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Text, Dimensions, Alert } from 'react-native';
import { DBContext, Affirmation, Achievement } from '../context';
import AffirmationMessage from '../components/AffirmationMessage';
import AffirmationGoal from '../components/AffirmationGoal';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  background-color: #f5f6fa;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 10px;
`;
const Header = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${windowWidth * 0.95}px;
`;
const HeaderBox = styled.Pressable`
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.selected ? '#dcdde1' : '#718093'};
`;
const HeaderText = styled.Text`
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  color: ${(props) => props.selected ? 'black' : 'white'};
`;
const CounterBody = styled.View`
  flex: 9;
  width: ${windowWidth * 0.95}px;
  border-radius: 30px;
  background-color: #dcdde1;
  align-items: center;
  justify-content: center;
`;
const CounterBodyBox = styled.Pressable`
  flex: 6;
  width: ${windowWidth * 0.9}px;
  align-items: center;
  justify-content: center;
`;
const CounterBodyText = styled.Text`
  font-size: 100px;
  font-family: 'Pretendard-Regular';
`;
const CounterFooter = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const AffirmationHeader = styled.View`
  flex: 1;
  width: ${windowWidth * 0.95}px;
  border-radius: 30px;
  background-color: #718093;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;
const AffirmationHeaderText = styled.Text`
  font-size: 20px;
  color: white;
  font-family: 'Pretendard-Regular';
`;
const AffirmationBody = styled.View`
  flex: 8;
  border-radius: 30px;
  width: ${windowWidth * 0.95}px;
  background-color: #dcdde1;
  align-items: center;
  justify-content: center;
`;
const AffirmationBodyBox = styled.Pressable`
  flex: 6;
  width: ${windowWidth * 0.9}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const AffirmationBodyText = styled.Text`
  font-size: 100px;
  font-family: 'Pretendard-Regular';
`;
const AffirmationFooter = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
function Counter({ navigation: { navigate } }) {
  const today = new Date();
  let month = today.getMonth() + 1;
  if(month < 10) {
    month = `0${month}`
  }
  let date = today.getDate();
  if(date < 10) {
    date = `0${date}`
  }
  const todayValue = `${today.getFullYear()}-${month}-${date}`;
  const { useRealm, useQuery } = DBContext;
  const realmDB = useRealm();
  const affirmationDatas = useQuery(Affirmation);
  const achievementDatas = useQuery(Achievement);
  const [selected, setSelected] = useState(true);
  const [counterNum, setCounterNum] = useState(0);
  const [affirmationNum, setAffirmationNum] = useState(0);
  const [affirmationData, setAffirmationData] = useState(null);
  function handleAffirmationData() {
    realmDB.write(() => {
      let data = affirmationData.datas.find((element) => element.date === todayValue && element.success === true );
      if(data === undefined) {
        affirmationData.datas.push({
          date: todayValue,
          success: true,
        });
      }
    });
  }
  useEffect(() => {
    if(affirmationDatas.length !== 0) {
      const filteredDatas = affirmationDatas.filter((element) => element.datas.length === 0 || !element.datas.some((data) => data.date === todayValue && data.success === true));
      if(filteredDatas.length !== 0) {
        setAffirmationData(filteredDatas[0]);
      } else {
        setAffirmationData('Done');
        Alert.alert(
          "알림" , "🎉 축하합니다. 오늘도 발전하고 있네요!"
        );  
      }
    } else {
      setAffirmationData(null);
    }
  }, [affirmationDatas]);
  useEffect(() => {
    if(affirmationData !== null) {
      if(affirmationNum === affirmationData.goal) {
        handleAffirmationData();
        setAffirmationNum(0);
      } else {
        return;
      }
    } else {
      return;
    }
  }, [affirmationNum]);
  useEffect(() => {
    if(achievementDatas.length === 0) {
      realmDB.write(() => {
        realmDB.create("Achievement", {
          _id: 0,
          date: todayValue,
          success: false,
        });
      });
    } else {
      const data = achievementDatas.find((element) => element.date === todayValue);
      if(data === undefined) {
        const idList = achievementDatas.map((achievementData) => achievementData._id);
        const achievementDatasMaxId = Math.max(...idList) + 1;
        realmDB.write(() => {
          realmDB.create("Achievement", {
            _id: achievementDatasMaxId,
            date: todayValue,
            success: false,
          });
        });
      } else {
        return;
      }
    }
  }, []);
  return(
    <Container>
      <Header>
        <HeaderBox selected={selected} onPress={() => setSelected(false)}>
          <HeaderText selected={selected}>Counter</HeaderText>
        </HeaderBox>
        <HeaderBox selected={!selected} onPress={() => setSelected(true)}>
          <HeaderText selected={!selected}>Affirmation</HeaderText>
        </HeaderBox>
      </Header>
      {selected === false ? 
        <CounterBody>
          <CounterBodyBox onPress={() => setCounterNum((prev) => prev + 1 )}>
            <CounterBodyText>{counterNum}</CounterBodyText>
          </CounterBodyBox>
          <CounterFooter>
            <Fontisto name="spinner-rotate-forward" size={36} color="black" style={{marginRight:10}} onPress={() => setCounterNum(0)} />
            <AntDesign name="minuscircleo" size={36} color="black" style={{marginLeft:10}} onPress={() => {
              if(counterNum === 0) {
                setCounterNum(0);
              } else {
                setCounterNum((prev) => prev - 1 );
              }
              }} 
            />
          </CounterFooter>
        </CounterBody>
        :
        <>
          <AffirmationHeader>
            {affirmationData === null ? 
              <AffirmationHeaderText>No data.</AffirmationHeaderText>
              :
              affirmationDatas.length === 0 ? 
                <AffirmationHeaderText>No data.</AffirmationHeaderText>
                :
                <AffirmationMessage data={affirmationData} />
            }
          </AffirmationHeader>
          <AffirmationBody>
            <AffirmationBodyBox onPress={() => {
              if(affirmationData === 'Done') {
                setAffirmationNum(0);
              } else {
                setAffirmationNum((prev) => prev + 1 );
              }
              }}
            >
              <AffirmationBodyText>{affirmationNum}</AffirmationBodyText>
              <AffirmationBodyText>/</AffirmationBodyText>
              {affirmationData === null ? 
                <AffirmationBodyText>Goal</AffirmationBodyText>
                :
                affirmationDatas.length === 0 ? 
                  <AffirmationBodyText>Goal</AffirmationBodyText>
                  :
                  <AffirmationGoal data={affirmationData} />
              }
            </AffirmationBodyBox>
            <AffirmationFooter>
              <Fontisto name="spinner-rotate-forward" size={36} color="black" style={{marginRight:10}} onPress={() => setAffirmationNum(0)} />
              <AntDesign name="minuscircleo" size={36} color="black" style={{marginLeft:10}} onPress={() => {
                if(affirmationNum === 0) {
                  setAffirmationNum(0);
                } else {
                  setAffirmationNum((prev) => prev - 1 );
                }
                }} 
              />
              <Ionicons name="list-circle-outline" size={46} color="black" style={{marginLeft:10}} onPress={() => navigate('Stack', {screen: 'Write'})} />
            </AffirmationFooter>
          </AffirmationBody>
        </>
      }
    </Container>
  );
}

export default Counter;