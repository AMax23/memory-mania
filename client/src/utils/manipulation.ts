// Shuffle an array randomly using the Fisher-Yates shuffle algorithm.
import { IUser } from '../types.ts';

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
}

export function getDistinctUsers(data: IUser[], numOfRandomUsers: number) {
    // Distinct user := unique user picture.

    const userPictures = new Set();
    const distinctUsers: IUser[] = [];

    for (const user of data) {
        const picture = user.pictureURL;

        // Only add a user to the list if there isn't already a user with that picture.
        if (userPictures.has(picture)) {
            continue;
        }
        distinctUsers.push(user);
        userPictures.add(picture);

        if (distinctUsers.length === numOfRandomUsers) {
            break;
        }
    }
    return distinctUsers;
}
