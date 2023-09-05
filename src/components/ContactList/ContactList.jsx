import PropTypes from 'prop-types';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  List,
  Item,
  Name,
  Button,
  NumberWrapper,
  Message,
} from './ContactList.styled';

export function ContactList({ contacts, onContactsDelete }) {
  return contacts.length > 0 ? (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          <Name>{name}</Name>
          <NumberWrapper>
            <span>Number: </span>
            {number}
          </NumberWrapper>
          <Button
            type="button"
            onClick={() => {
              onContactsDelete(id);
            }}
          >
            <AiOutlineDelete size={20} />
          </Button>
        </Item>
      ))}
    </List>
  ) : (
    <Message>No contacts found</Message>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onContactsDelete: PropTypes.func.isRequired,
};
