import PropTypes from 'prop-types';
import {
  Wrapper,
  LabelName,
  InputWrapper,
  Input,
} from './ContactFilter.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export function ContactFilter({ onFilterNameChange }) {
  return (
    <Wrapper>
      <label>
        <LabelName>Find contacts by name</LabelName>
        <InputWrapper>
          <AiOutlineSearch size={20} />
          <Input
            name="filter"
            placeholder="Enter name..."
            type="text"
            onChange={e => {
              onFilterNameChange(e.target.value);
            }}
          />
        </InputWrapper>
      </label>
    </Wrapper>
  );
}

ContactFilter.propTypes = {
  onFilterNameChange: PropTypes.func.isRequired,
};
