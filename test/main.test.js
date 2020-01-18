import test from 'ava';
import {fibonacci} from './main.js';

test('main', t => {
    // 断言
    t.is(fibonacci(10), 55);
});
