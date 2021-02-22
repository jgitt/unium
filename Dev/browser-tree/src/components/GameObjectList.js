import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import GameObjectItem from './GameObjectItem';

const GameObjectList = ({ queryPath }) => {
	const [data, setData] = useState([]);

	useEffect(() => {

		async function fetchData() {
			const url = queryPath;

			const json = await ky.get(`${url}/*`).json();

			console.log('>>', url, json);

			setData(json);
		}

		fetchData();
	}, []);

	const items = data.map((gameObjectData) => {
		return <GameObjectItem data={gameObjectData} queryPath={queryPath} />
	});

	return (
		<ul>
			{items}
		</ul>
	);
}

export default GameObjectList;
