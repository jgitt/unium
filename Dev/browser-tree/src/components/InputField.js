import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';


const Root = styled.span`
`;

const Form = styled.form`
    display: inline-block;
`;

const InputField = ({ name, value, handleSubmit, handleChange }) => {

	return <Root>
		<Form onSubmit={handleSubmit}><input onChange={handleChange} type="text" name={name} defaultValue={value} /></Form>
	</Root>
}

export default InputField;