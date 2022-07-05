module.exports = { 
    "env":{
        "browser":true,
        "es2022":true,
        "node":true,
    },
    "parserOptions":{
        "sourceType":"module"
    },
    "extends": ["next/core-web-vitals", "prettier"],
    "rules":{
        "semi":["error","always"],
        "quotes":["error","double"],
        "no-undef":"error"
    }
};
