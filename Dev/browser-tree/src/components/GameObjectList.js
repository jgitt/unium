import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import GameObjectItem from './GameObjectItem';

const Root = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 10px 20px;
`;

const GameObjectList = ({ queryPath }) => {
	const [data, setData] = useState([]);

	useEffect(() => {

		async function fetchData() {
			const url = queryPath;
            console.log('fetching gameobjects', url);
			const json = await ky.get(`${url}/*`).json();
			setData(json);
		}

		fetchData();
	}, []);

	const items = data.map((gameObjectData, index) => {
		return <GameObjectItem data={gameObjectData} queryPath={queryPath} goIndex={index} />
	});

	return (
		<Root>
			{items}
		</Root>
	);
}

export default GameObjectList;
