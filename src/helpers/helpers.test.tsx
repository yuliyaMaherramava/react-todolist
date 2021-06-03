import { getTimeFromDate } from '.';

test('function get Time From Data ', () => {
    const date = new Date(
        'Thu May 27 2021 12:43:06 GMT+0300 (Moscow Standard Time)'
    );
    expect(getTimeFromDate(date)).toBe(1622108586000);
});
