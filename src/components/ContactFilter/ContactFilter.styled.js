import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
`;

export const LabelName = styled.span`
  margin-right: ${p => p.theme.spacing(2)};
`;

export const InputWrapper = styled.span`
  position: relative;
  svg {
    position: absolute;
    right: ${p => p.theme.spacing(2)};
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Input = styled.input`
  min-width: 360px;
  padding: 12px 40px 12px 12px;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radii.sm};
`;
