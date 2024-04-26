import { expect } from 'chai';
import sinon from 'sinon';
import assert from 'assert';
import ApiRequest from '../ApiRequest.ts';

class Request extends ApiRequest {
    constructor(apiUrl: string) {
        super(apiUrl)
        this._apiUrl = apiUrl;
    }
}

const request = new Request('http://app.com/api');

describe('Check ApiRequest init', () => {
    it('apiUrl must be "http://app.com/api"', () => {
        expect(request._apiUrl === 'http://app.com/api').to.equal(true);
    });
})

describe("Check ApiRequest methods", function () {
    describe("Test get method", function () {
        let getUserStub: any;

        beforeEach(function () {
            getUserStub = sinon.stub(request, "get");
        });

        afterEach(function () {
            getUserStub.restore();
        });
        it("Should return user data", async function () {
            
            const pageOfUsers = {
                response: JSON.stringify({
                    "id": 7,
                    "first_name": "wasa",
                    "second_name": "ewwerrw",
                    "display_name": "qweas2asd12d",
                    "login": "wasa",
                    "avatar": "/8f839df2-c4f3-4d5a-864a-cedc8e28da08/8041331e-52f2-44fc-9982-c481b52a857a_cat.jpeg",
                    "email": "wasa@gmail.com",
                    "phone": "+711111111111"
                }),
            };
    
            getUserStub.returns(Promise.resolve(pageOfUsers));

            const options = {
                data: null,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }
            const result = await request.get('/user', options);
            
            const userData = JSON.parse(result.response);
            
            assert.equal(userData.id, 7);
            assert.equal(getUserStub.calledOnce, true);
        });
    });
    describe("Test post method", function () {
        let getUserStub: any;

        beforeEach(function () {
            getUserStub = sinon.stub(request, "post");
        });

        afterEach(function () {
            getUserStub.restore();
        });
        it("Should return Ok", async function () {
            
            const pageOfUsers = {
                response: "OK"
            };
    
            getUserStub.returns(Promise.resolve(pageOfUsers));

            const data = {
                name: 'Wasa',
                password: 123
            }
            const options = {
                data: data as Record<string, string | number>,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }
            const result = await request.post('/signin', options);
            
            assert.equal(result.response, "OK");
            assert.equal(getUserStub.calledOnce, true);
        });
    });
    describe("Test put method", function () {
        let getUserStub: any;

        beforeEach(function () {
            getUserStub = sinon.stub(request, "put");
        });

        afterEach(function () {
            getUserStub.restore();
        });
        it("Should return Ok", async function () {
            
            const pageOfUsers = {
                response: "OK"
            };
    
            getUserStub.returns(Promise.resolve(pageOfUsers));

            const data = {
                name: 'Wasa',
                password: 123
            }
            const options = {
                data: data as Record<string, string | number>,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }
            const result = await request.put('/update', options);
            
            assert.equal(result.response, "OK");
            assert.equal(getUserStub.calledOnce, true);
        });
    });
    describe("Test delete method", function () {
        let getUserStub: any;

        beforeEach(function () {
            getUserStub = sinon.stub(request, "delete");
        });

        afterEach(function () {
            getUserStub.restore();
        });
        it("Should return Ok", async function () {
            
            const pageOfUsers = {
                response: "OK"
            };
    
            getUserStub.returns(Promise.resolve(pageOfUsers));

            const data = {
                id: 123,
            }
            const options = {
                data: data as Record<string, string | number>,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }
            const result = await request.delete('/delete', options);
            
            assert.equal(result.response, "OK");
            assert.equal(getUserStub.calledOnce, true);
        });
    });
});