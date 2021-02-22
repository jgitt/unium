import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import PropertyList from './PropertyList';


const Root = styled.li`
`;

const Title = styled.button`
`;

const ComponentItem = ({ name, queryPath }) => {
	const [isPropsShown, setIsPropsShown] = useState(false);

	const handleClick = () => {
        setIsPropsShown(!isPropsShown);
	}

    const properties = isPropsShown && (
        <PropertyList queryPath={`${queryPath}.${name}`} />
    );

	return <Root>
		<Title onClick={handleClick}>{name}</Title>
        {properties}
	</Root>
}

export default ComponentItem;