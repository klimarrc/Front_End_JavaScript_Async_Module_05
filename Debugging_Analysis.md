# Debugging Analysis Assignment

## 1. Logical Breakpoints

### Breakpoint 1: **First Screenshot**

**First error: TypeError.**

`Error fetching data: TypeError: (("$where=lower(text) like lower('%" + (
intermediate value)) + "%')&") is not a function`

**Why it happens:** I am building the `$where` string with mixed parentheses
or accidental function call syntax. My plan was created a string, but the
way it is wrapped in parentheses makes JS think I am trying to call it as
a function.
**Fix:**I used a simple template without () because when I used `$Where`
similar to the requirement assignment, it didn't work.

This code made the error.
`const base  = 'https://data.winnipeg.ca/resource/k56t-9dvi.json';`
`const where = $where=lower(common_name) LIKE lower('%${commonName}%')`

**Second error:** ReferenceError: setStatus is not defined.
**Why it happens:** I am calling setStatus(...) but never defined that helper.
**Fix:** I removed the call or add a tiny helper.

### Breakpoint 2: **Second Screenshot**

**First error:** TypeError: can't access property "trim", keyword is undefined.
**Why it happens:**In the submit handler you passed nothing:

`fetchSchoolSpeedLimits();` **No argument**

I passed the input element instead of its value:

`const el = document.getElementById('keyword');`
`fetchSchoolSpeedLimits(el);` **Element, not text.**

**Fix:**
-First, I made sure keyword is never undefined or null.
-Then, I removed any spaces around it.
-The final result (word) is always a safe string.

`word = (keyword ?? '').trim();`

### Breakpoint 3: **Third Screenshot**

**Error:**XHR GET → 400 Bad Request.
**Why it happens:**

`...$where=lower(key word) LIKE lower('%[object HTMLInputElement]%')&$limit=5`

The right-hand side became "[object HTMLInputElement]". That means I passed
the DOM element instead of its string value.

**Fix:**
 `word = (keyword ?? '').trim();`
-First, this line safely cleans and normalizes whatever was passed into the
 function.

        `if (!word) return [];`
-Then if there is no search text, stop the function and return an empty list.

        `const base = 'https://data.winnipeg.ca/resource/k56t-9dvi.json;'`
-The dataset ID (k56t-9dvi) uniquely identifies which data I am accessing.

        `const url = `${base}?$q=${encodeURIComponent(word)}&$limit=20`;`
-Finally, I used $q is a full-text search parameter.It searches across multiple
 text fields in the dataset for whatever word contains.

## 4. Conclusion

Using the debugger, I was able to:
-Builds valid, encoded URLs.
-Ignores empty searches.
-Prevents crashes due to undefined variables.
-This debugging process confirmed that careful input handling and valid 
query syntax are essential for stable and accurate API requests
