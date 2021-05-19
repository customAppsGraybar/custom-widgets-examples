/*!
 * Copyright 2021, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { format } from 'date-fns';
import * as locale from 'date-fns/locale';

/**
 *
 * @param {date} dateinput
 * @param {Locale} userlocale
 */
function getlocale () {
    const userLocale = () => {
        locale. === navigator.language;
    }
    return userLocale
}

export function dateformat (dateinput, userLocal = getlocale()) {
    console.log(userLocal)
    return format(dateinput, 'Pp', {
        locale: userLocal
    })
}
