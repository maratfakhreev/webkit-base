import 'backbone-nested-model';
import User from 'scripts/models/user';

describe('User', function() {
  beforeEach(function() {
    this.user = new User({
      token: '12937698127698712936',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@gmail.com'
    });

    this.save_stub = sinon.stub(this.user, 'save');
  });

  afterEach(function() {
    this.save_stub.restore();
  });

  it ('user token should equal to "12937698127698712936"', function() {
    expect(this.user.get('token')).to.equal('12937698127698712936');
  });

  it('user first_name should equal to "John"', function() {
    expect(this.user.get('first_name')).to.equal('John');
  });

  it('user last_name should equal to "Doe"', function() {
    expect(this.user.get('last_name')).to.equal('Doe');
  });

  it('user email should equal to "john.doe@gmail.com"', function() {
    expect(this.user.get('email')).to.equal('john.doe@gmail.com');
  });

  it('should update user when first_name has been changed', function() {
    this.user.set('first_name', 'Name');
    this.save_stub.should.have.been.calledOnce;
  });
});
