import PropTypes from 'prop-types';
import { AiOutlineDelete } from 'react-icons/ai';
import { List, Item, Name, Button, NumberWrapper } from './ContactList.styled';

export function ContactList({ contacts, onContactsDelete }) {
  return (
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
