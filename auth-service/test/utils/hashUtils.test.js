const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

describe('hashPassword()', () => {
  it('duhet të kthejë një hash të vlefshëm', async () => {
    const password = 'sekret123';
    const hash = await hashPassword(password);

    expect(await bcrypt.compare(password, hash)).toBe(true);
  });
});
