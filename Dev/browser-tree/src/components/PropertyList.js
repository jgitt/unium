import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import PropertyItem from './PropertyItem';
import { getPathParts } from '../utils/gqlUtils';


const PropertyList = ({ data: existingData, queryPath, handleSubmit, handleChange, handleFetchedData }) => {
	const [data, setData] = useState(existingData || {});

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
		<ul>
			{items}
		</ul>
	);
}

export default PropertyList;