export const getRandomInt = (min = 0, max = 0): number => {
    return Math.floor(min + (Math.random() * (max - min + 1)))
};