import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe('facebook-helper', () => {
  let facebookHelper = null;
  let models = null;

  before(async (done) => {
    let userId = "718927014853837";
    let token = "EAACEdEose0cBANQIY2OfwDlxZAkTIQZCiiUcCjzbEfcrrAKmRws5qff9ebYEE1dE8pvbEOZAOh2fZCN0tTRbrnNF6mEGFjQOAuy8RuP3uIhkEDj8TMYZAKZBVHbWp1fl2oAco9i8CZCF10FId1YC3yoOOkrZBZBf9bWqSohkjdnLFKBHn9oiIsjCh";
    facebookHelper = new FacebookHelper({userId, token});
    models = await task1_initModel();
    console.log(facebookHelper);
    done();
  });

  it("get friends list and save in database", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      
      friends.forEach((e, i) => {
        e.facebookId = e.id;
        e.id = undefined;
      });
      await models.Friend.bulkCreate(friends);
      done();
    } catch (e) {
      done(e);
    }
  });
  
  it("get friends list in database", async (done) => {
    try {
      let friends = await models.Friend.findAll();
      friends.should.be.Array;
      friends[0].toJSON().should.has.keys(
        'id',
        'name',
        'email',
        'facebookId',
        'createdAt',
        'updatedAt'
      );
      done();
    } catch (e) {
      done(e);
    }
  });
  
  it("update one of friend's email in database", async (done) => {
    try {
      let friend = await models.Friend.findOne();
      friend.email = 'hellojs@trunk.studio';
      let result = await friend.save();
      result.email.should.be.eq('hellojs@trunk.studio');
      done();
    } catch (e) {
      done(e);
    }
  });
  
  it("delete the friend who has trunk.studio email in database", async (done) => {
    try {
      let friend = await models.Friend.findOne({
        where: {
          email: 'hellojs@trunk.studio'
        }
      });
      await friend.destroy();
      
      let result = await models.Friend.findOne({
        where: {
          email: 'hellojs@trunk.studio'
        }
      });
      (result === null).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
