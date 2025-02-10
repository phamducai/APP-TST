import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background}
`;
