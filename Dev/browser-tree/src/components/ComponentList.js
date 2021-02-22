import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ComponentItem from './ComponentItem';


const Root = styled.ul`
`;

const ComponentList = ({ componentList, queryPath }) => {
	const [isExpanded, setExpanded] = useState(false);
	const [isPropsShown, setIsPropsShown] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!isExpanded);
	}

	const handleClick = () => {
		setIsPropsShown(!isPropsShown);
	}


	return <Root>
		{componentList.map(componentName => <ComponentItem name={componentName} queryPath={queryPath} />)}
	</Root>
}

export default ComponentList;