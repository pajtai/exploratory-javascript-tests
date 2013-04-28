describe("Object", function() {

    var obj = {};

    it("objects have a constructor field", function() {

       expect(obj.constructor).toBeDefined();
    });

    describe("Array", function() {

        it("The length of an array equals the highest index plus one", function() {
            var arr = [];

            arr[99] = "test";
            arr[-3] = "test";
            expect(arr.length).toBe(100);
        });

        it("arrays can be differentiated from other objects using the constructor field", function() {

            var arrs = [[], new Array(), Array.prototype.slice.call({}, 0)],
                constr = function() {},
                objs = [{}, new Object(), new constr()],
                i;

            for (i = 0; i < arrs.length; ++i) {
                expect(arrs[i].constructor).toEqual(Array);
                expect(arrs[i].constructor).not.toEqual(Object);
            }

            for (i = 0; i < objs.length; ++i) {
                expect(objs[i].constructor).not.toEqual(Array);
            }
        });

        it("arrays can have negative indices", function() {

            var arr =[];

            arr[-1] = "tomato";
            expect(arr[-1]).toEqual("tomato");
        });
    });

    describe("Function", function() {

        var testExpression = true,
            testDeclaration = true;

        it("Function Declarations are not hoisted but defined for entire block", function() {

            expect(typeof testDeclaration).toBe("function");
            function testDeclaration() {};
        });

        it("Function expressions are hoisted", function() {

            expect(typeof testExpression).toBe("undefined");
            var testExpression = function() {};
        });

        it("arguments are passed by reference", function() {

            var obj = { val : false };

            function changeObj(objIn) {
                objIn.val = true;
            }

            expect(obj.val).toEqual(false);
            changeObj(obj);
            expect(obj.val).toEqual(true);
        });
    });

   describe("Object inheritance", function() {

       it("changing the prototype, changes that field on all other objects with that prototype dynamically", function() {

           var Const1 = function() {},
               Const2 = function() {},
               obj1, obj2;

           Const1.prototype.test = 42;

           obj1 = new Const1();
           Const2.prototype = obj1;
           obj2 = new Const2();

           expect(obj1.prototype).toBe(obj2.prototype);
           expect(obj1.test).toEqual(42);
           expect(obj2.test).toEqual(42);

           Const1.prototype.test = "new";

           expect(obj1.test).toEqual("new");
           expect(obj2.test).toEqual("new");
       });
   });

    describe("String", function() {
        it("concatenating to a string leaves the original unchanged", function() {

            var originalString = "original",
                referenceString = originalString;

            expect(originalString).toBe(referenceString);

            referenceString += " and another string";

            expect(originalString).toBe("original");
            expect(referenceString).not.toBe(originalString);
        });

        it("string literal are automatically converted into string objects", function() {

            expect("test".constructor).toBe(String);
        });
    });
});

describe("slice()", function() {

    var input, answer;

    beforeEach(function() {
        input = [1, 2, 3];
        answer = input.slice(1);
    });

    it("original array remains unchanged", function() {
        expect(input).toEqual([1, 2, 3]);
    });

    it("returns an array", function() {
        expect(answer instanceof Array).toBe(true);
    });

    it("slice 0 leaves input unchanged", function() {
        expect(input.slice(0)).toEqual(input);
    });

    it("slice -1 return last element", function() {
        expect(input.slice(-1)).toEqual([3]);
    });

    it("calling slice on an object turns it into an array", function() {

        var theObject,
            theArray,
            testing = function() {
                theObject = arguments;
            };

        testing(1, 2, 3);
        theArray = Array.prototype.slice.call(theObject, 0);

        expect(theObject instanceof Array).toBe(false);
        expect(theArray instanceof Array).toBe(true);

        expect(Array.prototype.slice.call({"some": "random", "object":"."}, 0) instanceof Array).toBe(true);
    });

});

describe("splice()", function() {

    var input;

    beforeEach(function() {

        input = [0,1,2,3,4,5]
    });

    it("splice returns the removed portion of the array", function() {

        expect(input.splice(3,3)).toEqual([3,4,5]);
    });

    it("splice changes the original array", function() {

        var input2 = input;

        input.splice(3,3);

        expect(input2).toBe(input);
        expect(input).not.toEqual([0,1,2,3,4,5]);
    });

    it("splice can insert multiple elements as separate arguments into the array", function() {

        input.splice(3,3,3,2,1,0);

        expect(input).toEqual([0,1,2,3,2,1,0]);
    });
});
