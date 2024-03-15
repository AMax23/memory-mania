import React from 'react';

import { tryFetchData } from '../utils/apiHelper.ts';
import { getDistinctUsers } from '../utils/manipulation.ts';

interface UserType {
    name: {
        first: string;
    };
    picture: {
        large: string;
        thumbnail: string;
    };
    id: {
        value: string;
    };
}

const RANDOM_USER_GENERATOR_API_URL = 'https://randomuser.me/api/';

export const useRandomUsers = (
    numOfRandomUsers: number,
    isLearningPhase: boolean,
    startLearningPhaseTimer: () => void
) => {
    const [randomUsers, setRandomUsers] = React.useState<UserType[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (!isLearningPhase) return;

        // Note: The api can sometimes return duplicate images in a set.
        // To only show unique users, we get more users than needed.
        // then we remove any duplicates and return the correct amount of unique users needed.
        const fields = 'id,name,gender,nat,picture';
        const format = 'JSON';
        const nationality = 'CA,US,AU';
        const apiParams = `?inc=${fields}&format=${format}&nat=${nationality}&results=${numOfRandomUsers * 2}`;
        tryFetchData(RANDOM_USER_GENERATOR_API_URL + apiParams).then(data => {
            setRandomUsers(getDistinctUsers(data.results, numOfRandomUsers));
            startLearningPhaseTimer();
            setIsLoading(false);
        });
    }, [isLearningPhase, numOfRandomUsers, startLearningPhaseTimer]);

    return { randomUsers, setRandomUsers, isLoading, setIsLoading };
};