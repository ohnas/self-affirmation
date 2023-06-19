import React from 'react';
import { styled } from 'styled-components/native';

const Goal = styled.Text`
    font-size: 100px;
`;

function AffirmationGoal({ goal }) {
    return(
        <Goal>{goal}</Goal>
    );
}

export default AffirmationGoal;