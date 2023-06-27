import React, { useEffect } from 'react';
import { styled } from 'styled-components/native';
import { DBContext, Achievement } from '../context';

const Goal = styled.Text`
    font-size: 100px;
`;

function AffirmationGoal({ data }) {
    const { useRealm, useQuery, useObject } = DBContext;
    const realmDB = useRealm();
    const achievementDatas = useQuery(Achievement);
    const idList = achievementDatas.map((achievementData) => achievementData._id);
    const achievementDatasMaxId = Math.max(...idList);
    const todayAchievement = useObject(Achievement, achievementDatasMaxId);
    useEffect(() => {
        if(data === 'Done') {
            realmDB.write(() => {
                todayAchievement.success = true;
            });
        } else {
            if(todayAchievement.success === true) {
                realmDB.write(() => {
                    todayAchievement.success = false;
                });
            } else if(todayAchievement.success === false) {
                return;
            }
        }
      }, [data]);
    return(
        <Goal>{data === 'Done' ? 'Done' : data.goal}</Goal>
    );
}

export default AffirmationGoal;