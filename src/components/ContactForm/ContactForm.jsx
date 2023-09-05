import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { regex } from 'utils/regex';

import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import {
  FormField,
  Label,
  LabelName,
  InputWrapper,
  Button,
  Input,
  Message,
} from './ContactForm.styled';

const Schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Enter at least 3 characters')
    .max(25, 'Too Long')
    .trim()
    .matches(regex.name.regex, regex.name.errorMessage)
    .required('Required'),
  number: yup
    .string()
    .min(6, 'Enter at least 6 characters')
    .max(20, 'Too Long')
    .trim()
    .matches(regex.number.regex, regex.number.errorMessage)
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onFormSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onFormSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <FormField autoComplete="off">
        <Label>
          <LabelName>Name</LabelName>
          <InputWrapper>
            <AiOutlineUser size={20} />
            <Input type="text" name="name" />
          </InputWrapper>
        </Label>
        <Message name="name" component="p" />

        <Label>
          <LabelName>Number</LabelName>
          <InputWrapper>
            <AiOutlinePhone size={20} />
            <Input type="tel" name="number" />
          </InputWrapper>
        </Label>
        <Message name="number" component="p" />

        <Button type="submit">Add contact</Button>
      </FormField>
    </Formik>
  );
};

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

//without Formik
// import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
// import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
// import {
//   Form,
//   Label,
//   LabelName,
//   Input,
//   InputWrapper,
//   Button,
// } from './ContactForm.styled';

// export class ContactForm extends Component {
//   static propTypes = {
//     onFormSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     name: '',
//     number: '',
//   };

//   handleInput = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const id = nanoid();

//     this.props.onFormSubmit({ ...this.state, id });

//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <Form autoComplete="off" onSubmit={this.handleSubmit}>
//         <Label>
//           <LabelName>Name</LabelName>
//           <InputWrapper>
//             <AiOutlineUser size={20} />
//             <Input
//               value={name}
//               onChange={this.handleInput}
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яА-Я' \-]+$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//             />
//           </InputWrapper>
//         </Label>

//         <Label>
//           <LabelName>Number</LabelName>
//           <InputWrapper>
//             <AiOutlinePhone size={20} />
//             <Input
//               value={number}
//               onChange={this.handleInput}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//           </InputWrapper>
//         </Label>

//         <Button type="submit">Add contact</Button>
//       </Form>
//     );
//   }
// }
