import styled from 'styled-components';

export const Layout = styled.div`
  max-width: 1200px;
  margin: 36px auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${p => p.theme.spacing(5)};
`;
