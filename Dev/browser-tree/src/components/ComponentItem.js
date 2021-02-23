import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import PropertyList from './PropertyList';


const Root = styled.li`
	width: 100%;	
	margin: 0 5px 5px;
`;

const Title = styled.button`
	background-color: #CCC;
	padding: 5px;
	text-align: left;
	width: 100%;
	height: 100%;
	border: none;
	cursor: pointer;
`;

const ComponentItem = ({ name, queryPath }) => {
	const [isPropsShown, setIsPropsShown] = useState(false);

	const handleClick = () => {
        setIsPropsShown(!isPropsShown);
	}

    const properties = isPropsShown && (
        <PropertyList queryPath={`${queryPath}.${name}`} />
    );

	const propsExpandedIcon = isPropsShown ? <span>&#9662;</span> : <span>&#9656;</span>;

	return <Root onClick={handleClick}>
		<Title>{propsExpandedIcon} {name}</Title>
        {properties}
	</Root>
}

export default ComponentItem;