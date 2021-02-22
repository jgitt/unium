import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ExpandCollapseButton from './ExpandCollapseButton';
import GameObjectList from './GameObjectList';
import PropertyList from './PropertyList';


const GameObjectItemStyled = styled.button`
	cursor: pointer;
`;

const GameObjectItem = ({ data, queryPath, goIndex }) => {
	const [isExpanded, setExpanded] = useState(false);
	const [isPropsShown, setIsPropsShown] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!isExpanded);
	}

	const handleClick = () => {
		setIsPropsShown(!isPropsShown);
	}

    // technically, the name of the game object isn't required (index is enough), however leaving it there
    // as it doesn't seem to have an affect and it also makes it easier to identify
    const updatedQueryPath = `${queryPath}/[${goIndex}]${data.name}`;

	return <li>
		<ExpandCollapseButton
			hasChildren={data.children.length > 0}
			isExpanded={isExpanded}
			onClick={handleExpandClick}
		/>
		<GameObjectItemStyled onClick={handleClick}>{data.name}</GameObjectItemStyled>
		{isPropsShown && <PropertyList queryPath={updatedQueryPath} />}
		{isExpanded && <GameObjectList queryPath={updatedQueryPath} />}
	</li>
}

export default GameObjectItem;
