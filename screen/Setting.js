import React, { useState } from 'react';
import { Dimensions, Text, Switch } from "react-native";
import { styled } from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  background-color: '#fff';
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
`;
const Mode = styled.View`
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
  const [isVibrationEnabled, setVibrationIsEnabled] = useState(false);
  const [isSoundEnabled, setSoundIsEnabled] = useState(false);
  const vibrationToggleSwitch = () => setVibrationIsEnabled((prev) => !prev);
  const soundToggleSwitch = () => setSoundIsEnabled((prev) => !prev);
  return(
      <Container>
        <Mode>
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
        </Mode>
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