import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import PropertyItem from './PropertyItem';
import { getPathParts } from '../utils/gqlUtils';


const Root = styled.ul`
	list-style-type: none;
	margin: 2px 0 10px 50px;
	padding: 10px 20px;
    border: solid 1px #CCC;

    ${props => props.isComponentPropertyList && `
        margin: 2px 0 10px 0;
        border: none;
        padding: 0;
    `}
`;

const PropertyList = ({ data: existingData, queryPath, handleSubmit, handleChange, handleFetchedData }) => {
	const [data, setData] = useState(existingData || {});

    const isComponentPropertyList = !!getPathParts(queryPath).component;

    if (!existingData || (typeof existingData == 'object' && Object.keys(existingData).length < 1)) {
        useEffect(() => {
            async function fetchData() {
                const url = queryPath;
                const json = await ky.get(`${url}`).json();
                setData(json[0]);
                
                handleFetchedData && handleFetchedData(json[0], getPathParts(queryPath).properties);
            }
    
            fetchData();
        }, []);
    }
    else {
        useEffect(() => {
            setData(existingData);
        }, [existingData]);
    }

	const items = [];
	
	Object.keys(data).forEach((propName) => {
		if (propName == 'children' || propName == 'name') {
			return null;
		}
		else {
			items.push(<PropertyItem
                name={propName}
                value={data[propName]}
                queryPath={queryPath}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFetchedData={handleFetchedData}
            />);
		}
	});
	
	return (
		<Root isComponentPropertyList={isComponentPropertyList}>
			{items}
		</Root>
	);
}

export default PropertyList;