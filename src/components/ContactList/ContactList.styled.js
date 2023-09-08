import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${p => p.theme.spacing(3)};
`;

export const Item = styled.li`
  position: relative;
  min-width: 260px;
  padding: ${p => p.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(2)};

  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radii.sm};
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const NumberWrapper = styled.span`
  font-size: 14px;
`;

export const Button = styled.button`
  margin: 0 auto;
  padding: ${p => p.theme.spacing(1)};
  position: absolute;
  right: ${p => p.theme.spacing(2)};
  bottom: ${p => p.theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border: none;
  border-radius: ${p => p.theme.radii.sm};
  background-color: transparent;
  transition: background-color 250ms linear;

  &:hover {
    background-color: ${p => p.theme.colors.bgc};
  }
`;
