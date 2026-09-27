let a;
let b;
let c;


a = window.prompt("enter side A");
a = Number(a);

b = window.prompt("enter side b");
a = Number(a);

c = Math.pow(a, 2) + Math.pow(b, 2)
c = Math.sqrt(c);
console.log("side c =", c)