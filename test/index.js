describe('Header', function () {
  describe('Model', function () {

    it('Should have a default title of: Home', function () {
      const header = new TESTREF.containers.Header.Model();
      expect(header.title()).to.equal('Home');
    });

  });
});
