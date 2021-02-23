import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ComponentItem from './ComponentItem';


const Root = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: inline-block;
`;

const ComponentList = ({ componentList, queryPath }) => {
	return <Root>
		{componentList.map(componentName => <ComponentItem name={componentName} queryPath={queryPath} />)}
	</Root>
}

export default ComponentList;