import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import ComponentList from './ComponentList';
import InputField from './InputField';
import PropertyList from './PropertyList';
import ExpandCollapseButton from './ExpandCollapseButton';
import { getDeepValueFromObject, getPathParts, setDeepValueInObject } from '../utils/gqlUtils';


const PropertyItem = ({ name, value, queryPath, handleChange: handleChangeOverride, handleSubmit: handleSubmitOverride, handleFetchedData: handleFetchedDataOverride }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [savedValue, setSavedValue] = useState(value);
    const [newValue, setNewValue] = useState(value);
    // this key forces the fields to update when new data is returned. this happens when an invalid value is submitted, which then
    // responds with the old value.
    const [itemKey, setItemKey] = useState(Math.random());

    const isValueAnObject = typeof value == 'object';

    useEffect(() => {
        setNewValue(value);
    }, [value]);

    useEffect(() => {
        if (typeof value == 'boolean' && savedValue != newValue) submit();
    }, [newValue]);

    const submit = async () => {
        let encodedValue = newValue;

        if (isValueAnObject) {
            // remove values that are just empty objects -- empty objects are assumed to be data that has not been retrieved yet,
            // so no need to update them
            const updatedNewValue = JSON.parse(JSON.stringify(newValue));
            Object.keys(updatedNewValue).forEach(key => {
                if (typeof updatedNewValue[key] == 'object' && Object.keys(updatedNewValue[key]).length < 1) {
                    delete updatedNewValue[key];
                }
            });

            encodedValue = JSON.stringify(updatedNewValue);
        }

        const nameValueSet = name == 'activeInHierarchy' ? `SetActive(${encodedValue})` : `${name}=${encodedValue}`;
        const url = `${queryPath}.${nameValueSet}`;

        console.log('update properties', url);
        const json = await ky.get(url).json();
        console.log('update done', url, json);
        setItemKey(Math.random());

        if (typeof value == 'boolean') {
            setSavedValue(newValue);
        }
        else {
            setSavedValue(json[0]);
            setNewValue(json[0]);
        }
    };

    const handleFetchedData = handleFetchedDataOverride || ((data, ancestorPropsString) => {
        const mergedData = JSON.parse(JSON.stringify(savedValue));

        // this retrieves the parent object (which is assumed to be empty), so that the incoming data ("data") can
        // be merged into it
        let parentObject = getDeepValueFromObject({ [name]: mergedData }, ancestorPropsString);
        Object.assign(parentObject, data);

        setSavedValue(mergedData);
        setNewValue(mergedData);
    });

    const handleSubmit = handleSubmitOverride || ((e) => {
        e.preventDefault();
        submit();
    });

    const handleChange = handleChangeOverride || ((e) => {
        e.preventDefault();

        if (isValueAnObject) {
            const mergedData = JSON.parse(JSON.stringify(newValue));
    
            const isValueANumber = typeof getDeepValueFromObject({ [name]: newValue }, e.target.name) == 'number';
            setDeepValueInObject({ [name]: mergedData }, e.target.name, isValueANumber ? parseFloat(e.target.value) : e.targetValue);

            setNewValue(mergedData);
        }
        else if (typeof value == 'boolean') {
            setNewValue(!newValue);
        }
        else if (typeof value == 'number') {
            setNewValue(parseFloat(e.target.value));
        }
        else {
            setNewValue(e.target.value);
        }
    });

    const handleExpandClick = (e) => {
        setIsExpanded(!isExpanded);
    }

    let valueComponent;
    let isExpandable = false;

    if (name == 'components') {
        valueComponent = <ComponentList componentList={value} queryPath={queryPath} />;
    }
    else if (isValueAnObject) {
        const newQueryPath = `${queryPath}.${name}`;
        if (Object.keys(value).length < 1) {
            // this assumes that an empty object means that the data wasn't fetched with the query to the component, so will let PropertyList do the fetching
            isExpandable = true;

            if (isExpanded) {
                valueComponent = <PropertyList
                    key={itemKey}
                    queryPath={newQueryPath}
                    data={newValue}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleFetchedData={handleFetchedData}
                />;
            }
            else valueComponent = null;
        }
        else {
            valueComponent = <PropertyList
                key={itemKey}
                queryPath={newQueryPath}
                data={newValue}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />;
        }
    }
    else {
        let propertyPath = getPathParts(queryPath).properties;
        propertyPath = `${propertyPath && propertyPath + '.'}${name}`;
        valueComponent = <InputField key={itemKey} name={propertyPath} value={newValue} handleSubmit={handleSubmit} handleChange={handleChange} />;
    }

	return <li>
		<div>
            {<ExpandCollapseButton isExpanded={isExpanded} hasChildren={isExpandable} onClick={handleExpandClick} />}{name}: {valueComponent}
        </div>
	</li>
}

export default PropertyItem;