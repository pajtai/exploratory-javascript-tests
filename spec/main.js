/*global describe:false, it:false, expect:false */
var should = chai.should(),
    expect = chai.expect;

describe("Object", function() {

    var obj = {};

    it("objects have a constructor field", function() {

        should.exist(obj.constructor);
    });

    describe("Array", function() {

        it("The length of an array equals the highest index plus one", function() {
            var arr = [];

            arr[99] = "test";
            arr[-3] = "test";
            arr.length.should.equal(100);
        });

        it("arrays can be differentiated from other objects using the constructor field", function() {

            var arrs = [[], new Array(), Array.prototype.slice.call({}, 0)],
                constr = function() {},
                objs = [{}, new Object(), new constr()],
                i;

            for (i = 0; i < arrs.length; ++i) {
                arrs[i].constructor.should.equal(Array);
            }

            for (i = 0; i < objs.length; ++i) {
                objs[i].constructor.should.not.equal(Array);
            }
        });

        it("arrays can have negative indices", function() {

            var arr =[];

            arr[-1] = "tomato";

            arr[-1].should.equal("tomato");
        });
    });

    describe("Function", function() {

        var testExpression = true,
            testDeclaration = true;

        it("Function Declarations are not hoisted but defined for entire block", function() {
            (typeof testDeclaration).should.equal("function")
            function testDeclaration() {};
        });

        it("Function expressions are hoisted", function() {
            (typeof testExpression).should.equal("undefined");
            var testExpression = function() {};
        });

        it("arguments are passed by reference", function() {

            var obj = { val : false };

            function changeObj(objIn) {
                objIn.val = true;
            }

            obj.val.should.equal(false);
            changeObj(obj);
            obj.val.should.equal(true);
        });

        it("An object passed as an argument remains unchanged if overwritten inside a function", function () {
            var obj = { val: true },
                func = function (objIn) {
                    objIn = { val: false };
                };

            obj.val.should.equal(true);
            func(obj);
            obj.val.should.equal(true);
        });
    });

   describe("Object inheritance", function() {

       xit("changing the prototype, changes that field on all other objects with that prototype dynamically", function() {
       });
   });

    describe("String", function() {
        it("concatenating to a string leaves the original unchanged", function() {

            var originalString = "original",
                referenceString = originalString;

            expect(originalString).to.equal(referenceString);

            referenceString += " and another string";

            expect(originalString).to.equal("original");
            expect(referenceString).not.to.equal(originalString);
        });

        it("string literal are automatically converted into string objects", function() {

            expect("test".constructor).to.equal(String);
        });
    });
});


describe("Scope", function() {

    it("Functions have access to variables in their enclosing scope", function() {

        var vary = 1;
        test();

        function test() {
            expect(vary).to.equal(1);
        }
    });


    it("Functions do not have access to variables that are only in the scope where they are called", function() {

        (function() {
            var vary = 1;
            test();
        }());

        function test() {
            expect(typeof vary).to.equal("undefined");
        }
    });

    it("Anonymous functions are scoped to the global context", function() {
        var anon = function() { return this; };
        should.equal(anon(), window);
    });
});

describe("slice()", function() {

    var input, answer;

    beforeEach(function() {
        input = [1, 2, 3];
        answer = input.slice(1);
    });

    it("slice is available on strings", function() {
        expect("".slice).not.to.equal(undefined);
    });

    it("slice is available on arrays", function() {
        expect([].slice).not.to.equal(undefined);
    });

    it("original array remains unchanged", function() {
        expect(input).to.deep.equal([1, 2, 3]);
    });

    it("returns an array", function() {
        expect(answer instanceof Array).to.be.true;
    });

    it("slice 0 leaves input unchanged", function() {
        expect(input.slice(0)).to.deep.equal(input);
    });

    it("slice -1 return last element", function() {
        expect(input.slice(-1)).to.deep.equal([3]);
    });

    it("calling slice on an object turns it into an array", function() {

        var theObject,
            theArray,
            testing = function() {
                theObject = arguments;
            };

        testing(1, 2, 3);
        theArray = Array.prototype.slice.call(theObject, 0);

        expect(theObject instanceof Array).to.be.false
        expect(theArray instanceof Array).to.be.true;

        expect(Array.prototype.slice.call({"some": "random", "object":"."}, 0) instanceof Array).to.be.true;
    });

});

describe("splice()", function() {

    var input;

    beforeEach(function() {

        input = [0,1,2,3,4,5]
    });

    it("splice is NOT available on strings", function() {
        expect("".splice).to.equal(undefined);
    });

    it("splice is available on arrays", function() {
        expect([].splice).not.to.equal(undefined);
    });

    it("splice returns the removed portion of the array", function() {

        expect(input.splice(3,3)).to.deep.equal([3,4,5]);
    });

    it("splice changes the original array", function() {

        var input2 = input;

        input.splice(3,3);

        expect(input2).to.equal(input);
        expect(input).not.to.deep.equal([0,1,2,3,4,5]);
    });

    it("splice can insert multiple elements as separate arguments into the array", function() {

        input.splice(3,3,3,2,1,0);

        expect(input).to.deep.equal([0,1,2,3,2,1,0]);
    });
});
