import React, { useEffect, useState } from 'react';
import { Dimensions, Text, Switch } from "react-native";
import { styled } from 'styled-components/native';
import { DBContext, Mode } from '../context';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  background-color: '#fff';
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
`;
const ModeContainer = styled.View`
  flex: 1;
  border-bottom-width: 2px;
  border-color: #8395a7;
  align-items: center;
  justify-content: center;
  width: ${windowWidth * 0.95}px;
`;
const ModeTitleBox = styled.View`
  width: ${windowWidth * 0.9}px;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const ModeTitle = styled.Text`
  font-size: 15px;
`;
const ModeBox = styled.View`
  width: ${windowWidth * 0.9}px;
  border-bottom-width: 2px;
  padding-top: 15px;
  padding-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ModeBoxText = styled.Text`
  font-size: 25px;
`;
const Temp = styled.View`
  flex: 1;
  border-bottom-width: 2px;
  border-color: #8395a7;
  align-items: center;
  justify-content: center;
  width: ${windowWidth * 0.95}px;
`;
const Temp1 = styled.View`
  flex: 1;
  border-bottom-width: 2px;
  border-color: #8395a7;
  align-items: center;
  justify-content: center;
  width: ${windowWidth * 0.95}px;
`;

function Setting() {
  const { useRealm, useQuery } = DBContext;
  const realmDB = useRealm();
  const ModeDatas = useQuery(Mode);
  const [isVibrationEnabled, setVibrationIsEnabled] = useState(false);
  const [isSoundEnabled, setSoundIsEnabled] = useState(false);
  const vibrationToggleSwitch = () => {
    setVibrationIsEnabled((prev) => !prev);
    if(ModeDatas.length !==0) {
      const vibrationData = ModeDatas[0];
      if(vibrationData.value === false) {
          realmDB.write(() => {
            vibrationData.value = true;
        });
      } else if(vibrationData.value === true) {
        realmDB.write(() => {
          vibrationData.value = false;
        });
      }
    }
  }
  const soundToggleSwitch = () => {
    setSoundIsEnabled((prev) => !prev);
    if(ModeDatas.length !==0) {
      const soundData = ModeDatas[1];
      if(soundData.value === false) {
        realmDB.write(() => {
          soundData.value = true;
        });
      } else if(soundData.value === true) {
        realmDB.write(() => {
          soundData.value = false;
        });
      }
    }
  }
  useEffect(() => {
    if(ModeDatas.length === 0) {
      realmDB.write(() => {
        realmDB.create('Mode', {
          _id: 0,
          name: 'vibration',
          value: false,
        })
        realmDB.create('Mode', {
          _id: 1,
          name: 'sound',
          value: false,
        })
      });
    } else {
      const vibrationValue = ModeDatas[0].value;
      setVibrationIsEnabled(vibrationValue);
      const soundValue = ModeDatas[1].value;
      setSoundIsEnabled(soundValue);
    }
  }, []);
  return(
    <Container>
      <ModeContainer>
        <ModeTitleBox>
          <ModeTitle>Mode</ModeTitle>
        </ModeTitleBox>
        <ModeBox>
          <ModeBoxText>진동</ModeBoxText>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            onValueChange={vibrationToggleSwitch}
            value={isVibrationEnabled}
          />
        </ModeBox>
        <ModeBox>
          <ModeBoxText>소리</ModeBoxText>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            onValueChange={soundToggleSwitch}
            value={isSoundEnabled}
          />
        </ModeBox>
      </ModeContainer>
      <Temp>
        <Text>More...</Text>
      </Temp>
      <Temp1>
        <Text>More...</Text>
      </Temp1>
    </Container>
  );
}

export default Setting;