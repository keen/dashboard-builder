import { generateUniqueId } from './generateUniqueId';

describe('generateUniqueId', () => {
  it('should return Id as string', () => {
    const id = generateUniqueId();
    expect(typeof id).toEqual('string');
  });
});