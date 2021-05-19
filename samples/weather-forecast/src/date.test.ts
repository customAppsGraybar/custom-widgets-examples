import {dateformat } from "./date";
import { de, enUS } from 'date-fns/locale'

describe ('dateformat()', () => {
    const deLocale = de
    const enLocale = enUS
    const date = new Date(2021,3,22, 0,0)

    it('should format the date for DE', () => {
        expect(dateformat(date, deLocale)).toBe(
            '22.04.2021 00:00'
        );
    });

    it('should format the date for US', () => {
        expect(dateformat(date, enLocale)).toBe(
            '04/22/2021, 12:00 AM'
        );
    });

    it('should format the date for fallback as US', () => {
        expect(dateformat(date)).toBe(
            '04/22/2021, 12:00 AM'
        );
    });
});