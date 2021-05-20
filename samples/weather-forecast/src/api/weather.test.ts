import * as weather from 'openweather-apis';
import WeatherApi from './weather';

describe('WeatherApi', () => {


    it('should set api key', () => {
        debugger;
        const spy1 = jest.spyOn(weather, 'setAPPID');
        const spy2 = jest.spyOn(weather, 'setLang');

        const weatherApi = new WeatherApi('xxx', 'de');
        expect(spy2).toHaveBeenCalled();


    });

});
