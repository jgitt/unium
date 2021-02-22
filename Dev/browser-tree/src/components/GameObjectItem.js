import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ExpandCollapseButton from './ExpandCollapseButton';
import GameObjectList from './GameObjectList';
import PropertyList from './PropertyList';


const GameObjectItemStyled = styled.button`
	cursor: pointer;
`;

const GameObjectItem = ({ data, queryPath }) => {
	const [isExpanded, setExpanded] = useState(false);
	const [isPropsShown, setIsPropsShown] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!isExpanded);
	}

	const handleClick = () => {
		setIsPropsShown(!isPropsShown);
	}

	return <li>
		<ExpandCollapseButton
			hasChildren={data.children.length > 0}
			isExpanded={isExpanded}
			onClick={handleExpandClick}
		/>
		<GameObjectItemStyled onClick={handleClick}>{data.name}</GameObjectItemStyled>
		{isPropsShown && <PropertyList queryPath={`${queryPath}/${data.name}`} />}
		{isExpanded && <GameObjectList queryPath={`${queryPath}/${data.name}`} />}
	</li>
}

export default GameObjectItem;
