const R = require('ramda');
const { getDomains, validateDomainData } = require('../utils/domain');

describe('Domains', () => {
  describe('but first... a test for this test', () => {
    describe('getDomains', () => {
      it('should resolve with the list of domains', async () => {
        const list = await getDomains();
        expect(Array.isArray(list)).toBe(true);
      });
    });

    describe('validateDomainData', () => {
      it('should return true if the name is invalid', () => {
        const names = ['hello world', 'good12312++123', 'ajsdjasdaSD_123yuqehq', 'khsda%', '', undefined, '12112**dsd', Array(101).fill('a').join('')];

        names.forEach(name => {
          const { valid, errors } = validateDomainData({
            name,
            forceHttps: true,
            record: { CNAME: ['hello.com'] },
          });
          expect(valid).toBe(false);
          expect(errors.length).toBe(1);
          expect(errors[0][0]).toBe('name');
        });
      });

      it('should return true for a valid object', () => {
        const names = ['hello', 'hello-world', '11111111111', '--wow--', 'wow--', '--wow'];
        names.forEach(name => {
          const { valid, errors } = validateDomainData({
            name,
            forceHttps: true,
            record: { CNAME: ['hello.com'] },
          });
          expect(valid).toBe(true);
          expect(errors).toEqual([]);
        });
      });
    });
  });

  it('should have a the correct keys', async () => {
    const list = await getDomains();
    list.forEach(data => {
      console.log(data);
      const { errors } = validateDomainData(data);
      if (errors.length) {
        console.log(errors);
      }
    });
  });
});

