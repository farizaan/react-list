import {Color} from "../components/types";


export const createMockUserGenerator = () => {
    const userColors = Object.values(Color);
    let lastI = 0;
    return (count: number) => {
        const mockUsers = [];

        for (let j = 0; j < count; j++) {
            const user = {
                color: userColors[lastI % userColors.length] as Color,
                name: `User ${lastI + 1}`,
                speed: Math.random() * 100,
                time: Math.random() * 10000,
            };
            mockUsers.push(user);
            lastI++;
        }

        return mockUsers;
    };
};
export default createMockUserGenerator();

