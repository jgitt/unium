// const gqlUtils = require('./gqlUtils');
import * as gqlUtils from './gqlUtils';


describe('gqlUtils', () => {
    describe('getPathParts', () => {
        test('should return for GameObject path', () => {
            const path = 'http://localhost:8342/q/scene/[5]Cube (1)';
            expect(gqlUtils.getPathParts(path))
                .toStrictEqual({
                    path: 'http://localhost:8342/q/scene',
                    gameObject: '[5]Cube (1)',
                    component: undefined,
                    properties: undefined,
                });
        });

        test('should return for Component path', () => {
            const path = 'http://localhost:8342/q/scene/[5]Cube (1).TestBehaviour';
            expect(gqlUtils.getPathParts(path))
                .toStrictEqual({
                    path: 'http://localhost:8342/q/scene',
                    gameObject: '[5]Cube (1)',
                    component: 'TestBehaviour',
                    properties: undefined,
                });
        });

        test('should return for Component property path', () => {
            const path = 'http://localhost:8342/q/scene/[5]Cube (1).TestBehaviour.rfm';
            expect(gqlUtils.getPathParts(path))
                .toStrictEqual({
                    path: 'http://localhost:8342/q/scene',
                    gameObject: '[5]Cube (1)',
                    component: 'TestBehaviour',
                    properties: 'rfm',
                });
        });

        test('should return for Component property, with sub property path', () => {
            const path = 'http://localhost:8342/q/scene/[5]Cube (1).TestBehaviour.rfm.toRange';
            expect(gqlUtils.getPathParts(path))
                .toStrictEqual({
                    path: 'http://localhost:8342/q/scene',
                    gameObject: '[5]Cube (1)',
                    component: 'TestBehaviour',
                    properties: 'rfm.toRange',
                });
        });
    });

    describe('getDeepValueFromObject', () => {
        test('should return value from single depth object', () => {
            const dataObject = { x: 'ex', y: 'why' };
            expect(gqlUtils.getDeepValueFromObject(dataObject, 'x'))
                .toStrictEqual('ex');
        });

        test('should return deep value from object', () => {
            const dataObject = { x: 'ex', y: 'why', z: { a: 'ay', b: 'bee' } };
            expect(gqlUtils.getDeepValueFromObject(dataObject, 'z.b'))
                .toStrictEqual('bee');
        });

        test('should return deep value from object when value is 0`', () => {
            const dataObject = { position: { x: 0, y: 0, z: 0 } };
            expect(gqlUtils.getDeepValueFromObject(dataObject, 'position.x'))
                .toStrictEqual(0);
        });

        test('should value not found', () => {
            const dataObject = { x: 'ex', y: 'why', z: { a: 'ay', b: 'bee' } };
            expect(gqlUtils.getDeepValueFromObject(dataObject, 'z.b.r.z'))
                .toStrictEqual(undefined);
        });
    });

    describe('setDeepValueInObject', () => {
        test('should set value in single depth object', () => {
            const dataObject = { x: 'ex', y: 'why' };
            expect(gqlUtils.setDeepValueInObject(dataObject, 'x', 'newx')).toStrictEqual(true);
            expect(dataObject)
                .toStrictEqual({ x: 'newx', y: 'why' });
        });

        test('should set deep value', () => {
            const dataObject = { x: 'ex', y: { a: 'ay', b: 'bee' } };
            expect(gqlUtils.setDeepValueInObject(dataObject, 'y.b', 'bee2')).toStrictEqual(true);
            expect(dataObject)
                .toStrictEqual({ x: 'ex', y: { a: 'ay', b: 'bee2' } });
        });

        test('should handle invalid key path', () => {
            const dataObject = { x: 'ex', y: { a: 'ay', b: 'bee' } };
            expect(gqlUtils.setDeepValueInObject(dataObject, 'y.z.b', 'beez')).toStrictEqual(false);
            expect(dataObject)
                .toStrictEqual({ x: 'ex', y: { a: 'ay', b: 'bee' } });
        });

        test('should handle invalid last key path', () => {
            const dataObject = { x: 'ex', y: { a: 'ay', b: 'bee' } };
            expect(gqlUtils.setDeepValueInObject(dataObject, 'y.c', 'beez')).toStrictEqual(false);
            expect(dataObject)
                .toStrictEqual({ x: 'ex', y: { a: 'ay', b: 'bee' } });
        });

        // test('should set new deep value', () => {
        //     const dataObject = { x: 'ex', y: { a: 'ay', b: 'bee' } };
        //     gqlUtils.setDeepValueInObject(dataObject, 'y.c.m', 'moo');
        //     expect(dataObject)
        //         .toStrictEqual({ x: 'ex', y: { a: 'ay', b: 'bee', c: 'moo' } });
        // });

        // test('should set new deep value in empty object', () => {
        //     const dataObject = {};
        //     gqlUtils.setDeepValueInObject(dataObject, 'a.b.c', 'cee');
        //     expect(dataObject)
        //         .toStrictEqual({ a: { b: { c: 'cee' } } });
        // });
    });
});
