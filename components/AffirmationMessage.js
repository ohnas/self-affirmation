import React from 'react';
import { styled } from 'styled-components/native';

const Message = styled.Text`
    font-size: 20px;
    color: white;
`;

function AffirmationMessage({ message }) {
    return(
        <Message>{message}</Message>
    );
}

export default AffirmationMessage;