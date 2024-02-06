export default { 
    transform: { '^.+\\.tsx?$': 'ts-jest' }, 
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }, 
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'] 
};
