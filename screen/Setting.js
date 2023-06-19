import React from 'react';
import { Text } from "react-native";
import { styled } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: '#fff';
  align-items: center;
  justify-content: center;
`;

function Setting() {
    return(
        <Container><Text>Setting</Text></Container>
    );
}

export default Setting;