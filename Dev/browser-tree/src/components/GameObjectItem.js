import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ExpandCollapseButton from './ExpandCollapseButton';
import GameObjectList from './GameObjectList';
import PropertyList from './PropertyList';


const Root = styled.li`
	display: table;
`;

const Container = styled.div`
display: inline-block;
	background-color: #DDD;
	margin: 2px;
`;

const Label = styled.button`
	cursor: pointer;
	border: none;
	background-color: #DDD;
	margin: 2px;
	padding: 5px 8px;
	// font-size: 110%;
	font-weight: bold;
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

	const propsExpandedIcon = isPropsShown ? <span>&#9662;</span> : <span>&#9656;</span>;

	return <Root>
		
		<ExpandCollapseButton
			hasChildren={data.children.length > 0}
			isExpanded={isExpanded}
			onClick={handleExpandClick}
		/>
		<Label onClick={handleClick}>{propsExpandedIcon} {data.name}</Label>
		{isPropsShown && <PropertyList queryPath={updatedQueryPath} />}
		
		{isExpanded && <GameObjectList queryPath={updatedQueryPath} />}
	</Root>
}

export default GameObjectItem;
