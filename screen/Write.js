import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { Alert, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DBContext, Affirmation } from '../context';


const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  background-color: #f5f6fa;
  align-items: center;
  justify-content: center;
`;
const TitleBox = styled.View`
  flex: 1;
  width: ${windowWidth * 0.95}px;
  align-items: center;
  justify-content: center;
`;
const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const TempDelBtn = styled.Button``;
const InputBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${windowWidth * 0.95}px;
`;
const MessageInput = styled.TextInput`
  flex: 3;
  border-bottom-width: 2px;
  font-size: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  margin-right: 5px;
`;
const GoalInput = styled.TextInput`
  flex: 1;
  border-bottom-width: 2px;
  font-size: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  margin-left: 5px;
`;
const AffirmationList = styled.ScrollView`
  flex: 8;
  width: ${windowWidth * 0.95}px;
`;
const AffirmationBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${windowWidth * 0.95}px;
  margin-top: 5px;
`;
const AffirmationMessageBox = styled.View`
  width: ${windowWidth * 0.68}px;
  height: ${windowWidth * 0.15}px;
  background-color: #dcdde1;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
const AffirmationMessageText = styled.Text`
  font-size: 25px;
  font-weight: 500;
`;
const AffirmationGoalBox = styled.View`
  width: ${windowWidth * 0.15}px;
  height: ${windowWidth * 0.15}px;
  border-radius: ${(windowWidth * 0.15) * 0.5}px;
  background-color: #dcdde1;
  justify-content: center;
  align-items: center;
`;
const AffirmationGoalText = styled.Text`
  font-size: 25px;
  font-weight: 500;
`;
const AffirmationDelBtn = styled.View`
  width: ${windowWidth * 0.1}px;
  height: ${windowWidth * 0.15}px;
  justify-content: center;
  align-items: center;
`;

function Write() {
  const { useRealm, useQuery } = DBContext;
  const realmDB = useRealm();
  const affirmationDatas = useQuery(Affirmation);
  const [message, setMessage] = useState("");
  const [goal, setGoal] = useState("");
  const [maxId, setMaxId] = useState(null);
  const onChangeMessage = (text) => setMessage(text);
  const onChangeGoal = (num) => setGoal(num);
  function onSubmit() {
    if (message === "" || goal == "") {
      return Alert.alert("Please complete form.");
    } else {
      realmDB.write(() => {
        realmDB.create("Affirmation", {
          _id: maxId,
          message: message,
          goal: Number(goal),
        });
      });
      setMessage("");
      setGoal("");
    }
  };
  function getMaxId() {
    let idList = [];
    affirmationDatas.map((affirmationData) => 
      idList.push(affirmationData._id)
    )
    setMaxId(Math.max(...idList) + 1);
  }
  function deleteObject(object) {
    realmDB.write(() => {
      realmDB.delete(object);
    });
  };
  function deleteAllData() {
    realmDB.write(() => {
      realmDB.deleteAll();
    });
  };
  useEffect(() => {
    if(affirmationDatas.length === 0) {
      setMaxId(0);
    } else {
      getMaxId();
    }
  }, [affirmationDatas]);
  return(
    <Container>
      <TitleBox>
        <TitleText>Affirmation List</TitleText>
        <TempDelBtn title='Delete all data' onPress={deleteAllData} />
      </TitleBox>
      <InputBox>
        <MessageInput  
          placeholder='Affirmaiton'
          placeholderTextColor='#8395a7'
          onChangeText={onChangeMessage}
          value={message} 
          returnKeyType='done'
        />
        <GoalInput 
          placeholder='Goal' 
          placeholderTextColor='#8395a7'
          onChangeText={onChangeGoal}
          value={goal}
          keyboardType='number-pad'
          returnKeyType='done'
          onSubmitEditing={onSubmit}
        />
      </InputBox>
      <AffirmationList>
        {affirmationDatas.length === 0 ? 
          <Text>No data.</Text>
          :
          affirmationDatas.map((affirmationData) => 
            <AffirmationBox key={affirmationData._id}>
              <AffirmationMessageBox>
                <AffirmationMessageText>{affirmationData.message}</AffirmationMessageText>
              </AffirmationMessageBox>
              <AffirmationGoalBox>
                <AffirmationGoalText>{affirmationData.goal}</AffirmationGoalText>
              </AffirmationGoalBox>
              <AffirmationDelBtn>
                <Ionicons name="ios-remove-circle-outline" size={36} color="red" onPress={() => deleteObject(affirmationData)} />
              </AffirmationDelBtn>
            </AffirmationBox>
          )
        }
      </AffirmationList>
    </Container>
  );
}

export default Write;